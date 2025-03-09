<script lang="ts">
  import { marked } from 'marked';
  import { onMount } from 'svelte';

  let content = '';
  let loading = true;

  onMount(async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/patrickcmserrano/svelte-portfolio-blog/static/posts/engenharia-de-requisitos.md');
      content = await response.text();
      loading = false;
    } catch (error) {
      console.error('Erro ao carregar o conteúdo:', error);
      loading = false;
    }
  });
</script>

<div class="container mx-auto px-4 space-y-16">
  <!-- Blog Hero Section -->
  <section class="text-center py-20">
    <h1 class="h1 mb-6">
      Blog
    </h1>
    <p class="text-xl max-w-2xl mx-auto">
      Compartilhando conhecimentos e experiências sobre desenvolvimento Clojure, arquitetura de software e boas práticas.
    </p>
  </section>

  <!-- Blog Content -->
  <section class="max-w-4xl mx-auto">
    {#if loading}
      <div class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    {:else}
      <article class="prose prose-lg dark:prose-invert max-w-none">
        {@html marked(content)}
      </article>
    {/if}
  </section>
</div>