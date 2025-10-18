import { browser } from '$app/environment';
import { waitLocale } from 'svelte-i18n';
import { loadFlashcardDecks } from '$lib/flashcards/loader';

export const prerender = true;
export const ssr = true;

export async function load({ fetch }) {
	if (browser) {
		// On client, let i18n initialize naturally
	} else {
		// On server, wait for locale and load decks
		await waitLocale();
	}
	
	// Preload decks on server-side
	try {
		const decks = await loadFlashcardDecks(fetch);
		return { decks };
	} catch (error) {
		console.error('Error preloading decks:', error);
		return { decks: [] };
	}
}
