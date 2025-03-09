<script lang="ts">
  import { marked } from 'marked';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import DOMPurify from 'dompurify';

  let content = '';
  let loading = true;
  let error = '';
  let postId = '';

  // Função para sanitizar o HTML de forma segura
  function sanitizeHtml(html: string): string {
    return DOMPurify.sanitize(html);
  }

  // Obtém o ID do post a partir dos parâmetros da página
  $: {
    const unsubscribe = page.subscribe((p) => {
      postId = p.params.id;
    });
    unsubscribe();
  }

  // Carrega o conteúdo do post ao montar o componente
  onMount(async () => {
    try {
      const response = await fetch(`${base}/posts/${postId}.md`);
      if (!response.ok) {
        throw new Error('Post não encontrado');
      }
      const rawContent = await response.text();
      content = sanitizeHtml(await marked(rawContent));
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  });
</script>

<div class="container mx-auto px-4 pt-20 space-y-16">
  <!-- Conteúdo do Post -->
  <section class="max-w-4xl mx-auto">
    {#if loading}
      <div class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    {:else if error}
      <div class="card p-6 shadow-lg bg-error-100 text-center">
        <h2 class="text-2xl font-bold text-error-500 mb-2">Erro ao carregar o post</h2>
        <p class="text-error-700">{error}</p>
      </div>
    {:else}
      <div class="card p-6 shadow-lg bg-surface-50 dark:bg-surface-800">
        <article class="prose prose-lg text-gray-800 dark:text-gray-200 max-w-none">
          {@html content}
        </article>
      </div>
    {/if}
  </section>
</div>

<style>
  /* Ajustes personalizados para melhorar a legibilidade */
  .prose {
    line-height: 1.75;
  }
  .prose h1,
  .prose h2,
  .prose h3 {
    margin-bottom: 1rem;
  }
  .prose p {
    margin-bottom: 1.25rem;
  }
  .prose strong {
    color: #ff5722; /* Cor de destaque para o tema claro */
  }

  .dark .prose strong {
    color: #ff9800; /* Cor de destaque para o tema escuro */
  }
</style>