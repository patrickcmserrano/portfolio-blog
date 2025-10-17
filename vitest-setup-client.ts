import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import { init } from 'svelte-i18n';

// required for svelte5 + jsdom as jsdom does not support matchMedia
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	enumerable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn()
	}))
});

// add more mocks here if you need them

// Ensure svelte-i18n has an initial locale for tests
init({
	fallbackLocale: 'en',
	initialLocale: 'en',
	// When a message is missing, return empty string so component-level fallbacks apply
	handleMissingMessage: () => ''
});

// Optional: set document language to keep parity with app behavior
try {
    document.documentElement.lang = 'en';
} catch {}
