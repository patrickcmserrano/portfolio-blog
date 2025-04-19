<script lang="ts">
	import { marked } from 'marked';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import DOMPurify from 'dompurify';

	let content = '';
	let loading = true;
	let error = '';
	let postId = '';

	// Função para sanitizar o HTML de forma segura
	function sanitizeHtml(html: string): string {
		return DOMPurify.sanitize(html);
	}

	// Obtém o ID do post a partir dos parâmetros da página
	$: {
		const unsubscribe = page.subscribe((p) => {
			postId = p.params.id;
		});
		unsubscribe();
	}

	// Carrega o conteúdo do post ao montar o componente
	onMount(async () => {
		try {
			const response = await fetch(`${base}/posts/${postId}.md`);
			if (!response.ok) {
				throw new Error('Post não encontrado');
			}
			const rawContent = await response.text();
			content = sanitizeHtml(await marked(rawContent));
		} catch (err) {
			if (err instanceof Error) {
				error = err.message;
			} else {
				error = 'An unknown error occurred';
			}
		} finally {
			loading = false;
		}
	});
</script>

<div class="container mx-auto space-y-16 px-4 pt-20">
	<!-- Conteúdo do Post -->
	<section class="mx-auto max-w-4xl">
		{#if loading}
			<div class="flex items-center justify-center py-12">
				<div
					class="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary-500"
				></div>
			</div>
		{:else if error}
			<div class="card bg-error-100 p-6 text-center shadow-lg">
				<h2 class="mb-2 text-2xl font-bold text-error-500">Erro ao carregar o post</h2>
				<p class="text-error-700">{error}</p>
			</div>
		{:else}
			<div class="card bg-surface-50 p-6 shadow-lg dark:bg-surface-800">
				<article class="prose prose-lg max-w-none text-gray-800 dark:text-gray-200">
					{@html content}
				</article>
			</div>
		{/if}
	</section>
</div>

<style>
	/* Remover seletores não utilizados */
</style>
