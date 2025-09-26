<script lang="ts">
  import { changeLanguage, currentLocale } from '$lib/i18n';
  import { _ } from 'svelte-i18n';
  
  export let availableLanguages: string[] = [];
  
  const languageNames: Record<string, string> = {
    pt: 'Português',
    en: 'English'
  };
  
  const languageFlags: Record<string, string> = {
    pt: '🇧🇷',
    en: '🇺🇸'
  };
  
  $: currentLanguage = $currentLocale || 'pt';
  $: availableLanguageText = $_('general.availableLanguages') || 'Disponível em:';
</script>

{#if availableLanguages && availableLanguages.length > 1}
  <div class="language-selector">
    <span class="text-sm text-surface-600 dark:text-surface-400 mr-2">
      {availableLanguageText}
    </span>
    <div class="flex gap-2">
      {#each availableLanguages as language}
        <button
          class="language-button"
          class:active={language === currentLanguage}
          on:click={() => changeLanguage(language)}
          title={languageNames[language]}
        >
          <span class="flag">{languageFlags[language]}</span>
          <span class="name">{languageNames[language]}</span>
        </button>
      {/each}
    </div>
  </div>
{/if}

<style>
  .language-selector {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
    padding: 0.75rem;
    background-color: rgb(245 245 245);
    border-radius: 0.5rem;
    border: 1px solid rgb(209 213 219);
  }
  
  :global(.dark) .language-selector {
    background-color: rgb(31 41 55);
    border-color: rgb(75 85 99);
  }
  
  .language-button {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
    border-radius: 0.375rem;
    border: 1px solid rgb(209 213 219);
    background-color: rgb(249 250 251);
    color: rgb(55 65 81);
    transition: all 0.2s;
    cursor: pointer;
  }
  
  :global(.dark) .language-button {
    border-color: rgb(75 85 99);
    background-color: rgb(55 65 81);
    color: rgb(209 213 219);
  }
  
  .language-button:hover {
    background-color: rgb(229 231 235);
  }
  
  :global(.dark) .language-button:hover {
    background-color: rgb(75 85 99);
  }
  
  .language-button.active {
    background-color: rgb(59 130 246);
    border-color: rgb(59 130 246);
    color: white;
  }
  
  .language-button.active:hover {
    background-color: rgb(37 99 235);
  }
  
  .flag {
    font-size: 1rem;
  }
  
  .name {
    font-weight: 500;
  }
  
  @media (max-width: 640px) {
    .language-selector {
      font-size: 0.75rem;
    }
    
    .language-button {
      padding: 0.25rem 0.5rem;
    }
    
    .name {
      display: none;
    }
  }
</style>