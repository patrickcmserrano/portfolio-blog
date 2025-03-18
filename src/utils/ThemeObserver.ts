import { onMount } from 'svelte';

export function observeThemeChanges() {
	onMount(() => {
		const html = document.documentElement;
		console.log('Initial data-theme:', html.getAttribute('data-theme'));
		const observer = new MutationObserver(() => {
			const theme = html.getAttribute('data-theme');
			console.log('Updated data-theme:', theme);
		});
		observer.observe(html, { attributes: true, attributeFilter: ['data-theme'] });
		return () => observer.disconnect();
	});
}
