/**
 * Utility functions for loading and managing flashcard decks
 */

import type { FlashcardDeck } from './types';

/**
 * Load a flashcard deck from a JSON file
 * @param deckId - The ID of the deck to load (without .json extension)
 * @param fetchFn - Optional fetch function (use event.fetch for server-side code)
 * @returns The flashcard deck data
 */
export async function loadFlashcardDeck(
	deckId: string,
	fetchFn: typeof fetch = globalThis.fetch
): Promise<FlashcardDeck> {
	try {
		const response = await fetchFn(`/portfolio-blog/flashcards/${deckId}.json`);
		if (!response.ok) {
			throw new Error(`Failed to load flashcard deck: ${deckId}`);
		}
		const deck = (await response.json()) as FlashcardDeck;
		return deck;
	} catch (error) {
		console.error(`Error loading flashcard deck ${deckId}:`, error);
		throw error;
	}
}

/**
 * Load all available flashcard decks (from a manifest)
 * @param fetchFn - Optional fetch function (use event.fetch for server-side code)
 * @returns Array of available flashcard decks
 */
export async function loadFlashcardDecks(
	fetchFn: typeof fetch = globalThis.fetch
): Promise<FlashcardDeck[]> {
	try {
		const response = await fetchFn('/portfolio-blog/flashcards/manifest.json');
		if (!response.ok) {
			throw new Error('Failed to load flashcard manifest');
		}
		const { decks } = (await response.json()) as { decks: Array<{ id: string; title: string; category: string }> };
		
		// Load each deck concurrently
		const loadedDecks = await Promise.all(
			decks.map(deck => loadFlashcardDeck(deck.id, fetchFn))
		);
		
		return loadedDecks;
	} catch (error) {
		console.error('Error loading flashcard decks:', error);
		return [];
	}
}

/**
 * Get local storage key for deck progress
 */
export function getProgressKey(deckId: string): string {
	return `flashcards_progress_${deckId}`;
}

/**
 * Save progress to local storage
 */
export function saveProgress(deckId: string, progress: Record<string, any>): void {
	if (typeof window !== 'undefined') {
		localStorage.setItem(getProgressKey(deckId), JSON.stringify(progress));
	}
}

/**
 * Load progress from local storage
 */
export function loadProgress(deckId: string): Record<string, any> {
	if (typeof window !== 'undefined') {
		const key = getProgressKey(deckId);
		const stored = localStorage.getItem(key);
		return stored ? JSON.parse(stored) : {};
	}
	return {};
}

/**
 * Clear all progress for a deck
 */
export function clearProgress(deckId: string): void {
	if (typeof window !== 'undefined') {
		localStorage.removeItem(getProgressKey(deckId));
	}
}

/**
 * Get flashcard decks by category
 */
export async function getFlashcardsByCategory(category: string): Promise<FlashcardDeck[]> {
	const decks = await loadFlashcardDecks();
	return decks.filter(deck => deck.category.toLowerCase() === category.toLowerCase());
}

/**
 * Search flashcards by tags
 */
export function searchFlashcardsByTag(decks: FlashcardDeck[], tag: string): FlashcardDeck[] {
	return decks.filter(deck => 
		deck.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
	);
}

/**
 * Get translated deck content for a specific language
 * @param deck - The flashcard deck
 * @param language - Target language code ('pt' or 'en')
 * @returns Translated deck with translated title and description
 */
export function getTranslatedDeck(deck: FlashcardDeck, language: 'pt' | 'en' = 'en'): FlashcardDeck {
	if (!deck.i18n || !deck.i18n[language]) {
		// If no translation, try to use from i18n.en or fallback
		const defaultTranslation = deck.i18n?.en;
		if (defaultTranslation) {
			return {
				...deck,
				title: defaultTranslation.title || deck.title || 'Untitled Deck',
				description: defaultTranslation.description || deck.description || ''
			};
		}
		return {
			...deck,
			title: deck.title || 'Untitled Deck',
			description: deck.description || ''
		};
	}

	const translation = deck.i18n[language];
	return {
		...deck,
		title: translation.title || deck.title || 'Untitled Deck',
		description: translation.description || deck.description || ''
	};
}

/**
 * Get translated card for a specific language
 * @param card - The flashcard
 * @param language - Target language code ('pt' or 'en')
 * @returns Translated card with translated front and back
 */
export function getTranslatedCard(card: any, language: 'pt' | 'en' = 'en') {
	if (!card.i18n || !card.i18n[language]) {
		// If no translation, try to use from i18n.en or fallback
		const defaultTranslation = card.i18n?.en;
		if (defaultTranslation) {
			return {
				...card,
				front: defaultTranslation.front || card.front || '?',
				back: defaultTranslation.back || card.back || '?'
			};
		}
		return {
			...card,
			front: card.front || '?',
			back: card.back || '?'
		};
	}

	const translation = card.i18n[language];
	return {
		...card,
		front: translation.front || card.front || '?',
		back: translation.back || card.back || '?'
	};
}
