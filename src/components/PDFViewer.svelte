<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let pdfUrl: string;
	export let title: string = 'Visualizador PDF';

	let viewerMode: 'loading' | 'iframe' | 'object' | 'fallback' = 'loading';
	let showDebug = false;

	onMount(() => {
		if (!browser) return;
		
		// Testar suporte a PDF e decidir o melhor método
		testPdfSupport();
	});

	function testPdfSupport() {
		// Primeiro, verificar se o PDF existe
		fetch(pdfUrl, { method: 'HEAD' })
			.then(response => {
				if (!response.ok) {
					throw new Error('PDF não encontrado');
				}
				
				// Testar suporte nativo do navegador
				const testObj = document.createElement('object');
				testObj.data = 'data:application/pdf;base64,JVBERi0x';
				testObj.type = 'application/pdf';
				testObj.style.position = 'absolute';
				testObj.style.left = '-9999px';
				testObj.style.width = '1px';
				testObj.style.height = '1px';
				
				document.body.appendChild(testObj);
				
				setTimeout(() => {
					const hasNativeSupport = testObj.clientHeight > 0;
					document.body.removeChild(testObj);
					
					// Decidir o melhor método baseado no suporte
					if (hasNativeSupport) {
						viewerMode = 'iframe';
					} else {
						viewerMode = 'object';
					}
				}, 100);
			})
			.catch(() => {
				viewerMode = 'fallback';
			});
	}

	function openInNewTab() {
		window.open(pdfUrl, '_blank', 'noopener,noreferrer');
	}

	function downloadPdf() {
		const link = document.createElement('a');
		link.href = pdfUrl;
		link.download = title.replace(/[^a-zA-Z0-9]/g, '_') + '.pdf';
		link.click();
	}

	function switchToFallback() {
		viewerMode = 'fallback';
	}
</script>

<!-- Debug toggle (apenas em desenvolvimento) -->
{#if browser && window.location.hostname === 'localhost'}
	<button 
		on:click={() => showDebug = !showDebug}
		style="position: absolute; top: 10px; right: 10px; z-index: 1000; padding: 4px 8px; font-size: 12px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
	>
		{showDebug ? 'Ocultar' : 'Debug'}
	</button>
{/if}

<!-- Debug info (apenas se ativado) -->
{#if showDebug}
	<div style="padding: 1rem; background: #f8f9fa; margin-bottom: 1rem; border-radius: 4px; border-left: 4px solid #007bff;">
		<h4 style="margin: 0 0 0.5rem 0; color: #495057;">🔍 Debug Info</h4>
		<p style="margin: 0.25rem 0; font-size: 14px;"><strong>Título:</strong> {title}</p>
		<p style="margin: 0.25rem 0; font-size: 14px;"><strong>URL:</strong> <code>{pdfUrl}</code></p>
		<p style="margin: 0.25rem 0; font-size: 14px;"><strong>Modo:</strong> <span style="background: #e9ecef; padding: 2px 6px; border-radius: 3px;">{viewerMode}</span></p>
	</div>
{/if}

<div class="pdf-container">
	<!-- Header com controles -->
	<div class="pdf-header">
		<h3 class="pdf-title">📄 {title}</h3>
		<div class="pdf-controls">
			<button on:click={openInNewTab} class="btn btn-primary">
				🔗 Nova Aba
			</button>
			<button on:click={downloadPdf} class="btn btn-secondary">
				💾 Download
			</button>
		</div>
	</div>

	<!-- Conteúdo principal -->
	<div class="pdf-content">
		{#if viewerMode === 'loading'}
			<!-- Estado de carregamento -->
			<div class="center-content">
				<div class="spinner"></div>
				<p>Carregando mapa mental...</p>
			</div>
			
		{:else if viewerMode === 'iframe'}
			<!-- Visualizador principal: iframe -->
			<iframe 
				src={pdfUrl}
				title={title}
				class="pdf-viewer"
				on:error={switchToFallback}
			></iframe>
			
		{:else if viewerMode === 'object'}
			<!-- Visualizador alternativo: object -->
			<object 
				data={pdfUrl}
				type="application/pdf"
				title={title}
				class="pdf-viewer"
			>
				<!-- Fallback automático se object falhar -->
				<div class="center-content">
					<div class="fallback-message">
						<div class="icon">📄</div>
						<h4>Visualização não suportada</h4>
						<p>Seu navegador não consegue exibir o PDF inline.</p>
						<div class="fallback-actions">
							<button on:click={openInNewTab} class="btn btn-primary">
								🔗 Abrir PDF
							</button>
							<button on:click={downloadPdf} class="btn btn-secondary">
								💾 Download
							</button>
						</div>
					</div>
				</div>
			</object>
			
		{:else}
			<!-- Fallback final: apenas links -->
			<div class="center-content">
				<div class="fallback-message">
					<div class="icon">⚠️</div>
					<h4>PDF não disponível</h4>
					<p>Não foi possível carregar o mapa mental inline.</p>
					<div class="fallback-actions">
						<button on:click={openInNewTab} class="btn btn-primary">
							🔗 Abrir em Nova Aba
						</button>
						<button on:click={downloadPdf} class="btn btn-secondary">
							💾 Download PDF
						</button>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.pdf-container {
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		overflow: hidden;
		background: white;
		box-shadow: 0 2px 8px rgba(0,0,0,0.1);
		margin: 1rem 0;
	}

	.pdf-header {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		padding: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.pdf-title {
		margin: 0;
		font-size: 1.2rem;
		font-weight: 600;
	}

	.pdf-controls {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.pdf-content {
		position: relative;
		background: #f8f9fa;
	}

	.pdf-viewer {
		width: 100%;
		height: 500px;
		border: none;
		display: block;
		background: white;
	}

	.center-content {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 500px;
		text-align: center;
	}

	.fallback-message {
		max-width: 400px;
		padding: 2rem;
	}

	.fallback-message .icon {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.fallback-message h4 {
		margin: 0 0 1rem 0;
		color: #495057;
		font-size: 1.25rem;
	}

	.fallback-message p {
		margin: 0 0 2rem 0;
		color: #6c757d;
		line-height: 1.5;
	}

	.fallback-actions {
		display: flex;
		gap: 0.75rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.btn {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		font-size: 0.9rem;
		font-weight: 500;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		transition: all 0.2s ease;
	}

	.btn:hover {
		transform: translateY(-1px);
		box-shadow: 0 2px 8px rgba(0,0,0,0.15);
	}

	.btn-primary {
		background: #007bff;
		color: white;
	}

	.btn-primary:hover {
		background: #0056b3;
	}

	.btn-secondary {
		background: #6c757d;
		color: white;
	}

	.btn-secondary:hover {
		background: #545b62;
	}

	.spinner {
		width: 40px;
		height: 40px;
		border: 4px solid #f3f3f3;
		border-top: 4px solid #007bff;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin: 0 auto 1rem auto;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	/* Dark mode support */
	:global(.dark) .pdf-container {
		background: #1f2937;
		border-color: #374151;
	}

	:global(.dark) .pdf-content {
		background: #111827;
	}

	:global(.dark) .fallback-message h4 {
		color: #f9fafb;
	}

	:global(.dark) .fallback-message p {
		color: #d1d5db;
	}

	/* Responsividade */
	@media (max-width: 768px) {
		.pdf-header {
			flex-direction: column;
			text-align: center;
		}
		
		.pdf-viewer {
			height: 400px;
		}
		
		.center-content {
			height: 400px;
		}
		
		.fallback-message {
			padding: 1rem;
		}
		
		.fallback-actions {
			flex-direction: column;
		}
		
		.btn {
			width: 100%;
			justify-content: center;
		}
	}
</style>