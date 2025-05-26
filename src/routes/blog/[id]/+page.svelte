<script lang="ts">
	import { marked } from 'marked';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import DOMPurify from 'dompurify';
	import MarkdownSummary from '../../../components/MarkdownSummary.svelte';
	import MarkdownSummaryTracker from '../../../components/MarkdownSummaryTracker.svelte';

	let content = '';
	let loading = true;
	let error = '';
	let postId = '';
	let markdownContainer: HTMLElement;
	let showSummary = true;

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

<div class="docs-layout">
	<!-- Summary/Índice à esquerda -->
	{#if showSummary && markdownContainer && !loading && !error}
		<aside class="docs-sidebar">
			<MarkdownSummary 
				showProgress={true}
				collapsible={true}
				maxDepth={4}
			/>
			
			<MarkdownSummaryTracker 
				{markdownContainer}
				rootMargin="-10% 0px -80% 0px"
				threshold={[0, 0.25, 0.5, 0.75, 1.0]}
			/>
		</aside>
	{/if}

	<!-- Conteúdo do Post -->
	<main class="docs-content">
		{#if loading}
			<div class="flex items-center justify-center py-12">
				<div
					class="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary-500"
				></div>
			</div>
		{:else if error}
			<div class="card bg-error-100 p-6 text-center shadow-lg dark:bg-error-900 dark:text-error-100">
				<h2 class="mb-2 text-2xl font-bold text-error-500 dark:text-error-300">Erro ao carregar o post</h2>
				<p class="text-error-700 dark:text-error-200">{error}</p>
			</div>
		{:else}
			<div class="card bg-surface-50 p-6 shadow-lg dark:bg-surface-800">
				<article bind:this={markdownContainer} class="markdown-content prose prose-lg max-w-none text-gray-800 dark:text-gray-100">
					{@html content}
				</article>
			</div>
		{/if}
	</main>
</div>

<style>
	.docs-layout {
		display: grid;
		grid-template-columns: 320px 1fr;
		gap: 2rem;
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		margin-top: 5rem; /* Para compensar o header fixo */
	}

	.markdown-content {
		line-height: 1.7;
		font-size: 1rem;
	}

	.markdown-content :global(h1),
	.markdown-content :global(h2),
	.markdown-content :global(h3),
	.markdown-content :global(h4),
	.markdown-content :global(h5),
	.markdown-content :global(h6) {
		margin-top: 2rem;
		margin-bottom: 1rem;
		scroll-margin-top: 6rem; /* Para navegação suave considerando header fixo */
	}

	.docs-content {
		min-width: 0; /* Evita overflow em grids */
	}

	.docs-sidebar {
		min-width: 0;
		position: sticky;
		top: 6rem; /* Alinhado com o header fixo */
		height: fit-content;
		max-height: calc(100vh - 8rem);
		overflow-y: auto;
		padding-right: 1rem;
		scrollbar-width: thin; /* Firefox */
	}

	/* Estilo para scrollbar em webkit browsers */
	.docs-sidebar::-webkit-scrollbar {
		width: 6px;
	}

	.docs-sidebar::-webkit-scrollbar-track {
		background: transparent;
	}

	.docs-sidebar::-webkit-scrollbar-thumb {
		background-color: rgba(156, 163, 175, 0.5);
		border-radius: 3px;
	}

	.dark .docs-sidebar::-webkit-scrollbar-thumb {
		background-color: rgba(75, 85, 99, 0.5);
	}

	@media (max-width: 1024px) {
		.docs-layout {
			grid-template-columns: 1fr;
			padding: 1.5rem;
		}
		
		.docs-sidebar {
			position: relative;
			top: 0;
			width: 100%;
			max-height: none;
			margin-bottom: 2rem;
			border-bottom: 1px solid rgba(229, 231, 235, 0.5);
			padding-bottom: 1.5rem;
		}

		.dark .docs-sidebar {
			border-bottom-color: rgba(75, 85, 99, 0.5);
		}

		.markdown-content :global(h1),
		.markdown-content :global(h2),
		.markdown-content :global(h3),
		.markdown-content :global(h4),
		.markdown-content :global(h5),
		.markdown-content :global(h6) {
			scroll-margin-top: 7rem;
		}
	}

	@media (max-width: 640px) {
		.docs-layout {
			padding: 1rem;
		}
	}
</style>
