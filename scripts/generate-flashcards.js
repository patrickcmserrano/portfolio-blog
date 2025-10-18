#!/usr/bin/env node

/**
 * Flashcard Deck Generator CLI
 * 
 * Usage:
 *   node scripts/generate-flashcards.js <markdown-file> <deck-id> <title> <category>
 * 
 * Example:
 *   node scripts/generate-flashcards.js flashcards.md react-hooks "React Hooks" "Frontend"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Parse markdown flashcards
 */
function parseMarkdownFlashcards(markdown) {
	const cards = [];
	
	// Split by numbered entries like "#### 1. Title"
	const cardBlocks = markdown.split(/####\s+\d+\.\s+/);
	
	for (let block of cardBlocks) {
		if (!block.trim()) continue;
		
		let front = '';
		let back = '';
		
		// Extract Front
		const frontMatch = block.match(/\*\*Front\*\*:\s*(.+?)(?=\*\*Back\*\*:|$)/s);
		if (frontMatch) {
			front = frontMatch[1].trim().replace(/\n+/g, ' ').trim();
		}
		
		// Extract Back
		const backMatch = block.match(/\*\*Back\*\*:\s*(.+?)$/s);
		if (backMatch) {
			back = backMatch[1].trim().replace(/\n+/g, ' ').trim();
		}
		
		if (front && back) {
			cards.push({ front, back });
		}
	}
	
	return cards;
}

/**
 * Generate deck JSON
 */
function generateDeck(deckId, title, description, category, cards, tags = []) {
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
 * Main function
 */
function main() {
	const args = process.argv.slice(2);
	
	if (args.length < 4) {
		console.log(`
Usage: node scripts/generate-flashcards.js <markdown-file> <deck-id> <title> <category> [tags...]

Example:
  node scripts/generate-flashcards.js fp.md functional-programming "Functional Programming" "Programming Paradigms" FP Clojure

The markdown file should use this format:
  #### 1. Concept Name
  **Front**: Question here?
  **Back**: Answer here with examples.
  
  #### 2. Another Concept
  **Front**: Another question?
  **Back**: Another answer.
		`);
		process.exit(1);
	}
	
	const [markdownFile, deckId, title, category, ...tagsArg] = args;
	
	try {
		// Read markdown file
		const fullPath = path.resolve(markdownFile);
		if (!fs.existsSync(fullPath)) {
			console.error(`Error: File not found: ${fullPath}`);
			process.exit(1);
		}
		
		const markdown = fs.readFileSync(fullPath, 'utf-8');
		console.log(`✓ Read markdown file: ${markdownFile}`);
		
		// Parse flashcards
		const cards = parseMarkdownFlashcards(markdown);
		console.log(`✓ Parsed ${cards.length} flashcards`);
		
		// Generate deck
		const deck = generateDeck(deckId, title, 'Learn ' + title, category, cards, tagsArg);
		
		// Write JSON file
		const outputPath = path.resolve(__dirname, '../static/flashcards', `${deckId}.json`);
		const outputDir = path.dirname(outputPath);
		
		if (!fs.existsSync(outputDir)) {
			fs.mkdirSync(outputDir, { recursive: true });
		}
		
		fs.writeFileSync(outputPath, JSON.stringify(deck, null, 2));
		console.log(`✓ Created deck file: ${outputPath}`);
		
		// Update manifest
		const manifestPath = path.resolve(__dirname, '../static/flashcards/manifest.json');
		let manifest = { decks: [] };
		
		if (fs.existsSync(manifestPath)) {
			manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
		}
		
		// Check if deck already exists
		const existingIndex = manifest.decks.findIndex(d => d.id === deckId);
		if (existingIndex >= 0) {
			manifest.decks[existingIndex] = { id: deckId, title, category };
			console.log(`✓ Updated existing deck in manifest`);
		} else {
			manifest.decks.push({ id: deckId, title, category });
			console.log(`✓ Added deck to manifest`);
		}
		
		fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
		
		console.log(`\n✨ Success! Your flashcard deck is ready.`);
		console.log(`Access it at: /portfolio-blog/flashcards/${deckId}`);
		
	} catch (error) {
		console.error('Error:', error.message);
		process.exit(1);
	}
}

main();
