<script lang="ts">
	import { marked } from 'marked';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	export let url: string;
	let readme = '';
	let loading = true;
	const dispatch = createEventDispatcher();

	onMount(async () => {
		try {
			const response = await fetch(url);
			readme = await response.text();
			loading = false;
		} catch (error) {
			console.error('Erro ao carregar README:', error);
			dispatch('error', { message: 'Erro ao carregar README' });
			loading = false;
		}
	});
</script>

<div>
	{#if loading}
		<div class="flex items-center justify-center min-h-[200px]">
			<div
				class="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary-500"
			></div>
		</div>
	{:else}
		<article class="prose prose-lg max-w-none dark:prose-invert">
			{@html marked(readme)}
		</article>
	{/if}
</div>
