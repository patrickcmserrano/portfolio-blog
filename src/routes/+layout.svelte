<script lang="ts">
	import '../app.postcss';
	import { AppShell, initializeStores, getDrawerStore } from '@skeletonlabs/skeleton';
	import { LightSwitch, modeCurrent } from '@skeletonlabs/skeleton';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml';
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import '../app.css';
	import '../styles/dark-mode-enhanced.css'; // Estilos aprimorados para modo escuro
	import '../styles/markdown-enhanced.css'; // Estilos aprimorados para markdown
	import Header from '../components/Header.svelte';
	import MobileDrawer from '../components/MobileDrawer.svelte';
	import MusicPlayer from '../components/MusicPlayerFixed.svelte';
	import MusicNotification from '../components/MusicNotification.svelte';
	import MusicKeyboardShortcuts from '../components/MusicKeyboardShortcuts.svelte';
	import { observeThemeChanges } from '../utils/ThemeObserver';

	import { onMount } from 'svelte';
	import '../app.postcss'; // Seu arquivo de estilos Tailwind

	onMount(() => {
		// Define o tema padrão como 'dark' se não estiver definido
		if (!document.documentElement.getAttribute('data-theme')) {
			document.documentElement.setAttribute('data-theme', 'dark');
		}
	});

	// Inicializa os stores do Skeleton Labs
	initializeStores();

	// Obtém o drawerStore no nível superior
	const drawerStore = getDrawerStore();

	// Configuração do Highlight.js
	hljs.registerLanguage('xml', xml);
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Fecha o drawer automaticamente quando a página muda
	$: $page.url.pathname, drawerStore.close();

	// Usa o store modeCurrent para detectar o tema atual
	$: isDark = $modeCurrent; // true = dark, false = light

	// Observa mudanças no tema
	observeThemeChanges();
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>

	<!-- Conteúdo da página -->
	<slot />

	<MobileDrawer />
</AppShell>

<!-- Player de música -->
<MusicPlayer />

<!-- Notificação sobre música -->
<MusicNotification />

<!-- Atalhos de teclado para música -->
<MusicKeyboardShortcuts />

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
	:global(.app-bar) {
		display: flex;
		justify-content: space-around;
	}
</style>
