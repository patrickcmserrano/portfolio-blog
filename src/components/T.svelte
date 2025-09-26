<script lang="ts">
	import { isLoading, _ } from 'svelte-i18n';

	export let key: string;
	export let fallback: string = '';
</script>

{#if !$isLoading}
	{$_(key)}
{:else}
	{fallback}
{/if}