# Flashcards System Documentation

## Overview

The flashcards system provides an interactive study tool for programming, coding, and software engineering concepts. Users can create decks of flashcards, flip through them, track progress, and study in sequential or random order.

## Structure

### Directory Layout

```
static/flashcards/
├── manifest.json                           # Registry of all decks
├── functional-programming-fundamentals.json # Sample FP deck
└── typescript-essentials.json              # Sample TS deck

src/
├── lib/
│   └── flashcards/
│       ├── types.ts                        # TypeScript interfaces
│       └── loader.ts                       # Data loading utilities
├── components/
│   ├── FlashcardCard.svelte               # Single card component
│   └── FlashcardDeck.svelte               # Deck management & UI
└── routes/
    └── flashcards/
        ├── +page.svelte                    # Index/list page
        └── [deckId]/
            ├── +page.svelte                # Individual deck page
            └── +page.ts                    # Data loader
```

## Data Format

### Flashcard Deck JSON Schema

Each deck is a JSON file with the following structure:

```json
{
  "id": "unique-identifier",
  "title": "Deck Title",
  "description": "Brief description of what's in this deck",
  "category": "Programming Paradigms",
  "language": "en",
  "tags": ["tag1", "tag2", "tag3"],
  "cardCount": 20,
  "cards": [
    {
      "id": "card-unique-id",
      "front": "Question or prompt",
      "back": "Answer or explanation",
      "tags": ["optional", "tags"],
      "difficulty": "easy|medium|hard"
    }
  ]
}
```

### Field Descriptions

- **id**: Unique identifier for the deck (used in URL and storage)
- **title**: Display title shown on index and deck pages
- **description**: Short summary of deck contents
- **category**: Category for filtering (e.g., "Programming Paradigms", "Programming Languages")
- **language**: Language code ("en" for English, "pt" for Portuguese)
- **tags**: Array of searchable tags
- **cardCount**: Total number of cards (for display)
- **cards**: Array of flashcard objects
  - **id**: Unique card ID (for progress tracking)
  - **front**: Question, prompt, or what's shown first
  - **back**: Answer, explanation, or what's shown when flipped
  - **tags**: Optional array of tags for this card
  - **difficulty**: Optional difficulty level (easy/medium/hard)

## How to Add New Flashcard Decks

### Step 1: Create a JSON File

Create a new file in `static/flashcards/` named `{deck-id}.json`:

```bash
# Example: Create a React deck
static/flashcards/react-hooks.json
```

### Step 2: Populate with Flashcards

Fill the JSON file following the schema above:

```json
{
  "id": "react-hooks",
  "title": "React Hooks",
  "description": "Learn React hooks for functional components",
  "category": "Frontend Frameworks",
  "language": "en",
  "tags": ["React", "Hooks", "Frontend", "JavaScript"],
  "cardCount": 10,
  "cards": [
    {
      "id": "react-hooks-01",
      "front": "What is useState?",
      "back": "Hook for managing state in functional components. Returns [state, setState]. Ex: const [count, setCount] = useState(0)",
      "tags": ["useState", "State Management"],
      "difficulty": "easy"
    },
    {
      "id": "react-hooks-02",
      "front": "Explain useEffect.",
      "back": "Hook for side effects in functional components. Runs after render. Dependencies array controls when it runs. Ex: useEffect(() => { ... }, [dependency])",
      "tags": ["useEffect", "Side Effects"],
      "difficulty": "medium"
    }
    // ... more cards
  ]
}
```

### Step 3: Update manifest.json

Add your deck to `static/flashcards/manifest.json`:

```json
{
  "decks": [
    {
      "id": "functional-programming-fundamentals",
      "title": "Functional Programming Fundamentals",
      "category": "Programming Paradigms"
    },
    {
      "id": "react-hooks",
      "title": "React Hooks",
      "category": "Frontend Frameworks"
    }
  ]
}
```

### Step 4: Access Your Deck

Your deck will be available at:
- Index: `/portfolio-blog/flashcards/`
- Specific deck: `/portfolio-blog/flashcards/react-hooks`

## Usage Guide

### Features

1. **Flip Animation**: Click card or press SPACE to flip between front and back
2. **Navigation**: Use Previous/Next buttons or arrow keys to navigate
3. **Progress Tracking**: Mark cards as "Correct" or "Incorrect" to track accuracy
4. **Study Modes**:
   - Sequential: Study cards in order
   - Random: Shuffle cards for variety
5. **Progress Persistence**: Progress saved to browser localStorage
6. **Filtering**: Filter by category or search by title/tags
7. **Difficulty Levels**: Color-coded difficulty indicators (easy/medium/hard)

### Keyboard Shortcuts

- **SPACE**: Flip card
- **ENTER**: Flip card (alternative)

## Component API

### FlashcardCard

Displays a single flashcard with flip animation.

```svelte
<FlashcardCard
  card={flashcard}
  bind:isFlipped={false}
  index={0}
  total={20}
/>
```

### FlashcardDeck

Manages deck navigation and learning interface.

```svelte
<FlashcardDeck deck={deckData} />
```

## Utilities

### loadFlashcardDeck(deckId)

Load a single deck by ID.

```typescript
const deck = await loadFlashcardDeck('functional-programming-fundamentals');
```

### loadFlashcardDecks()

Load all available decks from manifest.

```typescript
const allDecks = await loadFlashcardDecks();
```

### Progress Management

```typescript
// Load progress
const progress = loadProgress(deckId);

// Save progress
saveProgress(deckId, progressObject);

// Clear progress
clearProgress(deckId);
```

## Best Practices

1. **Card Count**: Keep decks between 10-50 cards for optimal learning
2. **Question Quality**: Front side should be specific and testable
3. **Answer Length**: Back side should be concise but complete (typically 1-3 sentences)
4. **Tags**: Use consistent tag naming across decks
5. **Difficulty**: Distribute cards across difficulty levels
6. **Examples**: Include code examples for programming concepts
7. **Language**: Choose language appropriately for content

## Creating AI-Generated Flashcards

You can use AI tools like ChatGPT to generate flashcard content. Example prompt:

```
Create 20 flashcards for [TOPIC] in JSON format:
- Front: question or concept
- Back: concise explanation with example
- Difficulty: easy/medium/hard

Format each as:
{
  "id": "topic-01",
  "front": "Question?",
  "back": "Answer with example",
  "difficulty": "easy"
}
```

## Future Enhancements

Potential features for future versions:
- Spaced repetition algorithm
- Multiple languages support
- Export/import functionality
- Statistics dashboard
- Sharing decks
- Collaborative deck creation
- Multimedia cards (images, audio)
- Custom study sessions

## Troubleshooting

### Deck not appearing
- Check manifest.json includes the deck ID
- Verify JSON file is valid (use JSONLint)
- Ensure file is in `static/flashcards/`

### Progress not saving
- Check browser localStorage is enabled
- Clear browser cache and reload

### Card not flipping
- Ensure `isFlipped` binding is correct
- Check console for JavaScript errors

## Files Reference

| File | Purpose |
|------|---------|
| `src/lib/flashcards/types.ts` | TypeScript interfaces |
| `src/lib/flashcards/loader.ts` | API for loading decks & managing progress |
| `src/components/FlashcardCard.svelte` | Individual card component |
| `src/components/FlashcardDeck.svelte` | Deck player/manager |
| `src/routes/flashcards/+page.svelte` | Index page listing all decks |
| `src/routes/flashcards/[deckId]/+page.svelte` | Individual deck view |
| `static/flashcards/manifest.json` | Registry of all decks |

---

For more help, check existing deck files for examples.
