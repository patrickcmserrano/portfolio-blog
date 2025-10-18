<script lang="ts">
	import { onMount } from 'svelte';
	import type { Flashcard } from '$lib/flashcards/types';
	import { _ } from 'svelte-i18n';

	export let card: Flashcard;
	export let isFlipped = false;
	export let index = 0;
	export let total = 0;

	let isFlipping = false;

	function toggleFlip() {
		if (!isFlipping) {
			isFlipping = true;
			isFlipped = !isFlipped;
			setTimeout(() => {
				isFlipping = false;
			}, 300);
		}
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.code === 'Space') {
			event.preventDefault();
			toggleFlip();
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeyPress);
		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	});
</script>

<div class="flashcard-container">
	<div class="card-header">
		<span class="card-counter"
			>{index + 1} / {total}</span
		>
		<div class="card-tags">
			{#if card.tags}
				{#each card.tags as tag}
					<span class="tag">{tag}</span>
				{/each}
			{/if}
			{#if card.difficulty}
				<span class="difficulty difficulty-{card.difficulty}">{$_(`flashcards.${card.difficulty}`)}</span>
			{/if}
		</div>
	</div>

	<button
		class="flashcard {isFlipped ? 'flipped' : ''}"
		on:click={toggleFlip}
		on:keydown={(e) => e.key === 'Enter' && toggleFlip()}
		aria-label={isFlipped ? $_('flashcards.showFront') : $_('flashcards.showBack')}
	>
		<div class="card-inner">
			<div class="card-face front">
				<p>{card.front}</p>
			</div>
			<div class="card-face back">
				<p>{card.back}</p>
			</div>
		</div>
	</button>

	<div class="card-footer">
		<p class="hint">{$_('flashcards.pressSpace')} • <strong>{isFlipped ? $_('flashcards.back') : $_('flashcards.front')}</strong></p>
	</div>
</div>

<style>
	.flashcard-container {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		width: 100%;
		max-width: 600px;
		margin: 0 auto;
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.card-counter {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-text-secondary, #666);
		background: var(--color-surface, #f5f5f5);
		padding: 0.25rem 0.75rem;
		border-radius: 0.25rem;
	}

	.card-tags {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.tag {
		font-size: 0.75rem;
		padding: 0.25rem 0.5rem;
		background: var(--color-primary, #0ea5e9);
		color: white;
		border-radius: 0.25rem;
	}

	.difficulty {
		font-size: 0.75rem;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		font-weight: 600;
		text-transform: uppercase;
	}

	.difficulty-easy {
		background: #10b981;
		color: white;
	}

	.difficulty-medium {
		background: #f59e0b;
		color: white;
	}

	.difficulty-hard {
		background: #ef4444;
		color: white;
	}

	.flashcard {
		position: relative;
		width: 100%;
		height: 300px;
		perspective: 1000px;
		background: transparent;
		border: none;
		padding: 0;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.flashcard:hover {
		transform: translateY(-4px);
	}

	.flashcard:focus {
		outline: 2px solid var(--color-primary, #0ea5e9);
		outline-offset: 2px;
	}

	.card-inner {
		position: relative;
		width: 100%;
		height: 100%;
		transition: transform 0.6s;
		transform-style: preserve-3d;
	}

	.flashcard.flipped .card-inner {
		transform: rotateY(180deg);
	}

	.card-face {
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		border-radius: 0.75rem;
		backface-visibility: hidden;
		text-align: center;
	}

	.front {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	}

	.back {
		background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
		color: white;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
		transform: rotateY(180deg);
	}

	.card-face p {
		font-size: 1.125rem;
		line-height: 1.5;
		margin: 0;
		font-weight: 500;
		word-break: break-word;
		word-wrap: break-word;
		overflow-wrap: break-word;
		max-height: 100%;
		overflow-y: auto;
	}

	.card-footer {
		text-align: center;
	}

	.hint {
		font-size: 0.875rem;
		color: var(--color-text-secondary, #666);
		margin: 0;
	}

	/* Dark mode support */
	:global(.dark) .card-counter {
		background: var(--color-surface-dark, #2a2a2a);
		color: var(--color-text-secondary-dark, #999);
	}

	:global(.dark) .hint {
		color: var(--color-text-secondary-dark, #999);
	}
</style>
