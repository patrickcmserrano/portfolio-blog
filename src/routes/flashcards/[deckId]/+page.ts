import { loadFlashcardDeck } from '$lib/flashcards/loader';
import { error } from '@sveltejs/kit';

export const prerender = false;

export const load = async ({ params, fetch }: { params: { deckId: string }; fetch: typeof globalThis.fetch }) => {
	try {
		const deck = await loadFlashcardDeck(params.deckId, fetch);
		
		if (!deck) {
			throw error(404, `Flashcard deck "${params.deckId}" not found`);
		}

		return {
			deck
		};
	} catch (err) {
		console.error('Error loading flashcard deck:', err);
		throw error(404, 'Flashcard deck not found');
	}
};
