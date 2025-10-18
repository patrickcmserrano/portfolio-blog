<script lang="ts">
	import { onMount } from 'svelte';
	import FlashcardCard from './FlashcardCard.svelte';
	import type { Flashcard, FlashcardDeck } from '$lib/flashcards/types';
	import { saveProgress, loadProgress, getTranslatedCard, getTranslatedDeck } from '$lib/flashcards/loader';
	import { _ } from 'svelte-i18n';
	import { locale } from 'svelte-i18n';

	export let deck: FlashcardDeck;

	let currentCardIndex = 0;
	let isFlipped = false;
	let cards: Flashcard[] = [];
	let progress: Record<string, { correct: number; attempts: number }> = {};
	let displayMode: 'sequential' | 'random' = 'sequential';
	let filterTag: string | null = null;
	let currentLocale: string = 'en';

	// Subscribe to locale changes
	let unsubscribe: (() => void) | undefined;

	onMount(() => {
		// Apply initial translations to cards
		cards = deck.cards.map(card => 
			getTranslatedCard(card, (currentLocale === 'pt' ? 'pt' : 'en') as 'pt' | 'en')
		);
		progress = loadProgress(deck.id);
		shuffleIfNeeded();

		// Subscribe to locale changes
		unsubscribe = locale.subscribe((value) => {
			currentLocale = value || 'en';
			// Re-apply translations when locale changes
			cards = cards.map(card =>
				getTranslatedCard(card, (currentLocale === 'pt' ? 'pt' : 'en') as 'pt' | 'en')
			);
		});

		// Handle keyboard navigation
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'ArrowLeft') {
				event.preventDefault();
				prevCard();
			} else if (event.key === 'ArrowRight') {
				event.preventDefault();
				nextCard();
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			if (unsubscribe) {
				unsubscribe();
			}
			window.removeEventListener('keydown', handleKeyDown);
		};
	});

	function shuffleIfNeeded() {
		if (displayMode === 'random') {
			cards = cards.sort(() => Math.random() - 0.5);
		} else {
			cards = deck.cards.map(card => 
				getTranslatedCard(card, (currentLocale === 'pt' ? 'pt' : 'en') as 'pt' | 'en')
			);
		}
		currentCardIndex = 0;
		isFlipped = false;
	}

	function nextCard() {
		if (currentCardIndex < cards.length - 1) {
			currentCardIndex++;
			isFlipped = false;
		}
	}

	function prevCard() {
		if (currentCardIndex > 0) {
			currentCardIndex--;
			isFlipped = false;
		}
	}

	function markCorrect() {
		const cardId = cards[currentCardIndex].id;
		if (!progress[cardId]) {
			progress[cardId] = { correct: 0, attempts: 0 };
		}
		progress[cardId].correct++;
		progress[cardId].attempts++;
		saveProgress(deck.id, progress);
		nextCard();
	}

	function markIncorrect() {
		const cardId = cards[currentCardIndex].id;
		if (!progress[cardId]) {
			progress[cardId] = { correct: 0, attempts: 0 };
		}
		progress[cardId].attempts++;
		saveProgress(deck.id, progress);
		nextCard();
	}

	function resetDeck() {
		currentCardIndex = 0;
		isFlipped = false;
		if (confirm('Are you sure you want to reset all progress for this deck?')) {
			progress = {};
			saveProgress(deck.id, progress);
		}
	}

	function toggleMode() {
		displayMode = displayMode === 'sequential' ? 'random' : 'sequential';
		shuffleIfNeeded();
	}

	$: currentCard = cards[currentCardIndex];
	$: progressPercent = cards.length > 0 ? ((currentCardIndex + 1) / cards.length) * 100 : 0;
	$: correctCount = Object.values(progress).reduce((sum, p) => sum + p.correct, 0);
	$: totalAttempts = Object.values(progress).reduce((sum, p) => sum + p.attempts, 0);
</script>

<div class="deck-container">
	<div class="deck-header">
		<div class="deck-info">
			<h1>{deck.title || 'Untitled Deck'}</h1>
			<p class="deck-description">{deck.description || ''}</p>
			<div class="deck-meta">
				<span class="category">{deck.category}</span>
				<span class="card-count">{cards.length} {$_('flashcards.cards')}</span>
				{#if totalAttempts > 0}
					<span class="accuracy"
						>{Math.round((correctCount / totalAttempts) * 100)}{$_('flashcards.accuracy')}</span
					>
				{/if}
			</div>
		</div>
	</div>

	<div class="progress-bar">
		<div class="progress-fill" style="width: {progressPercent}%"></div>
	</div>

	{#if currentCard}
		<div class="card-display">
			<FlashcardCard card={currentCard} bind:isFlipped index={currentCardIndex} total={cards.length} />
		</div>

		<div class="card-actions">
			<button class="btn btn-secondary" on:click={markIncorrect} disabled={totalAttempts === 0}>
				{$_('flashcards.incorrect')}
			</button>
			<button class="btn btn-primary" on:click={markCorrect}>{$_('flashcards.correct')}</button>
		</div>

		<div class="navigation">
			<button
				class="btn btn-outline"
				on:click={prevCard}
				disabled={currentCardIndex === 0}
				title={$_('flashcards.previousCard')}
			>
				← {$_('flashcards.previous')}
			</button>
			<div class="nav-info">
				<div>{currentCardIndex + 1} / {cards.length}</div>
				<div class="keyboard-hint">Use ← → arrows</div>
			</div>
			<button
				class="btn btn-outline"
				on:click={nextCard}
				disabled={currentCardIndex === cards.length - 1}
				title={$_('flashcards.nextCard')}
			>
				{$_('flashcards.next')} →
			</button>
		</div>
	{/if}

	<div class="deck-controls">
		<button class="btn btn-small btn-outline" on:click={toggleMode}>
			{displayMode === 'sequential' ? '🔀' : '📋'} {$_('flashcards.mode')}: {displayMode === 'sequential' ? $_('flashcards.sequential') : $_('flashcards.random')}
		</button>
		<button class="btn btn-small btn-outline" on:click={resetDeck}> {$_('flashcards.resetProgress')} </button>
	</div>

	{#if cards.length === 0}
		<div class="empty-state">
			<p>{$_('flashcards.emptyDeck')}</p>
		</div>
	{/if}
</div>

<style>
	.deck-container {
		max-width: 900px;
		margin: 0 auto;
		padding: 2rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.deck-header {
		text-align: center;
		margin-bottom: 1rem;
	}

	.deck-info h1 {
		margin: 0 0 0.5rem 0;
		font-size: 2rem;
		color: inherit;
	}

	.deck-description {
		font-size: 1.125rem;
		color: inherit;
		margin: 0.5rem 0 1rem 0;
	}

	.deck-meta {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
		font-size: 0.875rem;
	}

	.category,
	.card-count,
	.accuracy {
		padding: 0.5rem 1rem;
		background: var(--color-surface, #f5f5f5);
		border-radius: 2rem;
		color: inherit;
		font-weight: 600;
	}

	.accuracy {
		background: #10b98130;
		color: #10b981;
	}

	.progress-bar {
		width: 100%;
		height: 8px;
		background: var(--color-surface, #f5f5f5);
		border-radius: 4px;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, #667eea, #764ba2);
		transition: width 0.3s ease;
	}

	.card-display {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 400px;
	}

	.card-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin: 1rem 0;
	}

	.navigation {
		display: flex;
		gap: 1rem;
		justify-content: center;
		align-items: center;
		margin: 1.5rem 0;
	}

	.nav-info {
		font-size: 0.875rem;
		color: inherit;
		min-width: 80px;
		text-align: center;
		font-weight: 600;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
	}

	.keyboard-hint {
		font-size: 0.75rem;
		color: var(--color-text-secondary, #999);
		font-weight: 400;
	}

	.deck-controls {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
		margin-top: 2rem;
		padding-top: 1rem;
		border-top: 1px solid var(--color-surface, #e5e5e5);
	}

	.btn {
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 0.5rem;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	.btn-primary {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
	}

	.btn-primary:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
	}

	.btn-secondary {
		background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
		color: white;
	}

	.btn-secondary:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(245, 87, 108, 0.4);
	}

	.btn-outline {
		background: transparent;
		border: 2px solid var(--color-primary, #0ea5e9);
		color: var(--color-primary, #0ea5e9);
	}

	.btn-outline:hover:not(:disabled) {
		background: var(--color-primary, #0ea5e9);
		color: white;
	}

	.btn-small {
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
	}

	.btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.empty-state {
		text-align: center;
		padding: 2rem;
		color: var(--color-text-secondary, #666);
	}

	/* Dark mode support */
	:global(.dark) .deck-info h1 {
		color: var(--color-text-dark, #fff);
	}

	:global(.dark) .deck-description {
		color: var(--color-text-secondary-dark, #ccc);
	}

	:global(.dark) .category,
	:global(.dark) .card-count {
		background: var(--color-surface-dark, #2a2a2a);
		color: var(--color-text-secondary-dark, #ccc);
	}

	:global(.dark) .progress-bar {
		background: var(--color-surface-dark, #2a2a2a);
	}

	:global(.dark) .nav-info {
		color: var(--color-text-secondary-dark, #ccc);
	}
</style>
