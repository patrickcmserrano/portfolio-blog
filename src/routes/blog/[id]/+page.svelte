<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { marked } from 'marked';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import DOMPurify from 'dompurify';
	// PDFViewer is dynamically imported only when needed for specific posts
	import MarkdownSummary from '../../../components/MarkdownSummary.svelte';
	import MarkdownSummaryTracker from '../../../components/MarkdownSummaryTracker.svelte';
	import PostLanguageSelector from '../../../components/PostLanguageSelector.svelte';
	import { loadPostContent, getAvailableLanguages, type PostContent } from '$lib/i18n/postLoader';
	import { currentLocale } from '$lib/i18n';

	let content: any = '';
	let loading = true;
	let error = '';
	let postId = '';
	let markdownContainer: HTMLElement;
	let showSummary = true;
	let postData: PostContent | null = null;
	let availableLanguages: string[] = [];
	let PDFViewer: any = null;
	let pdfViewerLoaded = false;

	// Reactive variables with fallbacks
	$: errorTitle = $_('errors.loadFailed') || 'Erro ao carregar o post';
	$: notFoundError = $_('errors.notFound') || 'Post não encontrado';
	$: loadingText = $_('general.loading') || 'Carregando...';

	// Função para sanitizar o HTML de forma segura
	function sanitizeHtml(html: string): string {
		return DOMPurify.sanitize(html);
	}

	// Obtém o ID do post a partir dos parâmetros da página
	$: {
		const unsubscribe = page.subscribe((p) => {
			if (p.params.id !== postId) {
				postId = p.params.id;
				loadPost();
			}
		});
		unsubscribe();
	}

	// Recarrega o post quando o idioma muda
	$: if ($currentLocale && postId) {
		loadPost();
	}

	// Usar o hook para processar seções colapsáveis após o conteúdo ser carregado
	$: if (markdownContainer && content && !loading) {
		// Adiciona um pequeno delay para garantir que o DOM esteja renderizado
		setTimeout(() => {
			import('$lib/utils/collapsibleSections').then(({ processCollapsibleSections }) => {
				processCollapsibleSections(markdownContainer, {
					patterns: [
						/Review Question Answers/i,
						/Respostas das Perguntas/i,
						/Answers/i,
						/Respostas/i
					],
					defaultButtonTitle: '👁️ See Answers',
					eyeIconPosition: 'left',
					startHidden: true
				});
			});
		}, 200);
	}

	// Carrega o conteúdo do post
	async function loadPost() {
		if (!postId) return;
		
		loading = true;
		error = '';
		
		try {
			// Carrega idiomas disponíveis para o post
			availableLanguages = await getAvailableLanguages(postId);
			
			// Carrega o conteúdo do post
			postData = await loadPostContent(postId);
			
			if (!postData) {
				throw new Error(notFoundError);
			}
			
			// Processar conteúdo especial para posts com PDFViewer
			if (postId === 'fundamentos-arquitetura-software') {
				// Dynamically import PDFViewer only when this specific post needs it
				if (!pdfViewerLoaded) {
					const module = await import('../../../components/PDFViewer.svelte');
					PDFViewer = module.default;
					pdfViewerLoaded = true;
				}
				content = await processSpecialContent(postData.content);
			} else {
				content = sanitizeHtml(await marked(postData.content));
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
	}

	async function processSpecialContent(rawContent: string): Promise<{ beforeHtml: string; afterHtml: string }> {
		// Dividir o conteúdo em partes antes e depois do PDFViewer
		const parts = rawContent.split('<div class="my-8">');
		if (parts.length > 1) {
			const beforePdf = parts[0];
			const afterPdfMatch = parts[1].match(/(<\/div>\s*)([\s\S]*)/);
			const afterPdf = afterPdfMatch ? afterPdfMatch[2] : '';
			
			// Processar as partes markdown separadamente
			const beforeHtml = sanitizeHtml(await marked(beforePdf));
			const afterHtml = afterPdf ? sanitizeHtml(await marked(afterPdf)) : '';
			
			return { beforeHtml, afterHtml };
		} else {
			return { beforeHtml: sanitizeHtml(await marked(rawContent)), afterHtml: '' };
		}
	}
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
			<div class="fixed inset-0 flex items-center justify-center bg-surface-50 dark:bg-surface-900 z-10">
				<div
					class="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary-500"
				></div>
				<p class="ml-4 text-lg">{loadingText}</p>
			</div>
		{:else if error}
			<div class="card bg-error-100 p-6 text-center shadow-lg dark:bg-error-900 dark:text-error-100">
				<h2 class="mb-2 text-2xl font-bold text-error-500 dark:text-error-300">{errorTitle}</h2>
				<p class="text-error-700 dark:text-error-200">{error}</p>
			</div>
		{:else}
			<div class="card bg-surface-50 p-6 shadow-lg dark:bg-surface-800">
				<!-- Seletor de idiomas -->
				{#if availableLanguages.length > 1}
					<PostLanguageSelector {availableLanguages} />
				{/if}
				
				{#if postId === 'fundamentos-arquitetura-software'}
					<article class="prose prose-lg max-w-none text-gray-800 dark:text-gray-200 mb-8" bind:this={markdownContainer}>
						{@html content.beforeHtml}
					</article>
					
					<!-- PDFViewer component (dynamically loaded) -->
					{#if pdfViewerLoaded && PDFViewer}
						<div class="my-8">
							<svelte:component 
								this={PDFViewer}
								pdfUrl="{base}/mindmaps/Fundamentos da arquitetura de software.pdf" 
								title="Fundamentos da Arquitetura de Software - Mapa Mental"
							/>
						</div>
					{/if}
					
					{#if content.afterHtml}
						<article class="prose prose-lg max-w-none text-gray-800 dark:text-gray-200 mt-8">
							{@html content.afterHtml}
						</article>
					{/if}
				{:else}
					<article bind:this={markdownContainer} class="markdown-content prose prose-lg max-w-none text-gray-800 dark:text-gray-100">
						{@html content}
					</article>
				{/if}
			</div>
			<!-- Espaço vazio para melhorar a funcionalidade do SummaryTracker -->
			<div class="article-spacer"></div>
		{/if}
	</main>
</div>

<style>
	.docs-layout {
		display: grid;
		grid-template-columns: 320px 1fr;
		gap: 0;
		margin: 0;
		padding: 0;
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
		min-width: 0;
		padding: 2rem;
		/* Remove overflow-y e height para permitir scroll natural da página */
	}

	.docs-sidebar {
		min-width: 0;
		position: sticky;
		top: 1rem; /* Sticky com offset do topo */
		height: 100%;
		max-height: calc(100vh - 100px); /* Altura máxima com espaço para header */
		overflow-y: auto; /* Scroll apenas quando necessário */
		border-right: 1px solid rgb(229 231 235);
		padding-top: 1rem;
		align-self: start; /* Alinha no topo da grid */
	}

	:global(.dark) .docs-sidebar {
		border-right-color: rgb(55 65 81);
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

	.article-spacer {
		height: 20vh;
		min-height: 100px;
		background: transparent;
	}

	:global(.dark) .docs-sidebar::-webkit-scrollbar-thumb {
		background-color: rgba(75, 85, 99, 0.5);
	}

	@media (max-width: 1039px) {
		.docs-layout {
			grid-template-columns: 1fr;
			padding: 1.5rem;
			min-height: auto; /* Remove altura fixa em mobile */
		}
		
		.docs-sidebar {
			position: relative;
			top: 0;
			height: auto;
			width: 100%;
			max-height: none;
			margin-bottom: 2rem;
			border-right: none;
			border-bottom: 1px solid rgba(229, 231, 235, 0.5);
			padding-bottom: 1.5rem;
			overflow-y: visible; /* Remove scroll em mobile */
		}

		:global(.dark) .docs-sidebar {
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
			padding: 0;
			margin: 0;
		}
		.docs-sidebar {
			padding: 0.25rem 0.25rem 0.5rem 0.25rem;
			margin-bottom: 1rem;
			overflow-y: visible; /* Remove scroll em mobile pequeno */
		}
		.docs-content {
			padding: 0.5rem;
		}
		.markdown-content {
			font-size: 0.95rem;
		}
		.markdown-content :global(h1),
		.markdown-content :global(h2),
		.markdown-content :global(h3),
		.markdown-content :global(h4),
		.markdown-content :global(h5),
		.markdown-content :global(h6) {
			margin-top: 1rem;
			margin-bottom: 0.5rem;
		}
		.markdown-content :global(p) {
			margin: 0.5rem 0;
		}
	}

	/* Estilos para seções colapsáveis */
	:global(.collapsible-section-wrapper) {
		margin: 1.5rem 0;
	}

	:global(.collapsible-toggle-button) {
		font-family: inherit;
		transition: all 0.2s ease !important;
	}

	:global(.collapsible-toggle-button:hover) {
		background: linear-gradient(135deg, #1d4ed8, #1e40af) !important;
		transform: translateY(-1px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15) !important;
	}

	:global(.collapsible-toggle-button:active) {
		transform: translateY(0) !important;
	}

	:global(.collapsible-content-container) {
		padding: 1.5rem;
		background: rgba(59, 130, 246, 0.03);
		border: 1px solid rgba(59, 130, 246, 0.1);
		border-radius: 0 0 0.5rem 0.5rem;
		margin-top: -1px;
		transition: all 0.3s ease;
	}

	:global(.dark .collapsible-toggle-button) {
		background: linear-gradient(135deg, #1e40af, #1e3a8a) !important;
		color: #e5e7eb !important;
	}

	:global(.dark .collapsible-toggle-button:hover) {
		background: linear-gradient(135deg, #1e3a8a, #1e40af) !important;
	}

	:global(.dark .collapsible-content-container) {
		background: rgba(30, 64, 175, 0.05);
		border-color: rgba(30, 64, 175, 0.15);
		color: #e5e7eb;
	}

	/* Animação suave para mostrar/ocultar */
	:global(.collapsible-content-container) {
		overflow: hidden;
		transition: max-height 0.3s ease, opacity 0.3s ease;
	}
</style>
