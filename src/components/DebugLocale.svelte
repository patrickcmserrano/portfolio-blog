<script lang="ts">
	import { locale, _, isLoading } from 'svelte-i18n';
	import { browser } from '$app/environment';
	
	$: currentLocale = $locale;
	$: loading = $isLoading;
	$: testTranslation = $_('nav.about') || 'fallback';
	
	$: if (browser) {
		console.log('DebugLocale - Current locale:', currentLocale);
		console.log('DebugLocale - Is loading:', loading);
		console.log('DebugLocale - Test translation (nav.about):', testTranslation);
		console.log('DebugLocale - LocalStorage locale:', localStorage.getItem('locale'));
	}
</script>

{#if browser}
<div class="fixed bottom-4 right-4 bg-surface-100 dark:bg-surface-800 p-4 rounded shadow-lg text-sm z-50">
	<h4 class="font-bold mb-2">Debug Locale</h4>
	<div>Locale: {currentLocale}</div>
	<div>Loading: {loading}</div>
	<div>Test: {testTranslation}</div>
	<div>Storage: {browser ? (typeof window !== 'undefined' ? localStorage.getItem('locale') : 'N/A') : 'N/A'}</div>
</div>
{/if}