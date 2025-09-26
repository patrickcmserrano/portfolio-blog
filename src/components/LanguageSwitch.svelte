<script lang="ts">
	import { currentLocale, changeLanguage } from '../lib/i18n';

	$: currentLang = $currentLocale || 'pt';

	function handleLanguageChange(newLocale: string) {
		changeLanguage(newLocale);
	}
</script>

<div class="language-switch">
	<button
		class="btn btn-sm variant-ghost-surface {currentLang === 'pt' ? 'variant-filled-primary' : ''}"
		on:click={() => handleLanguageChange('pt')}
		aria-label="Português"
		title="Português"
	>
		🇧🇷 PT
	</button>
	<button
		class="btn btn-sm variant-ghost-surface {currentLang === 'en' ? 'variant-filled-primary' : ''}"
		on:click={() => handleLanguageChange('en')}
		aria-label="English"
		title="English"
	>
		🇺🇸 EN
	</button>
</div>

<style>
	.language-switch {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}
</style>