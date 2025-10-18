/**
 * Flashcard data types and interfaces
 */

export interface Flashcard {
	id: string;
	front?: string; // Optional - stored in i18n
	back?: string; // Optional - stored in i18n
	tags?: string[];
	difficulty?: 'easy' | 'medium' | 'hard';
	createdAt?: string;
	// i18n support
	i18n?: {
		pt?: {
			front: string;
			back: string;
		};
		en?: {
			front: string;
			back: string;
		};
	};
}

export interface FlashcardDeck {
	id: string;
	title?: string; // Optional - stored in i18n
	description?: string; // Optional - stored in i18n
	category: string;
	language?: string; // 'en' or 'pt'
	tags: string[];
	cardCount: number;
	cards: Flashcard[];
	createdAt?: string;
	updatedAt?: string;
	// i18n support
	i18n?: {
		pt?: {
			title: string;
			description: string;
		};
		en?: {
			title: string;
			description: string;
		};
	};
}

export interface FlashcardProgress {
	deckId: string;
	cardId: string;
	attempts: number;
	correct: number;
	lastReview?: string;
	difficulty?: 'easy' | 'medium' | 'hard';
}
