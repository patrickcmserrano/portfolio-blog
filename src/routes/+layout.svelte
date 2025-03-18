<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, Drawer, initializeStores, getDrawerStore } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { base } from '$app/paths';
	import { page } from '$app/stores'; // Importa o store page
	import NavLink from '../components/NavLink.svelte';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	import '../app.css';

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

	// Função para abrir o drawer
	function openDrawer() {
		drawerStore.open();
	}

	// Fecha o drawer automaticamente quando a página muda
	$: $page.url.pathname, drawerStore.close();
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="{base}/" class="text-xl font-bold">Portfolio</a>
			</svelte:fragment>
			<svelte:fragment slot="default">
				<!-- Navegação para telas grandes -->
				<div class="hidden sm:flex sm:space-x-8">
					<NavLink href="{base}/" label="Home" />
					<NavLink href="{base}/about" label="Sobre" />
					<NavLink href="{base}/blog" label="Blog" />
					<NavLink href="{base}/about-site" label="Sobre este Site" />
				</div>
				<!-- Botão Hamburger para telas pequenas -->
				<button class="sm:hidden btn btn-sm" on:click={openDrawer}>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
					</svg>
				</button>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Drawer para navegação em dispositivos móveis -->
	<Drawer position="left" width="w-64" bgDrawer="bg-gray-900" bgBackdrop="bg-black/50">
		<nav class="p-4">
			<ul class="space-y-4">
				<li><NavLink href="{base}/" label="Home" on:click={() => drawerStore.close()} /></li>
				<li><NavLink href="{base}/about" label="Sobre" on:click={() => drawerStore.close()} /></li>
				<li><NavLink href="{base}/blog" label="Blog" on:click={() => drawerStore.close()} /></li>
				<li><NavLink href="{base}/about-site" label="Sobre este Site" on:click={() => drawerStore.close()} /></li>
			</ul>
		</nav>
	</Drawer>
	<!-- Page Route Content -->
	<slot />
</AppShell>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>