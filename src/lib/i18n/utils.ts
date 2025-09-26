import { get } from 'svelte/store';
import { locale, _ } from 'svelte-i18n';

export function getCurrentLocale(): string {
	return get(locale) || 'pt';
}

export function t(key: string): string {
	return get(_)(key);
}

export function isRTL(): boolean {
	const currentLocale = getCurrentLocale();
	const rtlLocales = ['ar', 'he', 'fa', 'ur'];
	return rtlLocales.includes(currentLocale);
}

export const SUPPORTED_LOCALES = [
	{ code: 'pt', name: 'Português', flag: '🇧🇷' },
	{ code: 'en', name: 'English', flag: '🇺🇸' }
];