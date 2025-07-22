<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let pdfUrl: string;
	export let title: string = 'Visualizador PDF';

	let container: HTMLDivElement;
	let isFullscreen = false;
	let isLoading = true;
	let useGoogleViewer = false;
	let hasError = false;
	let errorMessage = '';

	onMount(() => {
		if (!browser) return;
		
		// Testar se o PDF existe antes de tentar carregar
		fetch(pdfUrl, { method: 'HEAD' })
			.then(response => {
				if (!response.ok) {
					console.error(`PDF não encontrado: ${pdfUrl} (Status: ${response.status})`);
					hasError = true;
					errorMessage = `Arquivo PDF não encontrado (Status: ${response.status})`;
					useGoogleViewer = true;
				}
				isLoading = false;
			})
			.catch(error => {
				console.error('Erro ao verificar PDF:', error);
				hasError = true;
				errorMessage = 'Erro de conexão ao carregar o PDF';
				useGoogleViewer = true;
				isLoading = false;
			});

		// Detectar se é necessário usar o Google Viewer
		// (alguns navegadores corporativos bloqueiam PDFs)
		setTimeout(() => {
			if (hasError) return;
			
			const testObject = document.createElement('object');
			testObject.data = 'data:application/pdf;base64,';
			testObject.type = 'application/pdf';
			testObject.style.position = 'absolute';
			testObject.style.left = '-9999px';
			document.body.appendChild(testObject);
			
			setTimeout(() => {
				// Se o object não carregou corretamente, usar Google Viewer
				if (testObject.clientHeight === 0) {
					useGoogleViewer = true;
				}
				document.body.removeChild(testObject);
			}, 100);
		}, 1500);

		// Escutar mudanças de fullscreen
		document.addEventListener('fullscreenchange', handleFullscreenChange);
		document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
		document.addEventListener('mozfullscreenchange', handleFullscreenChange);
		document.addEventListener('MSFullscreenChange', handleFullscreenChange);

		// Escutar tecla ESC para sair do fullscreen
		document.addEventListener('keydown', handleKeydown);

		return () => {
			document.removeEventListener('fullscreenchange', handleFullscreenChange);
			document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
			document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
			document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
			document.removeEventListener('keydown', handleKeydown);
		};
	});

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && isFullscreen) {
			toggleFullscreen();
		}
	}

	function handleGoogleViewerError() {
		console.warn('Visualizador primário falhou, tentando alternativa...');
		// Mostrar visualizador simples
		const primaryViewer = container?.querySelector('.primary-viewer');
		const simpleViewer = container?.querySelector('.simple-viewer');
		
		if (primaryViewer) primaryViewer.classList.add('hidden');
		if (simpleViewer) simpleViewer.classList.remove('hidden');
	}

	async function toggleFullscreen() {
		if (!browser) return;
		
		try {
			if (!isFullscreen) {
				// Tentar entrar em fullscreen com diferentes APIs
				if (container.requestFullscreen) {
					await container.requestFullscreen();
				} else if ((container as any).webkitRequestFullscreen) {
					await (container as any).webkitRequestFullscreen();
				} else if ((container as any).mozRequestFullScreen) {
					await (container as any).mozRequestFullScreen();
				} else if ((container as any).msRequestFullscreen) {
					await (container as any).msRequestFullscreen();
				} else {
					// Fallback: simular fullscreen com CSS
					isFullscreen = true;
					return;
				}
			} else {
				// Sair do fullscreen
				if (document.exitFullscreen) {
					await document.exitFullscreen();
				} else if ((document as any).webkitExitFullscreen) {
					await (document as any).webkitExitFullscreen();
				} else if ((document as any).mozCancelFullScreen) {
					await (document as any).mozCancelFullScreen();
				} else if ((document as any).msExitFullscreen) {
					await (document as any).msExitFullscreen();
				} else {
					// Fallback: desativar fullscreen simulado
					isFullscreen = false;
					return;
				}
			}
		} catch (error) {
			console.warn('Erro ao alternar fullscreen:', error);
			// Usar fallback com CSS
			isFullscreen = !isFullscreen;
		}
	}

	function handleFullscreenChange() {
		// Verificar se realmente está em fullscreen
		const fullscreenElement = document.fullscreenElement || 
								 (document as any).webkitFullscreenElement || 
								 (document as any).mozFullScreenElement || 
								 (document as any).msFullscreenElement;
		
		isFullscreen = !!fullscreenElement && fullscreenElement === container;
	}
</script>

<svelte:head>
	<title>{title} - Portfolio</title>
</svelte:head>

{#if browser}
<div 
	bind:this={container}
	class="pdf-viewer-container bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg"
	class:fullscreen={isFullscreen}
>
	<!-- Header com controles -->
	<div class="pdf-controls bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex flex-wrap items-center justify-between gap-4">
		<h3 class="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
		
		<div class="flex items-center gap-4">
			<p class="text-sm text-gray-600 dark:text-gray-400">
				Use os controles do visualizador para navegar, fazer zoom e explorar o mapa mental
			</p>
			<div class="flex gap-2">
				<button
					on:click={toggleFullscreen}
					class="px-4 py-2 text-sm bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
					title="Alternar tela cheia"
				>
					{isFullscreen ? '⤴ Sair da Tela Cheia' : '⤢ Tela Cheia'}
				</button>
				
				{#if !useGoogleViewer}
					<button
						on:click={() => useGoogleViewer = true}
						class="px-3 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
						title="Usar visualizador alternativo"
					>
						� Alternativo
					</button>
				{:else}
					<button
						on:click={() => useGoogleViewer = false}
						class="px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
						title="Usar PDF.js padrão"
					>
						📄 PDF.js
					</button>
				{/if}
			</div>
		</div>
	</div>

	<!-- Área de visualização -->
	<div class="pdf-content">
		{#if isLoading}
			<div class="flex items-center justify-center py-20">
				<div class="text-center">
					<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
					<p class="text-gray-600 dark:text-gray-400">Carregando PDF...</p>
				</div>
			</div>
		{:else if hasError}
			<!-- Exibir erro quando o PDF não pode ser carregado -->
			<div class="flex items-center justify-center py-20">
				<div class="text-center">
					<div class="text-red-500 text-6xl mb-4">⚠️</div>
					<h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
						Erro ao carregar PDF
					</h3>
					<p class="text-gray-600 dark:text-gray-400 mb-4">{errorMessage}</p>
					<div class="space-y-2">
						<p class="text-sm text-gray-500">Tentativas:</p>
						<div class="space-x-2">
							<a 
								href={pdfUrl} 
								target="_blank" 
								rel="noopener noreferrer"
								class="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
							>
								📄 Abrir em nova aba
							</a>
							<a 
								href={pdfUrl} 
								download
								class="inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
							>
								💾 Download
							</a>
						</div>
					</div>
				</div>
			</div>
		{:else}
			{#if useGoogleViewer}
				<!-- Múltiplos visualizadores com fallbacks -->
				<div class="pdf-viewer-wrapper">
					<!-- Método 1: PDF.js público -->
					<iframe
						src="https://mozilla.github.io/pdf.js/web/viewer.html?file={encodeURIComponent(window.location.origin + pdfUrl)}"
						class="w-full pdf-object primary-viewer"
						frameborder="0"
						title={title}
						on:error={handleGoogleViewerError}
					></iframe>
					
					<!-- Método 2: Visualizador simples personalizado -->
					<div class="simple-viewer hidden">
						<div class="viewer-controls bg-gray-800 text-white p-2 flex justify-between items-center">
							<span class="text-sm">📄 {title}</span>
							<div class="flex gap-2">
								<a
									href={pdfUrl}
									target="_blank"
									class="px-2 py-1 bg-blue-600 rounded text-xs hover:bg-blue-700"
								>
									Abrir em nova aba
								</a>
								<a
									href={pdfUrl}
									download
									class="px-2 py-1 bg-green-600 rounded text-xs hover:bg-green-700"
								>
									Download
								</a>
							</div>
						</div>
						<object
							data="{pdfUrl}#toolbar=1&navpanes=1&scrollbar=1"
							type="application/pdf"
							class="w-full simple-pdf-object"
							title={title}
						>
							<div class="flex items-center justify-center py-20">
								<div class="text-center space-y-4">
									<p class="text-gray-600 dark:text-gray-400 mb-4">
										PDF não pode ser exibido inline neste navegador.
									</p>
									<div class="flex gap-4 justify-center flex-wrap">
										<button
											on:click={() => useGoogleViewer = false}
											class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
										>
											📄 Tentar PDF.js
										</button>
										<a
											href={pdfUrl}
											target="_blank"
											rel="noopener noreferrer"
											class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors inline-block"
										>
											📂 Abrir PDF
										</a>
									</div>
								</div>
							</div>
						</object>
					</div>
				</div>
			{:else}
				<!-- Usando Mozilla PDF.js via CDN -->
				<iframe
					src="https://mozilla.github.io/pdf.js/web/viewer.html?file={encodeURIComponent(window.location.origin + pdfUrl)}"
					class="w-full pdf-object"
					frameborder="0"
					title={title}
				></iframe>
			{/if}
		{/if}
	</div>
</div>
{:else}
	<div class="pdf-viewer-container bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
		<div class="pdf-content">
			<div class="flex items-center justify-center py-20">
				<div class="text-center">
					<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
					<p class="text-gray-600 dark:text-gray-400">Preparando visualizador PDF...</p>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.pdf-viewer-container {
		max-width: 100%;
		min-height: 600px;
	}
	
	.pdf-viewer-container.fullscreen {
		position: fixed !important;
		top: 0 !important;
		left: 0 !important;
		width: 100vw !important;
		height: 100vh !important;
		z-index: 9999 !important;
		border-radius: 0 !important;
		background: #1f2937 !important;
		box-shadow: none !important;
	}
	
	.pdf-content {
		height: calc(100vh - 120px);
		min-height: 600px;
	}
	
	.fullscreen .pdf-content {
		height: calc(100vh - 80px);
	}
	
	.pdf-object {
		height: 100%;
		border: none;
		background: white;
	}
	
	.pdf-viewer-wrapper {
		height: 100%;
		position: relative;
	}
	
	.hidden {
		display: none !important;
	}
	
	.primary-viewer,
	.simple-viewer {
		transition: opacity 0.3s ease;
	}
	
	.simple-pdf-object {
		height: calc(100% - 40px);
		border: none;
		background: white;
	}
	
	.viewer-controls {
		height: 40px;
		font-size: 0.875rem;
	}
	
	/* Responsividade */
	@media (max-width: 768px) {
		.pdf-controls {
			flex-direction: column;
			gap: 1rem;
		}
		
		.pdf-controls > div {
			text-align: center;
		}
		
		.pdf-content {
			height: calc(100vh - 160px);
			min-height: 500px;
		}
		
		.fullscreen .pdf-content {
			height: calc(100vh - 120px);
		}
	}

	@media (max-width: 480px) {
		.pdf-controls p {
			font-size: 0.75rem;
		}
		
		.pdf-controls button {
			font-size: 0.75rem;
			padding: 0.5rem 0.75rem;
		}
	}
</style>
