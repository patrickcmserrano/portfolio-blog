<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { base } from '$app/paths';
	import { musicPlayerStore, autoplayAllowed, type MusicPlayerState } from '$lib/stores/musicPlayer';

	// Variáveis locais para controle do DOM
	let audio: HTMLAudioElement;
	let progressBar: HTMLElement;
	let mounted = false;

	// Estado reativo do store
	let state: MusicPlayerState = {
		isPlaying: false,
		currentTime: 0,
		duration: 0,
		volume: 0.3,
		isMinimized: false,
		isLoaded: false
	};

	// Subscribe to store changes
	musicPlayerStore.subscribe(value => {
		if (value) {
			state = value;
		}
	});

	// Função para tentar tocar áudio com tratamento de erro
	async function tryPlay() {
		if (!audio || !mounted) return;
		
		try {
			await audio.play();
			musicPlayerStore.play();
			autoplayAllowed.set(true);
		} catch (error) {
			console.log('Autoplay bloqueado pelo navegador');
			musicPlayerStore.pause();
			autoplayAllowed.set(false);
		}
	}

	onMount(() => {
		mounted = true;
		
		// Inicializa o store se necessário
		if (!state.isLoaded) {
			musicPlayerStore.set({
				isPlaying: false,
				currentTime: 0,
				duration: 0,
				volume: 0.3,
				isMinimized: false,
				isLoaded: false
			});
		}
		
		// Carrega estado salvo
		musicPlayerStore.loadFromLocalStorage();
		
		// Aguarda o carregamento dos metadados
		audio.addEventListener('loadedmetadata', () => {
			musicPlayerStore.setDuration(audio.duration);
			musicPlayerStore.setLoaded(true);
			
			// Restaura configurações
			audio.volume = state.volume;
			audio.currentTime = state.currentTime;
			
			// Tenta reproduzir se estava tocando
			if (state.isPlaying) {
				tryPlay();
			}
		});

		audio.addEventListener('timeupdate', () => {
			musicPlayerStore.setCurrentTime(audio.currentTime);
		});

		audio.addEventListener('ended', () => {
			// Loop da música
			audio.currentTime = 0;
			tryPlay();
		});

		audio.addEventListener('pause', () => {
			musicPlayerStore.pause();
		});

		audio.addEventListener('play', () => {
			musicPlayerStore.play();
		});

		// Listener para interação do usuário (habilita autoplay)
		const enableAutoplay = () => {
			autoplayAllowed.set(true);
			document.removeEventListener('click', enableAutoplay);
			document.removeEventListener('keydown', enableAutoplay);
		};

		document.addEventListener('click', enableAutoplay);
		document.addEventListener('keydown', enableAutoplay);

		// Listeners para eventos globais de música
		const handleMusicPlay = () => tryPlay();
		const handleMusicPause = () => {
			if (audio) audio.pause();
		};

		document.addEventListener('music-play', handleMusicPlay);
		document.addEventListener('music-pause', handleMusicPause);

		// Função de cleanup
		const cleanup = () => {
			document.removeEventListener('music-play', handleMusicPlay);
			document.removeEventListener('music-pause', handleMusicPause);
			document.removeEventListener('click', enableAutoplay);
			document.removeEventListener('keydown', enableAutoplay);
		};

		// Retorna a função de cleanup
		return cleanup;
	});

	onDestroy(() => {
		mounted = false;
	});

	// Salva estado quando houver mudanças
	$: if (mounted && state) {
		musicPlayerStore.saveToLocalStorage(state);
	}

	function togglePlay() {
		if (!audio || !state.isLoaded) return;
		
		if (state.isPlaying) {
			audio.pause();
		} else {
			tryPlay();
		}
	}

	function handleVolumeChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const volume = parseFloat(target.value);
		musicPlayerStore.setVolume(volume);
		if (audio) {
			audio.volume = volume;
		}
	}

	function handleProgressClick(event: MouseEvent) {
		if (!progressBar || !state.duration || !audio) return;
		
		const rect = progressBar.getBoundingClientRect();
		const clickX = event.clientX - rect.left;
		const progressPercent = clickX / rect.width;
		
		const newTime = progressPercent * state.duration;
		audio.currentTime = newTime;
		musicPlayerStore.setCurrentTime(newTime);
	}

	function handleProgressKeydown(event: KeyboardEvent) {
		if (!state.duration) return;
		
		let newTime = state.currentTime;
		const step = state.duration * 0.05; // 5% steps
		
		switch (event.key) {
			case 'ArrowLeft':
				newTime = Math.max(0, state.currentTime - step);
				break;
			case 'ArrowRight':
				newTime = Math.min(state.duration, state.currentTime + step);
				break;
			case 'Home':
				newTime = 0;
				break;
			case 'End':
				newTime = state.duration;
				break;
			case 'Enter':
			case ' ':
				event.preventDefault();
				togglePlay();
				return;
			default:
				return;
		}
		
		event.preventDefault();
		audio.currentTime = newTime;
		musicPlayerStore.setCurrentTime(newTime);
	}

	function formatTime(time: number): string {
		if (isNaN(time)) return '0:00';
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	}

	// Calcula a porcentagem de progresso
	$: progressPercent = state?.duration > 0 ? (state.currentTime / state.duration) * 100 : 0;
	
	// CSS custom property para o slider
	$: sliderStyle = `--value: ${(state?.volume || 0.3) * 100}%`;
</script>

<!-- Elemento de áudio -->
<audio
	bind:this={audio}
	src={`${base}/music/Samurai Japanese Lofi HipHop Mix.mp3`}
	preload="metadata"
></audio>

{#if state}
<!-- Player de música -->
<section 
	class="music-player fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out"
	class:minimized={state.isMinimized}
	aria-label="Player de música"
>
	<div class="bg-surface-100-800-token backdrop-blur-md rounded-xl shadow-xl border border-surface-300-600-token">
		{#if !state.isMinimized}
			<!-- Player expandido -->
			<div class="p-4 w-80">
				<!-- Header com título e botão minimizar -->
				<div class="flex items-center justify-between mb-3">
					<div class="flex-1">
						<h3 class="text-sm font-semibold text-token truncate">Samurai Japanese Lofi</h3>
						<p class="text-xs text-surface-500 truncate">Música ambiente</p>
					</div>
					<button
						on:click={() => musicPlayerStore.toggleMinimized()}
						class="btn btn-sm variant-ghost-surface p-1 ml-2 hover:bg-surface-200-700-token transition-colors"
						aria-label="Minimizar player"
					>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
						</svg>
					</button>
				</div>

				<!-- Barra de progresso -->
				<div class="mb-3">
					<div 
						bind:this={progressBar}
						class="progress-bar bg-surface-300-600-token rounded-full h-2 cursor-pointer relative overflow-hidden w-full"
						on:click={handleProgressClick}
						on:keydown={handleProgressKeydown}
						role="slider"
						tabindex="0"
						aria-label="Controle de progresso da música"
						aria-valuemin="0"
						aria-valuemax="100"
						aria-valuenow={Math.round(progressPercent)}
						aria-valuetext="{formatTime(state.currentTime)} de {formatTime(state.duration)}"
					>
						<div 
							class="progress-fill bg-primary-500 h-full rounded-full transition-all duration-100"
							style="width: {progressPercent}%"
						></div>
					</div>
					<div class="flex justify-between text-xs text-surface-500 mt-1">
						<span>{formatTime(state.currentTime)}</span>
						<span>{formatTime(state.duration)}</span>
					</div>
				</div>

				<!-- Controles -->
				<div class="flex items-center justify-between">
					<!-- Botão Play/Pause -->
					<button
						on:click={togglePlay}
						class="btn variant-filled-primary rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200"
						aria-label={state.isPlaying ? 'Pausar música' : 'Reproduzir música'}
						disabled={!state.isLoaded}
					>
						{#if !state.isLoaded}
							<svg class="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
							</svg>
						{:else if state.isPlaying}
							<!-- Ícone de Pause melhorado -->
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
								<path d="M8 5v14c0 .55.45 1 1 1s1-.45 1-1V5c0-.55-.45-1-1-1s-1 .45-1 1zm6 0v14c0 .55.45 1 1 1s1-.45 1-1V5c0-.55-.45-1-1-1s-1 .45-1 1z"/>
							</svg>
						{:else}
							<!-- Ícone de Play melhorado e centralizado -->
							<svg class="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M8 5.14v14.72c0 .77.63 1.39 1.39 1.39.35 0 .69-.13.94-.36l8.09-6.36c.6-.47.6-1.39 0-1.86L10.33 4.31c-.25-.2-.59-.31-.94-.31C8.63 3 8 3.63 8 4.39v.75z"/>
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
							value={state.volume}
							on:input={handleVolumeChange}
							class="flex-1 h-1 bg-surface-300-600-token rounded-full appearance-none cursor-pointer slider"
							style={sliderStyle}
							aria-label="Controle de volume"
						>
					</div>
				</div>
			</div>
		{:else}
			<!-- Player minimizado -->
			<div class="p-2">
				<button
					on:click={() => musicPlayerStore.toggleMinimized()}
					class="btn variant-ghost-surface rounded-full w-12 h-12 flex items-center justify-center relative hover:scale-105 transition-transform duration-200"
					aria-label="Expandir player"
				>
					<!-- Ícone de música com animação de ondas quando tocando -->
					<div class="relative">
						<!-- Ícone de play/pause no centro -->
						{#if state.isPlaying}
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M8 5v14c0 .55.45 1 1 1s1-.45 1-1V5c0-.55-.45-1-1-1s-1 .45-1 1zm6 0v14c0 .55.45 1 1 1s1-.45 1-1V5c0-.55-.45-1-1-1s-1 .45-1 1z"/>
							</svg>
						{:else}
							<svg class="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M8 5.14v14.72c0 .77.63 1.39 1.39 1.39.35 0 .69-.13.94-.36l8.09-6.36c.6-.47.6-1.39 0-1.86L10.33 4.31c-.25-.2-.59-.31-.94-.31C8.63 3 8 3.63 8 4.39v.75z"/>
							</svg>
						{/if}
						
						<!-- Indicador visual de que está tocando -->
						{#if state.isPlaying}
							<div class="absolute -top-1 -right-1 w-3 h-3">
								<div class="absolute inset-0 bg-primary-500 rounded-full animate-ping opacity-75"></div>
								<div class="absolute inset-0 bg-primary-500 rounded-full"></div>
							</div>
						{/if}
					</div>
				</button>
			</div>
		{/if}
	</div>
</section>
{/if}

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

	.progress-bar:hover {
		transform: scaleY(1.2);
	}

	.progress-fill {
		box-shadow: 0 0 8px rgba(var(--color-primary-500), 0.3);
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

	/* Animações de entrada/saída */
	.music-player {
		animation: slideIn 0.3s ease-out;
	}

	@keyframes slideIn {
		from {
			transform: translateX(100%);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}

	/* Estilo para focus */
	.music-player:focus-within {
		outline: 2px solid rgb(var(--color-primary-500));
		outline-offset: 2px;
	}

	/* Responsividade */
	@media (max-width: 640px) {
		.music-player {
			bottom: 1rem;
			right: 1rem;
		}
		
		.music-player:not(.minimized) .w-80 {
			width: calc(100vw - 2rem);
			max-width: 320px;
		}
	}
</style>
