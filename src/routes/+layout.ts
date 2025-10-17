import { browser } from '$app/environment';
import { waitLocale } from 'svelte-i18n';

export const prerender = true;
export const ssr = true;

export async function load() {
	if (browser) {
		// Aguarda o carregamento das traduções antes de renderizar
		// Do not block client rendering waiting for translations. If running on server,
		// wait for locale so SSR includes translations; on client, let I18nLoader handle UI.
	} else {
		await waitLocale();
	}
	return {};
}
