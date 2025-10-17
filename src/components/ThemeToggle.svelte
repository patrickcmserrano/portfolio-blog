<script lang="ts">
	import { modeCurrent } from '@skeletonlabs/skeleton';
	import { _ } from 'svelte-i18n';

	function toggleTheme() {
		modeCurrent.update((current) => !current);
	}

	// Button shows the ACTION (what will happen on click), not the current state
	// Dark mode (true) = show sun icon (click to go light)
	// Light mode (false) = show moon icon (click to go dark)
	$: isDark = $modeCurrent;
	$: switchToLightLabel = $_('theme.switchToLight') || 'Switch to light mode';
	$: switchToDarkLabel = $_('theme.switchToDark') || 'Switch to dark mode';
</script>

<button
	on:click={toggleTheme}
	class="btn btn-sm variant-ghost-surface"
	aria-label={isDark ? switchToLightLabel : switchToDarkLabel}
	title={isDark ? switchToLightLabel : switchToDarkLabel}
>
	{#if isDark}
		<!-- Currently dark, show sun icon (click to go light) -->
		<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
			/>
		</svg>
	{:else}
		<!-- Currently light, show moon icon (click to go dark) -->
		<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
			/>
		</svg>
	{/if}
</button>

<style>
	button {
		transition: all 0.2s ease;
	}

	button:hover {
		transform: scale(1.05);
	}

	button:active {
		transform: scale(0.95);
	}
</style>
