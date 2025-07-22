<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';

	let audio: HTMLAudioElement;
	let isPlaying = false;
	let currentTime = 0;
	let duration = 0;
	let volume = 0.3;

	onMount(() => {
		if (audio) {
			audio.volume = volume;
			
			audio.addEventListener('loadedmetadata', () => {
				duration = audio.duration;
				console.log('Música carregada, duração:', duration);
			});

			audio.addEventListener('timeupdate', () => {
				currentTime = audio.currentTime;
			});

			audio.addEventListener('ended', () => {
				audio.currentTime = 0;
				audio.play().catch(console.error);
			});

			audio.addEventListener('error', (e) => {
				console.error('Erro no áudio:', e);
			});
		}
	});

	function togglePlay() {
		if (isPlaying) {
			audio.pause();
		} else {
			audio.play().catch(console.error);
		}
		isPlaying = !isPlaying;
	}

	function formatTime(time: number): string {
		if (isNaN(time)) return '0:00';
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	}

	$: progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
</script>

<audio
	bind:this={audio}
	src={`${base}/music/Samurai Japanese Lofi HipHop Mix.mp3`}
	preload="metadata"
></audio>

<div class="fixed bottom-4 left-4 bg-surface-100-800-token p-4 rounded-lg shadow-lg border border-surface-300-600-token z-50">
	<h3 class="text-sm font-semibold mb-2">🎵 Teste do Player</h3>
	
	<div class="mb-2">
		<div class="bg-surface-300-600-token rounded-full h-1 w-48 relative">
			<div 
				class="bg-primary-500 h-full rounded-full"
				style="width: {progressPercent}%"
			></div>
		</div>
		<div class="flex justify-between text-xs mt-1">
			<span>{formatTime(currentTime)}</span>
			<span>{formatTime(duration)}</span>
		</div>
	</div>

	<div class="flex items-center space-x-2">
		<button
			on:click={togglePlay}
			class="btn variant-filled-primary btn-sm"
		>
			{isPlaying ? '⏸️' : '▶️'}
		</button>
		
		<input
			type="range"
			min="0"
			max="1"
			step="0.01"
			bind:value={volume}
			on:input={() => audio.volume = volume}
			class="flex-1"
		>
	</div>
	
	{#if duration > 0}
		<p class="text-xs text-surface-500 mt-1">Duração: {formatTime(duration)}</p>
	{/if}
</div>
