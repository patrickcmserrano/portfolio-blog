/**
 * Utility for generating flashcard decks from markdown content
 * This helper can be used with AI-generated markdown to create deck JSON files
 */

export interface MarkdownFlashcard {
	front: string;
	back: string;
}

/**
 * Parse markdown in format:
 * #### 1. Title
 * **Front**: Question
 * **Back**: Answer
 */
export function parseMarkdownFlashcards(markdown: string): MarkdownFlashcard[] {
	const cards: MarkdownFlashcard[] = [];
	
	// Split by lines containing "Front" and "Back"
	const lines = markdown.split('\n');
	let currentCard: Partial<MarkdownFlashcard> | null = null;
	let frontContent = '';
	let backContent = '';
	let collectingFront = false;
	let collectingBack = false;

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];

		// Check for Front marker
		if (line.includes('**Front**:')) {
			if (currentCard && currentCard.front && currentCard.back) {
				cards.push(currentCard as MarkdownFlashcard);
			}
			frontContent = line.replace('**Front**:', '').trim();
			collectingFront = true;
			collectingBack = false;
			currentCard = { front: frontContent };
		}
		// Check for Back marker
		else if (line.includes('**Back**:')) {
			backContent = line.replace('**Back**:', '').trim();
			collectingFront = false;
			collectingBack = true;
			if (currentCard) {
				currentCard.back = backContent;
			}
		}
		// Collect multiline content
		else if (collectingFront && line.trim() && !line.includes('**')) {
			if (currentCard) {
				currentCard.front = (currentCard.front ?? '') + ' ' + line.trim();
			}
		} else if (collectingBack && line.trim() && !line.includes('**')) {
			if (currentCard) {
				currentCard.back = (currentCard.back || '') + ' ' + line.trim();
			}
		}
	}

	// Add last card
	if (currentCard && currentCard.front && currentCard.back) {
		cards.push(currentCard as MarkdownFlashcard);
	}

	return cards;
}

/**
 * Generate a JSON deck template
 */
export function generateDeckTemplate(
	deckId: string,
	title: string,
	description: string,
	category: string,
	cards: MarkdownFlashcard[],
	tags: string[] = []
) {
	return {
		id: deckId,
		title,
		description,
		category,
		language: 'en',
		tags: Array.from(new Set(tags)),
		cardCount: cards.length,
		cards: cards.map((card, index) => ({
			id: `${deckId}-${String(index + 1).padStart(2, '0')}`,
			front: card.front,
			back: card.back,
			tags: [],
			difficulty: 'medium'
		}))
	};
}

/**
 * Export deck to JSON string
 */
export function exportDeckToJSON(deck: any): string {
	return JSON.stringify(deck, null, 2);
}

/**
 * Generate instructions for users on how to add a new deck
 */
export function generateAddDeckInstructions(deckId: string, title: string, category: string): string {
	return `
# Adding New Flashcard Deck

## Steps:

1. Create file: \`static/flashcards/${deckId}.json\`

2. Copy the generated JSON content into the file

3. Update \`static/flashcards/manifest.json\`:
\`\`\`json
{
  "decks": [
    {
      "id": "${deckId}",
      "title": "${title}",
      "category": "${category}"
    }
  ]
}
\`\`\`

4. Access your deck at: \`/portfolio-blog/flashcards/${deckId}\`

For more information, see FLASHCARDS_README.md
`;
}
