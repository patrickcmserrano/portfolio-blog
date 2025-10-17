<script lang="ts">
	import { Drawer, AppBar } from '@skeletonlabs/skeleton';
	import { base } from '$app/paths';
	import NavLink from './NavLink.svelte';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import ThemeToggle from './ThemeToggle.svelte';
	import FontSizeControls from './FontSizeControls.svelte';
	import LanguageSwitch from './LanguageSwitch.svelte';
	import { _ } from 'svelte-i18n';

	const drawerStore = getDrawerStore();

	function openDrawer() {
		drawerStore.open();
	}
	
	// Fallbacks para navegação
	$: homeLabel = $_('nav.home') || 'Home';
	$: aboutLabel = $_('nav.about') || 'Sobre';
	$: blogLabel = $_('nav.blog') || 'Blog';
	$: aboutSiteLabel = $_('nav.aboutSite') || 'Sobre este Site';
</script>

<div class="fixed bottom-0 left-0 right-0 z-10 sm:hidden">
	<Drawer
		position="bottom"
		height="h-auto"
		width="w-full"
		regionDrawer="bg-surface-100-900"
		regionBackdrop="bg-surface-900/50"
	>
		<nav class="flex flex-row justify-end space-x-4 p-4">
			<LanguageSwitch />
			<FontSizeControls />
		</nav>
		<nav class="flex flex-row justify-end space-x-4 p-4">
			<NavLink href="{base}/" label={homeLabel} on:click={() => drawerStore.close()} />
			<NavLink href="{base}/about" label={aboutLabel} on:click={() => drawerStore.close()} />
			<NavLink href="{base}/blog" label={blogLabel} on:click={() => drawerStore.close()} />
			<NavLink
				href="{base}/about-site"
				label={aboutSiteLabel}
				on:click={() => drawerStore.close()}
			/>
		</nav>
	</Drawer>

	<AppBar>
		<svelte:fragment slot="lead">
			<div class="flex-1">
				<a href="{base}/" class="text-xl font-bold">Patrickms</a>
			</div>
		</svelte:fragment>
		<svelte:fragment slot="trail">
			<div class="flex items-center space-x-4">
				<button class="btn btn-sm" on:click={openDrawer}>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16m-7 6h7"
						/>
					</svg>
				</button>
				<ThemeToggle />
			</div>
		</svelte:fragment>
	</AppBar>
</div>