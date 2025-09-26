import { browser } from '$app/environment';
import { init, register, locale, waitLocale, _ } from 'svelte-i18n';
import { writable } from 'svelte/store';

const defaultLocale = 'pt';
const supportedLocales = ['pt', 'en'];

// Custom locale store for better control
export const currentLocale = writable(defaultLocale);

// Register translation files
register('pt', () => import('./locales/pt.json'));
register('en', () => import('./locales/en.json'));

// Function to get initial locale
function getInitialLocale(): string {
	if (!browser) return defaultLocale;
	
	try {
		const saved = localStorage.getItem('locale');
		return supportedLocales.includes(saved || '') ? saved! : defaultLocale;
	} catch {
		return defaultLocale;
	}
}

// Initialize
const initialLocale = getInitialLocale();

init({
	fallbackLocale: defaultLocale,
	initialLocale,
	warnOnMissingMessages: false
});

// Set locales
locale.set(initialLocale);
currentLocale.set(initialLocale);

// Function to change language
export function changeLanguage(newLocale: string) {
	if (!supportedLocales.includes(newLocale)) return;
	
	console.log('Changing language to:', newLocale);
	locale.set(newLocale);
	currentLocale.set(newLocale);
	
	if (browser) {
		localStorage.setItem('locale', newLocale);
		document.documentElement.lang = newLocale;
		
		waitLocale().then(() => {
			console.log('✅ Language changed to:', newLocale);
		});
	}
}

// Initialize in browser
if (browser) {
	waitLocale().then(() => {
		console.log('✅ Initial translations loaded for:', initialLocale);
		document.documentElement.lang = initialLocale;
	});
}

// Export everything needed
export { locale, _ };