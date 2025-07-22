<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { musicPlayerStore } from '$lib/stores/musicPlayer';

	let keydownHandler: (event: KeyboardEvent) => void;

	onMount(() => {
		keydownHandler = (event: KeyboardEvent) => {
			// Ctrl/Cmd + M para toggle play/pause
			if ((event.ctrlKey || event.metaKey) && event.key === 'm') {
				event.preventDefault();
				
				// Obtém o estado atual
				musicPlayerStore.subscribe(state => {
					if (state.isPlaying) {
						// Dispara evento para pausar
						document.dispatchEvent(new CustomEvent('music-pause'));
					} else {
						// Dispara evento para tocar
						document.dispatchEvent(new CustomEvent('music-play'));
					}
				})();
			}
		};

		document.addEventListener('keydown', keydownHandler);
	});

	onDestroy(() => {
		if (keydownHandler) {
			document.removeEventListener('keydown', keydownHandler);
		}
	});
</script>

<!-- Este componente não renderiza nada, apenas gerencia eventos globais -->
