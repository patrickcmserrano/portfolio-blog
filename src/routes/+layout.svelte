<script lang="ts">
	import '../app.postcss';
	import { AppShell, initializeStores, getDrawerStore } from '@skeletonlabs/skeleton';
	import { LightSwitch, modeCurrent } from '@skeletonlabs/skeleton';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	// Highlight.js and language registration moved to onMount for client-only initialization
	import 'highlight.js/styles/github-dark.css';
	import '../app.css';
	import '../styles/dark-mode-enhanced.css'; // Estilos aprimorados para modo escuro
	import '../styles/markdown-enhanced.css'; // Estilos aprimorados para markdown
	import Header from '../components/Header.svelte';
	import MobileDrawer from '../components/MobileDrawer.svelte';
	// Music components are heavy and attach listeners; lazy-load them on the client
	let MusicPlayer: any = null;
	let MusicNotification: any = null;
	let MusicKeyboardShortcuts: any = null;
	let musicComponentsLoaded = false;
	import { observeThemeChanges } from '../utils/ThemeObserver';
	import '../lib/i18n';
	import I18nLoader from '../components/I18nLoader.svelte';

	import { onMount } from 'svelte';
	import '../app.postcss'; // Seu arquivo de estilos Tailwind

	// Initialize modeCurrent IMMEDIATELY before any components render
	// This must run synchronously to prevent LightSwitch from showing wrong state
	if (typeof window !== 'undefined') {
		const storedTheme = localStorage.getItem('modeCurrent');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		
		let shouldBeDark;
		if (storedTheme === null || storedTheme === undefined) {
			shouldBeDark = prefersDark !== false;
			localStorage.setItem('modeCurrent', String(shouldBeDark));
	} else {
		shouldBeDark = storedTheme === 'true';
	}		// Set the store immediately so LightSwitch reads the correct value
		modeCurrent.set(shouldBeDark);
	}

	onMount(async () => {
		// Theme is already initialized above, just ensure DOM classes are in sync
		const currentTheme = modeCurrent.subscribe(() => {}); // Trigger initial subscription
		currentTheme(); // Unsubscribe immediately
		
		// Set data-theme attribute for Skeleton UI
		if (!document.documentElement.getAttribute('data-theme')) {
			document.documentElement.setAttribute('data-theme', 'skeleton');
		}

		// Initialize highlight.js on client only (avoid SSR cost)
		const [
			{ default: hljs },
			{ storeHighlightJs },
			{ default: xml },
			{ default: css },
			{ default: javascript },
			{ default: typescript }
		] = await Promise.all([
			import('highlight.js/lib/core'),
			import('@skeletonlabs/skeleton'),
			import('highlight.js/lib/languages/xml'),
			import('highlight.js/lib/languages/css'),
			import('highlight.js/lib/languages/javascript'),
			import('highlight.js/lib/languages/typescript')
		]);
		hljs.registerLanguage('xml', xml);
		hljs.registerLanguage('css', css);
		hljs.registerLanguage('javascript', javascript);
		hljs.registerLanguage('typescript', typescript);
		storeHighlightJs.set(hljs);
	});

	// Lazy-load music components only on the client after initial render
	onMount(async () => {
		if (typeof window === 'undefined') return;
		// Small delay to prioritize page content
		await new Promise((r) => setTimeout(r, 150));
		const [{ default: MP }, { default: MN }, { default: MKS }] = await Promise.all([
			import('../components/MusicPlayerMultitrack.svelte'),
			import('../components/MusicNotification.svelte'),
			import('../components/MusicKeyboardShortcuts.svelte')
		]);
		MusicPlayer = MP;
		MusicNotification = MN;
		MusicKeyboardShortcuts = MKS;
		musicComponentsLoaded = true;
	});

	// Inicializa os stores do Skeleton Labs
	initializeStores();

	// Obtém o drawerStore no nível superior
	const drawerStore = getDrawerStore();

	// Highlight.js configuration moved to onMount (client-only)

	// Fecha o drawer automaticamente quando a página muda
	$: $page.url.pathname, drawerStore.close();

	// Subscribe to modeCurrent changes to keep DOM in sync with LightSwitch
	$: if (typeof window !== 'undefined') {
		if ($modeCurrent) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}

	// Observa mudanças no tema
	observeThemeChanges();
</script>

<!-- App Shell -->
<I18nLoader>
	<AppShell>
		<svelte:fragment slot="header">
			<Header />
		</svelte:fragment>

		<!-- Conteúdo da página -->
		<slot />

		<MobileDrawer />
	</AppShell>

	{#if musicComponentsLoaded}
		<!-- Bottom-right dock to align music UI consistently -->
		<div class="music-dock" aria-live="polite">
			<!-- Notification stacked above the player -->
			<div class="dock-item notification">
				<svelte:component this={MusicNotification} />
			</div>
			<div class="dock-item player">
				<svelte:component this={MusicPlayer} />
			</div>
			<svelte:component this={MusicKeyboardShortcuts} />
		</div>
	{/if}
</I18nLoader>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
	:global(.app-bar) {
		display: flex;
		justify-content: space-around;
	}

	/* Bottom-right dock for music UI */
	.music-dock {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.75rem; /* spacing between notification and player */
		z-index: 50; /* above most UI */
		pointer-events: none; /* let inner components handle interaction */
	}

	.music-dock .dock-item {
		pointer-events: auto; /* re-enable interactions for children */
	}

	/* Normalize widths so they align */
	.music-dock :global(.music-player) {
		position: static !important; /* disable inner fixed so stacking works */
	}
	.music-dock :global(.music-notification) {
		position: static !important; /* disable inner fixed */
		width: 20rem; /* w-80 to match player */
	}

	/* Mobile adjustments */
	@media (max-width: 640px) {
		.music-dock {
			right: 0.75rem;
			left: 0.75rem;
			align-items: stretch;
		}
		.music-dock :global(.music-notification),
		.music-dock :global(.music-player) {
			width: 100% !important;
		}
	}
</style>
