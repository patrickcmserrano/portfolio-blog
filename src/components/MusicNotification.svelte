<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	// Store para controlar se a notificação deve ser exibida
	const showNotification = writable(false);
	
	let dismissed = false;

	onMount(() => {
		// Verifica se o usuário já foi notificado sobre a música
		const musicNotificationShown = localStorage.getItem('musicNotificationShown');
		
		if (!musicNotificationShown) {
			// Mostra a notificação após um pequeno delay
			setTimeout(() => {
				showNotification.set(true);
			}, 2000);
		}
	});

	function dismissNotification() {
		dismissed = true;
		showNotification.set(false);
		localStorage.setItem('musicNotificationShown', 'true');
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			dismissNotification();
		}
	}
</script>

{#if $showNotification && !dismissed}
	<div 
		class="fixed top-4 right-4 z-40 max-w-sm bg-surface-100-800-token border border-surface-300-600-token rounded-lg shadow-lg p-4 animate-in slide-in-from-top-2 duration-300"
		role="alert"
		aria-live="polite"
	>
		<div class="flex items-start space-x-3">
			<!-- Ícone de música -->
			<div class="flex-shrink-0">
				<svg class="w-6 h-6 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
					<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
				</svg>
			</div>
			
			<div class="flex-1">
				<h3 class="text-sm font-semibold text-token mb-1">
					🎵 Música Ambiente Disponível
				</h3>
				<p class="text-sm text-surface-600-300-token mb-2">
					Ative o player de música no canto inferior direito para uma experiência mais relaxante enquanto navega pelo site.
				</p>
				<div class="flex space-x-2">
					<button
						on:click={dismissNotification}
						class="btn btn-sm variant-ghost-primary"
					>
						Entendi
					</button>
				</div>
			</div>
			
			<!-- Botão de fechar -->
			<button
				on:click={dismissNotification}
				class="flex-shrink-0 text-surface-500 hover:text-surface-700"
				aria-label="Fechar notificação"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
				</svg>
			</button>
		</div>
	</div>
{/if}

<style>
	@keyframes slide-in-from-top-2 {
		from {
			transform: translateY(-0.5rem);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.animate-in {
		animation-fill-mode: both;
	}

	.slide-in-from-top-2 {
		animation-name: slide-in-from-top-2;
	}

	.duration-300 {
		animation-duration: 300ms;
	}
</style>
