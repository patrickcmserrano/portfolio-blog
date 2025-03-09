<!-- Página Sobre este Website -->
<script lang="ts">
  import { marked } from 'marked';
  import { onMount } from 'svelte';
  
  let readme = '';
  let loading = true;

  onMount(async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/patrickcmserrano/svelte-portfolio-blog/skeleton/README.md');
      readme = await response.text();
      loading = false;
    } catch (error) {
      console.error('Erro ao carregar README:', error);
      loading = false;
    }
  });
</script>

<div class="container mx-auto px-4 py-8">
  <div class="flex flex-col items-center mb-8">
    <h1 class="text-4xl font-bold mb-4">Sobre este Website</h1>
    <a 
      href="https://github.com/patrickcmserrano/svelte-portfolio-blog" 
      target="_blank" 
      rel="noopener noreferrer"
      class="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors duration-200 shadow-lg"
    >
      <!-- GitHub Icon -->
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
      </svg>
      Ver no GitHub
    </a>
  </div>

  {#if loading}
    <div class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>
  {:else}
    <article class="prose prose-lg dark:prose-invert max-w-none">
      {@html marked(readme)}
    </article>
  {/if}
</div>

<style lang="postcss">
  :global(.prose) {
    @apply max-w-4xl mx-auto;
  }
  
  :global(.prose pre) {
    @apply bg-surface-700 p-4 rounded-lg overflow-x-auto;
  }

  :global(.prose code) {
    @apply bg-surface-700 px-1 py-0.5 rounded;
  }

  :global(.prose h1) {
    @apply text-4xl font-bold mb-8 border-b pb-4;
  }

  :global(.prose h2) {
    @apply text-3xl font-semibold mt-12 mb-6;
  }

  :global(.prose h3) {
    @apply text-2xl font-semibold mt-8 mb-4;
  }

  :global(.prose h4) {
    @apply text-xl font-semibold mt-6 mb-3;
  }

  :global(.prose p) {
    @apply mb-4 leading-relaxed;
  }

  :global(.prose ul) {
    @apply list-disc list-inside mb-4;
  }

  :global(.prose ol) {
    @apply list-decimal list-inside mb-4;
  }

  :global(.prose a) {
    @apply text-primary-500 hover:text-primary-600 transition-colors duration-200;
  }

  :global(.prose blockquote) {
    @apply border-l-4 border-primary-500 pl-4 italic;
  }
</style> 