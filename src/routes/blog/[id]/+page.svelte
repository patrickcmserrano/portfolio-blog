<script lang="ts">
  import { marked } from 'marked';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { base } from '$app/paths';

  let content = '';
  let loading = true;
  let postId = '';

  function sanitizeHtml(html: string): string {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.textContent || '';
  }

  $: {
    const unsubscribe = page.subscribe((p) => {
      postId = p.params.id;
    });
    unsubscribe();
  }

  onMount(async () => {
    try {
      const response = await fetch(`${base}/posts/${postId}.md`);
      const rawContent = await response.text();
      content = sanitizeHtml(await marked(rawContent));
      loading = false;
    } catch (error) {
      console.error('Erro ao carregar o conteúdo:', error);
      loading = false;
    }
  });
</script>

<div class="container mx-auto px-4 space-y-16">
  <!-- Post Content -->
  <section class="max-w-4xl mx-auto">
    {#if loading}
      <div class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    {:else}
      <article class="prose prose-lg dark:prose-invert max-w-none">
        {@html content}
      </article>
    {/if}
  </section>
</div>
