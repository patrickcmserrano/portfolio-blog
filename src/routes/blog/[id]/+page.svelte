<script lang="ts">
	import { marked } from 'marked';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import DOMPurify from 'dompurify';
	import PDFViewer from '../../../components/PDFViewer.svelte';

	let content: any = '';
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
			
			// Processar conteúdo especial para posts com PDFViewer
			if (postId === 'fundamentos-arquitetura-software') {
				content = processSpecialContent(rawContent);
			} else {
				content = sanitizeHtml(await marked(rawContent));
			}
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

	function processSpecialContent(rawContent: string): { beforeHtml: string; afterHtml: string } {
		// Dividir o conteúdo em partes antes e depois do PDFViewer
		const parts = rawContent.split('<div class="my-8">');
		if (parts.length > 1) {
			const beforePdf = parts[0];
			const afterPdfMatch = parts[1].match(/(<\/div>\s*)([\s\S]*)/);
			const afterPdf = afterPdfMatch ? afterPdfMatch[2] : '';
			
			// Processar as partes markdown separadamente
			const beforeHtml = sanitizeHtml(marked(beforePdf));
			const afterHtml = afterPdf ? sanitizeHtml(marked(afterPdf)) : '';
			
			return { beforeHtml, afterHtml };
		} else {
			return { beforeHtml: sanitizeHtml(marked(rawContent)), afterHtml: '' };
		}
	}
</script>

<div class="container mx-auto space-y-16 px-4 pt-20">
	<!-- Conteúdo do Post -->
	<section class="mx-auto max-w-6xl">
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
				{#if postId === 'fundamentos-arquitetura-software'}
					<article class="prose prose-lg max-w-none text-gray-800 dark:text-gray-200 mb-8">
						{@html content.beforeHtml}
					</article>
					
					<!-- PDFViewer component -->
					<div class="my-8">
						<PDFViewer 
							pdfUrl="{base}/mindmaps/Fundamentos da arquitetura de software.pdf" 
							title="Fundamentos da Arquitetura de Software - Mapa Mental"
						/>
					</div>
					
					{#if content.afterHtml}
						<article class="prose prose-lg max-w-none text-gray-800 dark:text-gray-200 mt-8">
							{@html content.afterHtml}
						</article>
					{/if}
				{:else}
					<article class="prose prose-lg max-w-none text-gray-800 dark:text-gray-200">
						{@html content}
					</article>
				{/if}
			</div>
		{/if}
	</section>
</div>

<style>
	/* Remover seletores não utilizados */
</style>
