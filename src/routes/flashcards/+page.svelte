<script lang="ts">
	import { onMount } from 'svelte';
	import type { FlashcardDeck } from '$lib/flashcards/types';
	import type { PageData } from './$types';
	import { _ } from 'svelte-i18n';
	import { locale } from 'svelte-i18n';
	import { getTranslatedDeck } from '$lib/flashcards/loader';

	export let data: PageData;

	let decks: FlashcardDeck[] = [];
	let loading = true;
	let selectedCategory: string | null = null;
	let searchQuery = '';
	let currentLocale: string = 'en';

	// Subscribe to locale changes
	let unsubscribe: (() => void) | undefined;

	onMount(() => {
		const loadedDecks = data.decks || [];
		// Apply translations to decks
		decks = loadedDecks.map(deck => 
			getTranslatedDeck(deck, (currentLocale === 'pt' ? 'pt' : 'en') as 'pt' | 'en')
		);
		loading = false;

		// Subscribe to locale changes
		unsubscribe = locale.subscribe((value) => {
			currentLocale = value || 'en';
			// Re-apply translations when locale changes
			decks = decks.map(deck =>
				getTranslatedDeck(deck, (currentLocale === 'pt' ? 'pt' : 'en') as 'pt' | 'en')
			);
		});

		return () => {
			if (unsubscribe) {
				unsubscribe();
			}
		};
	});

	$: categories = Array.from(new Set(decks.map(d => d.category)));
	$: filteredDecks = decks.filter(deck => {
		const matchesCategory = !selectedCategory || deck.category === selectedCategory;
		const matchesSearch =
			!searchQuery ||
			(deck.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
			(deck.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
			deck.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
		return matchesCategory && matchesSearch;
	});
</script>

<svelte:head>
	<title>{$_('flashcards.title')} - {$_('flashcards.subtitle')}</title>
	<meta
		name="description"
		content={$_('flashcards.subtitle')}
	/>
</svelte:head>

<main class="flashcards-main">
	<div class="page-header">
		<h1>📚 {$_('flashcards.title')}</h1>
		<p>{$_('flashcards.subtitle')}</p>
	</div>

	<div class="controls">
		<input
			type="text"
			placeholder={$_('flashcards.searchPlaceholder')}
			bind:value={searchQuery}
			class="search-input"
		/>

		<div class="category-filter">
			<button
				class="filter-btn {selectedCategory === null ? 'active' : ''}"
				on:click={() => (selectedCategory = null)}
			>
				{$_('flashcards.allCategories')} ({decks.length})
			</button>
			{#each categories as category}
				<button
					class="filter-btn {selectedCategory === category ? 'active' : ''}"
					on:click={() => (selectedCategory = category)}
				>
					{category} ({decks.filter(d => d.category === category).length})
				</button>
			{/each}
		</div>
	</div>

	{#if loading}
		<div class="loading">
			<p>{$_('flashcards.loading')}</p>
		</div>
	{:else if filteredDecks.length > 0}
		<div class="decks-grid">
			{#each filteredDecks as deck (deck.id)}
				<a href="/portfolio-blog/flashcards/{deck.id}" class="deck-card">
					<div class="deck-card-content">
						<h3>{deck.title}</h3>
						<p>{deck.description}</p>
						<div class="deck-footer">
							<span class="card-count">{deck.cardCount} {$_('flashcards.cards')}</span>
							<span class="category-tag">{deck.category}</span>
						</div>
						<div class="deck-tags">
							{#each deck.tags.slice(0, 3) as tag}
								<span class="tag">{tag}</span>
							{/each}
							{#if deck.tags.length > 3}
								<span class="tag">+{deck.tags.length - 3}</span>
							{/if}
						</div>
					</div>
				</a>
			{/each}
		</div>
	{:else}
		<div class="empty-state">
			<p>{$_('flashcards.noDecks')}</p>
		</div>
	{/if}
</main>

<style>
	.flashcards-main {
		min-height: 100vh;
		padding: 2rem 1rem;
	}

	.page-header {
		text-align: center;
		margin-bottom: 3rem;
	}

	.page-header h1 {
		font-size: 2.5rem;
		margin: 0 0 1rem 0;
		color: rgb(17 24 39);
		font-weight: 700;
	}

	.page-header p {
		font-size: 1.125rem;
		margin: 0;
		color: rgb(55 65 81);
	}

	.controls {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-bottom: 3rem;
		max-width: 1200px;
		margin-left: auto;
		margin-right: auto;
	}

	.search-input {
		padding: 0.75rem 1.5rem;
		font-size: 1rem;
		border: 2px solid var(--color-border, #e5e5e5);
		border-radius: 0.5rem;
		background: var(--color-surface, #f9f9f9);
		color: var(--color-text, #000);
		transition: all 0.2s ease;
	}

	.search-input:focus {
		outline: none;
		border-color: var(--color-primary, #0ea5e9);
		box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
	}

	.category-filter {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.filter-btn {
		padding: 0.5rem 1rem;
		background: var(--color-surface, #f9f9f9);
		border: 2px solid var(--color-border, #e5e5e5);
		border-radius: 2rem;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-text, #000);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.filter-btn:hover {
		border-color: var(--color-primary, #0ea5e9);
		color: var(--color-primary, #0ea5e9);
	}

	.filter-btn.active {
		background: var(--color-primary, #0ea5e9);
		border-color: var(--color-primary, #0ea5e9);
		color: white;
	}

	.loading,
	.empty-state {
		text-align: center;
		padding: 3rem 1rem;
		color: inherit;
	}

	.decks-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 2rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.deck-card {
		display: block;
		text-decoration: none;
		background: var(--color-surface, #f9f9f9);
		border: 2px solid var(--color-border, #e5e5e5);
		border-radius: 0.75rem;
		padding: 1.5rem;
		transition: all 0.3s ease;
		cursor: pointer;
	}

	.deck-card:hover {
		transform: translateY(-4px);
		border-color: var(--color-primary, #0ea5e9);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
	}

	.deck-card-content h3 {
		margin: 0 0 0.5rem 0;
		color: rgb(17 24 39);
		font-size: 1.25rem;
		font-weight: 700;
	}

	.deck-card-content p {
		margin: 0 0 1rem 0;
		color: rgb(55 65 81);
		font-size: 0.9rem;
		line-height: 1.5;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.deck-footer {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
		font-size: 0.875rem;
	}

	.card-count,
	.category-tag {
		padding: 0.25rem 0.75rem;
		background: var(--color-primary, #0ea5e9);
		color: white;
		border-radius: 2rem;
		font-weight: 600;
	}

	.deck-tags {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.tag {
		display: inline-block;
		padding: 0.25rem 0.5rem;
		background: rgba(14, 165, 233, 0.1);
		color: var(--color-primary, #0ea5e9);
		border-radius: 0.25rem;
		font-size: 0.75rem;
		font-weight: 600;
	}

	/* Dark mode support - text and interactive elements only */
	:global(.dark) .page-header h1 {
		color: rgb(243 244 246);
	}

	:global(.dark) .page-header p {
		color: rgb(209 213 219);
	}

	:global(.dark) .deck-card-content h3 {
		color: rgb(17 24 39);
	}

	:global(.dark) .deck-card-content p,
	:global(.dark) .loading,
	:global(.dark) .empty-state {
		color: rgb(55 65 81);
	}
</style>
