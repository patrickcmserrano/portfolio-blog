<script lang="ts">
	import { isLoading } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { currentLocale } from '../lib/i18n';
	
	let ready = false;
	
	onMount(() => {
		// Simples verificação: se não está carregando, está pronto
		const unsubscribe = isLoading.subscribe(loading => {
			ready = !loading;
		});
		
		// Força ready depois de 1 segundo para evitar loading infinito
		// Force ready after a short timeout to avoid long blocking if translations are slow.
		// Kept short (250ms) so most clients will render quickly and let translations load
		// in the background. If translations arrive earlier, `isLoading` subscription will
		// already set ready = true.
		setTimeout(() => {
			if (!ready) ready = true;
		}, 250);
		
		return unsubscribe;
	});
	
	$: locale = $currentLocale;
</script>

{#if ready}
	<slot />
{:else}
	<div class="loading-container">
		<div class="loading-spinner"></div>
		<p>Carregando traduções...</p>
	</div>
{/if}

<style>
	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		background: var(--color-surface-50);
	}
	
	.loading-spinner {
		width: 40px;
		height: 40px;
		border: 4px solid #f3f3f3;
		border-top: 4px solid #3498db;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin-bottom: 1rem;
	}
	
	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
</style>