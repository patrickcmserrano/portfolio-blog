<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { base } from '$app/paths';
	import NavLink from './NavLink.svelte';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import FontSizeControls from './FontSizeControls.svelte';
	import LanguageSwitch from './LanguageSwitch.svelte';
	import { _ } from 'svelte-i18n';
	import T from './T.svelte';

	const drawerStore = getDrawerStore();
	
	// Fallbacks para navegação
	$: homeLabel = $_('nav.home') || 'Home';
	$: aboutLabel = $_('nav.about') || 'Sobre';
	$: blogLabel = $_('nav.blog') || 'Blog';
	$: aboutSiteLabel = $_('nav.aboutSite') || 'Sobre este Site';
</script>

<!-- Navegação para telas grandes (permanece no topo) -->
<div class="hidden sm:block">
	<AppBar>
		<svelte:fragment slot="lead">
			<div class="flex-1">
				<a href="{base}/" class="text-xl font-bold">Patrickcms</a>
			</div>
		</svelte:fragment>
		<svelte:fragment slot="default">
			<div class="flex w-full justify-around">
				<div class="flex space-x-8">
					<NavLink href="{base}/" label={homeLabel} on:click={() => drawerStore.close()} />
					<NavLink href="{base}/about" label={aboutLabel} on:click={() => drawerStore.close()} />
					<NavLink href="{base}/blog" label={blogLabel} on:click={() => drawerStore.close()} />
					<NavLink
						href="{base}/about-site"
						label={aboutSiteLabel}
						on:click={() => drawerStore.close()}
					/>
				</div>
			</div>
		</svelte:fragment>
		<svelte:fragment slot="trail">
			<div class="flex items-center space-x-4">
				<LanguageSwitch />
				<FontSizeControls />
				<LightSwitch />
			</div>
		</svelte:fragment>
	</AppBar>
</div>
