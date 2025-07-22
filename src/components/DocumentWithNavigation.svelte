<script lang="ts">
  import MarkdownSummary from './MarkdownSummary.svelte';
  import MarkdownSummaryTracker from './MarkdownSummaryTracker.svelte';
  
  // Exemplo de como usar em qualquer página com conteúdo markdown
  let documentContainer: HTMLElement;
  let showIndex = true;
  
  // Conteúdo pode vir de qualquer fonte: API, arquivo, etc.
  export let markdownContent: string;
</script>

<!-- Layout flexível para qualquer tipo de documento -->
<div class="document-layout">
  <!-- Índice lateral (opcional) à esquerda -->
  {#if showIndex && documentContainer}
    <aside class="document-sidebar">
      <!-- Botão para esconder/mostrar (opcional) -->
      <div class="sidebar-header">
        <button 
          class="toggle-btn"
          on:click={() => showIndex = !showIndex}
          aria-label="Esconder índice"
        >
          ×
        </button>
      </div>

      <!-- Componente de navegação -->
      <MarkdownSummary 
        showProgress={true}
        maxDepth={6}
      />
      
      <!-- Rastreador invisível -->
      <MarkdownSummaryTracker 
        markdownContainer={documentContainer}
        rootMargin="-15% 0px -75% 0px"
        threshold={[0, 0.1, 0.3, 0.7, 1.0]}
      />
    </aside>
  {/if}

  <!-- Conteúdo principal -->
  <main class="document-content">
    <article bind:this={documentContainer} class="markdown-content">
      {@html markdownContent}
    </article>
  </main>
</div>

<!-- Botão flutuante para mobile -->
{#if !showIndex}
  <button 
    class="floating-index-btn"
    on:click={() => showIndex = true}
    aria-label="Mostrar índice"
  >
    📑
  </button>
{/if}

<style>
  .document-layout {
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }

  .document-content {
    min-width: 0;
  }

  .document-sidebar {
    position: sticky;
    top: 1rem;
    height: fit-content;
    max-height: calc(100vh - 6rem); /* Considera header + padding */
    overflow-y: auto;
  }

  .sidebar-header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 0.5rem;
  }

  .toggle-btn {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0.25rem;
    opacity: 0.6;
    transition: opacity 0.2s;
  }

  .toggle-btn:hover {
    opacity: 1;
  }

  .floating-index-btn {
    position: fixed;
    bottom: 2rem;
    left: 2rem; /* Mudado de right para left para ficar consistente */
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: none;
    background: rgb(59 130 246);
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    box-shadow: 0 4px 12px rgb(0 0 0 / 0.2);
    transition: all 0.2s ease;
    z-index: 1000;
  }
  
  :global(.dark) .floating-index-btn {
    background: rgb(96 165 250); /* Azul mais claro no modo escuro */
    color: rgb(15 23 42); /* Texto escuro para contraste */
    box-shadow: 0 4px 12px rgb(0 0 0 / 0.4); /* Sombra mais forte no modo escuro */
  }

  .floating-index-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgb(0 0 0 / 0.3);
  }

  .markdown-content {
    line-height: 1.7;
    max-width: none;
  }

  .markdown-content :global(h1),
  .markdown-content :global(h2),
  .markdown-content :global(h3),
  .markdown-content :global(h4),
  .markdown-content :global(h5),
  .markdown-content :global(h6) {
    scroll-margin-top: 2rem;
  }

  /* Responsivo */
  @media (max-width: 1039px) {
    .document-layout {
      grid-template-columns: 1fr;
      padding: 1.5rem;
    }
    
    .document-sidebar {
      position: fixed;
      top: 0;
      left: 0; /* Mudado de right para left para ficar consistente */
      width: 300px;
      height: 100vh;
      background: white;
      border-right: 1px solid rgb(229 231 235); /* Mudado de border-left para border-right */
      padding: 1rem;
      transform: translateX(-100%); /* Mudado para negativo para deslizar da esquerda */
      transition: transform 0.3s ease;
      z-index: 1000;
      overflow-y: auto;
    }
    
    .document-sidebar:global(.show) {
      transform: translateX(0);
    }

    :global(.dark) .document-sidebar {
      background: rgb(31 41 55);
      border-right-color: rgb(55 65 81); /* Consistente com border-right */
    }
  }

  @media (max-width: 640px) {
    .document-layout {
      padding: 1rem;
    }
    
    .document-sidebar {
      width: 100%;
    }
  }
</style>
