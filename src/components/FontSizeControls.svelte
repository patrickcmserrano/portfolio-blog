<!-- src/lib/components/FontSizeControls.svelte -->
<script>
	import { fontScale } from '../lib/stores/fontSize';

	function increaseFont() {
		fontScale.update((scale) => Math.min(scale + 0.1, 1.5)); // Aumenta 10%, até 150%
	}

	function decreaseFont() {
		fontScale.update((scale) => Math.max(scale - 0.1, 0.5)); // Diminui 10%, até 50%
	}

	function resetFont() {
		fontScale.set(1.0); // Volta ao tamanho padrão (100%)
	}
</script>

<div class="font-controls">
	<button on:click={decreaseFont} class="round-btn btn btn-sm variant-ghost-surface">Aa-</button>
	<button on:click={resetFont} class="btn btn-sm variant-ghost-surface">Reset</button>
	<button on:click={increaseFont} class="round-btn btn btn-sm variant-ghost-surface">Aa+</button>
</div>

<style>
	.font-controls {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.round-btn {
		width: 2.5rem; /* Define largura */
		height: 2.5rem; /* Define altura */
		border-radius: 50%; /* Torna o botão redondo */
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
	}

	/* Ensure text is visible in both light and dark modes */
	.round-btn,
	button {
		color: inherit;
	}

	:global(.dark) .font-controls button {
		color: rgb(229 231 235); /* text-gray-200 */
	}

	:global(.dark) .font-controls button:hover {
		background-color: rgb(55 65 81); /* bg-gray-700 */
		color: rgb(255 255 255);
	}
</style>
