import { browser } from '$app/environment';
import { waitLocale } from 'svelte-i18n';

export const prerender = true;
export const ssr = true;

export async function load() {
	if (browser) {
		// Aguarda o carregamento das traduções antes de renderizar
		await waitLocale();
	}
	return {};
}
