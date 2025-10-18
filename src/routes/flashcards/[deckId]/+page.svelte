<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { FlashcardDeck as FlashcardDeckType } from '$lib/flashcards/types';
	import { locale } from 'svelte-i18n';
	import { getTranslatedDeck } from '$lib/flashcards/loader';
	import FlashcardDeck from '../../../components/FlashcardDeck.svelte';

	export let data: PageData;
	let translatedDeck: FlashcardDeckType = data.deck;
	let currentLocale: string = 'en';
	let unsubscribe: (() => void) | undefined;

	onMount(() => {
		// Apply initial translation
		translatedDeck = getTranslatedDeck(data.deck, (currentLocale === 'pt' ? 'pt' : 'en') as 'pt' | 'en');

		// Subscribe to locale changes
		unsubscribe = locale.subscribe((value) => {
			currentLocale = value || 'en';
			// Re-apply translations when locale changes
			translatedDeck = getTranslatedDeck(data.deck, (currentLocale === 'pt' ? 'pt' : 'en') as 'pt' | 'en');
		});

		return () => {
			if (unsubscribe) {
				unsubscribe();
			}
		};
	});
</script>

<svelte:head>
	<title>Flashcards - Study & Memorize</title>
	<meta name="description" content="Interactive flashcards for programming, coding, and software engineering concepts." />
</svelte:head>

<main class="flashcards-page">
	<FlashcardDeck deck={translatedDeck} />
</main>

<style>
	.flashcards-page {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
</style>
