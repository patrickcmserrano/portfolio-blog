<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { base } from '$app/paths';

	// Estados do player
	let isPlaying = false;
	let currentTime = 0;
	let duration = 0;
	let volume = 0.3;
	let isMinimized = false;
	let audio: HTMLAudioElement;
	let progressBar: HTMLElement;

	// Reactive variables with fallbacks
	$: playText = $_('music.play') || 'Play';
	$: pauseText = $_('music.pause') || 'Pause';
	$: nextText = $_('music.next') || 'Next';
	$: previousText = $_('music.previous') || 'Previous';
	$: volumeText = $_('music.volume') || 'Volume';

	// Store para persistir o estado do player entre navegações
	export const musicPlayerStore = writable({
		isPlaying: false,
		currentTime: 0,
		volume: 0.3,
		isMinimized: false
	});

	onMount(() => {
		// Restaura o estado do player
		const savedState = localStorage.getItem('musicPlayerState');
		if (savedState) {
			try {
				const state = JSON.parse(savedState);
				isPlaying = state.isPlaying;
				currentTime = state.currentTime;
				volume = state.volume;
				isMinimized = state.isMinimized;
			} catch (error) {
				console.warn('Erro ao carregar estado do player:', error);
			}
		}

		// Configura o áudio
		audio.volume = volume;
		audio.currentTime = currentTime;
		
		if (isPlaying) {
			audio.play().catch(() => {
				// Se não conseguir reproduzir automaticamente, apenas mantenha o estado
				isPlaying = false;
				updateStore();
			});
		}

		// Event listeners
		audio.addEventListener('loadedmetadata', () => {
			duration = audio.duration;
		});

		audio.addEventListener('timeupdate', () => {
			currentTime = audio.currentTime;
			updateStore();
		});

		audio.addEventListener('ended', () => {
			// Loop da música
			audio.currentTime = 0;
			audio.play().catch(() => {
				isPlaying = false;
				updateStore();
			});
		});

		audio.addEventListener('error', (e) => {
			console.error('Erro no áudio:', e);
			isPlaying = false;
			updateStore();
		});

		// Listener global para teclas de atalho
		const handleGlobalKeydown = (event: KeyboardEvent) => {
			// Só funciona se não estivermos em um input ou textarea
			if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
				return;
			}
			
			if (event.code === 'Space' && event.ctrlKey) {
				event.preventDefault();
				togglePlay();
			}
		};

		document.addEventListener('keydown', handleGlobalKeydown);

		// Cleanup function
		return () => {
			document.removeEventListener('keydown', handleGlobalKeydown);
		};
	});

	onDestroy(() => {
		if (audio) {
			audio.removeEventListener('loadedmetadata', () => {});
			audio.removeEventListener('timeupdate', () => {});
			audio.removeEventListener('ended', () => {});
		}
	});

	function updateStore() {
		const state = {
			isPlaying,
			currentTime,
			volume,
			isMinimized
		};
		musicPlayerStore.set(state);
		localStorage.setItem('musicPlayerState', JSON.stringify(state));
	}

	function togglePlay() {
		if (!audio) return;
		
		if (isPlaying) {
			audio.pause();
		} else {
			audio.play().catch((error) => {
				console.warn('Não foi possível reproduzir o áudio:', error);
			});
		}
		isPlaying = !isPlaying;
		updateStore();
	}

	function handleVolumeChange(event: Event) {
		const target = event.target as HTMLInputElement;
		volume = parseFloat(target.value);
		audio.volume = volume;
		updateStore();
	}

	function handleProgressClick(event: MouseEvent) {
		if (!progressBar || !duration) return;
		
		const rect = progressBar.getBoundingClientRect();
		const clickX = event.clientX - rect.left;
		const progressPercent = clickX / rect.width;
		
		currentTime = progressPercent * duration;
		audio.currentTime = currentTime;
		updateStore();
	}

	function handleProgressKeydown(event: KeyboardEvent) {
		if (!duration) return;
		
		let newTime = currentTime;
		const step = duration * 0.05; // 5% steps
		
		switch (event.key) {
			case 'ArrowLeft':
				newTime = Math.max(0, currentTime - step);
				break;
			case 'ArrowRight':
				newTime = Math.min(duration, currentTime + step);
				break;
			case 'Home':
				newTime = 0;
				break;
			case 'End':
				newTime = duration;
				break;
			default:
				return;
		}
		
		event.preventDefault();
		audio.currentTime = newTime;
		currentTime = newTime;
		updateStore();
	}

	function toggleMinimize() {
		isMinimized = !isMinimized;
		updateStore();
	}

	function formatTime(time: number): string {
		if (isNaN(time)) return '0:00';
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	}

	// Calcula a porcentagem de progresso
	$: progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
	
	// CSS custom property para o slider de volume
	$: volumeStyle = `--value: ${volume * 100}%`;
</script>

<!-- Elemento de áudio -->
<audio
	bind:this={audio}
	src={`${base}/music/Samurai Japanese Lofi HipHop Mix.mp3`}
	preload="metadata"
></audio>

<!-- Player de música -->
<div 
	class="music-player fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out"
	class:minimized={isMinimized}
>
	<div class="bg-surface-100-800-token backdrop-blur-md rounded-xl shadow-xl border border-surface-300-600-token">
		{#if !isMinimized}
			<!-- Player expandido -->
			<div class="p-4 w-80">
				<!-- Header com título e botão minimizar -->
				<div class="flex items-center justify-between mb-3">
					<div class="flex-1">
						<h3 class="text-sm font-semibold text-token truncate">Samurai Japanese Lofi</h3>
						<p class="text-xs text-surface-500 truncate">Música ambiente • {duration ? formatTime(duration) : 'Carregando...'}</p>
					</div>
					<button
						on:click={toggleMinimize}
						class="btn btn-sm variant-ghost-surface p-1 ml-2"
						aria-label="Minimizar player"
					>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
						</svg>
					</button>
				</div>

				<!-- Barra de progresso -->
				<div class="mb-3">
					<div 
						bind:this={progressBar}
						class="progress-bar bg-surface-300-600-token rounded-full h-2 cursor-pointer relative overflow-hidden"
						on:click={handleProgressClick}
						on:keydown={handleProgressKeydown}
						role="slider"
						tabindex="0"
						aria-label="Progresso da música"
						aria-valuemin="0"
						aria-valuemax={duration || 100}
						aria-valuenow={currentTime || 0}
						aria-valuetext="{formatTime(currentTime)} de {formatTime(duration)}"
					>
						<div 
							class="progress-fill bg-primary-500 h-full rounded-full transition-all duration-100"
							style="width: {progressPercent}%"
						></div>
					</div>
					<div class="flex justify-between text-xs text-surface-500 mt-1">
						<span>{formatTime(currentTime)}</span>
						<span>{formatTime(duration)}</span>
					</div>
				</div>

				<!-- Controles -->
				<div class="flex items-center justify-between">
					<!-- Botão Play/Pause -->
					<button
						on:click={togglePlay}
						class="btn variant-filled-primary rounded-full w-10 h-10 flex items-center justify-center"
						aria-label={isPlaying ? 'Pausar música' : 'Reproduzir música'}
					>
						{#if isPlaying}
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
							</svg>
						{:else}
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M8 5v14l11-7z"/>
							</svg>
						{/if}
					</button>

					<!-- Controle de volume -->
					<div class="flex items-center space-x-2 flex-1 ml-4">
						<svg class="w-4 h-4 text-surface-500" fill="currentColor" viewBox="0 0 24 24">
							<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
						</svg>
						<input
							type="range"
							min="0"
							max="1"
							step="0.01"
							bind:value={volume}
							on:input={handleVolumeChange}
							class="flex-1 h-1 bg-surface-300-600-token rounded-full appearance-none cursor-pointer slider"
							style={volumeStyle}
							aria-label="Controle de volume"
						>
					</div>
				</div>
			</div>
		{:else}
			<!-- Player minimizado -->
			<div class="p-2">
				<button
					on:click={toggleMinimize}
					class="btn variant-ghost-surface rounded-full w-12 h-12 flex items-center justify-center relative"
					aria-label="Expandir player"
				>
					<!-- Ícone de música com animação de ondas quando tocando -->
					<div class="relative">
						<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
						</svg>
						{#if isPlaying}
							<div class="absolute -top-1 -right-1 w-3 h-3">
								<div class="absolute inset-0 bg-primary-500 rounded-full animate-ping"></div>
								<div class="absolute inset-0 bg-primary-500 rounded-full"></div>
							</div>
						{/if}
					</div>
				</button>
			</div>
		{/if}
	</div>
</div>

<style>
	.music-player.minimized {
		transform: scale(0.9);
	}

	.slider {
		background: linear-gradient(to right, rgb(var(--color-primary-500)) 0%, rgb(var(--color-primary-500)) var(--value, 30%), rgb(var(--color-surface-300)) var(--value, 30%), rgb(var(--color-surface-300)) 100%);
	}

	.slider::-webkit-slider-thumb {
		appearance: none;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: rgb(var(--color-primary-500));
		cursor: pointer;
		border: 2px solid white;
		box-shadow: 0 2px 4px rgba(0,0,0,0.2);
		transition: transform 0.2s ease;
	}

	.slider::-webkit-slider-thumb:hover {
		transform: scale(1.1);
	}

	.slider::-moz-range-thumb {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: rgb(var(--color-primary-500));
		cursor: pointer;
		border: 2px solid white;
		box-shadow: 0 2px 4px rgba(0,0,0,0.2);
	}

	.progress-bar {
		transition: transform 0.2s ease;
	}

	.progress-bar:hover {
		transform: scaleY(1.2);
	}

	.progress-bar:focus {
		outline: 2px solid rgb(var(--color-primary-500));
		outline-offset: 2px;
	}

	.progress-fill {
		box-shadow: 0 0 8px rgba(var(--color-primary-500), 0.3);
		transition: width 0.1s ease;
	}

	@keyframes pulse {
		0%, 100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.05);
		}
	}

	.music-player:hover {
		animation: pulse 2s infinite;
	}

	.music-player {
		animation: slideIn 0.5s ease-out;
	}

	@keyframes slideIn {
		from {
			transform: translateX(100%) scale(0.8);
			opacity: 0;
		}
		to {
			transform: translateX(0) scale(1);
			opacity: 1;
		}
	}

	/* Animação para o botão play/pause */
	.btn svg {
		transition: transform 0.2s ease;
	}

	.btn:hover svg {
		transform: scale(1.1);
	}

	/* Responsividade aprimorada */
	@media (max-width: 640px) {
		.music-player {
			bottom: 1rem;
			right: 1rem;
			left: 1rem;
		}
		
		.music-player:not(.minimized) .w-80 {
			width: 100%;
			max-width: none;
		}
	}

	@media (max-width: 480px) {
		.music-player:not(.minimized) .p-4 {
			padding: 0.75rem;
		}
	}

	/* Melhor acessibilidade para modo escuro */
	:global(.dark) .progress-bar:focus {
		outline-color: rgb(var(--color-primary-400));
	}
</style>
