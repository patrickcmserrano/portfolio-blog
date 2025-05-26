<script lang="ts">
  import { summaryState, currentSection } from '$lib/stores/markdownSummary';
  import type { MarkdownSection, SummaryState } from '$lib/stores/markdownSummary';
  import SummarySection from './SummarySection.svelte';

  export let showProgress = true;
  export const collapsible = true; // Para referência externa apenas
  export let maxDepth = 3;

  $: sections = $summaryState.sections;
  $: activeSection = $currentSection;
  $: scrollProgress = $summaryState.scrollProgress;

  /**
   * Navega suavemente para uma seção
   */
  function scrollToSection(section: MarkdownSection) {
    if (!section.element) return;

    section.element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    // Atualiza estado imediatamente para feedback visual
    summaryState.update((state: SummaryState) => ({
      ...state,
      currentSection: section.id
    }));
  }

  /**
   * Verifica se uma seção ou seus filhos estão ativos
   */
  function isActiveOrHasActiveChild(section: MarkdownSection): boolean {
    if (section.id === activeSection) return true;
    
    return section.children.some((child: MarkdownSection) => isActiveOrHasActiveChild(child));
  }

  /**
   * Calcula o progresso dentro de uma seção específica
   */
  function getSectionProgress(section: MarkdownSection): number {
    // Implementação simplificada - pode ser mais sofisticada
    return section.id === activeSection ? 1 : 0;
  }
</script>

<aside class="markdown-summary" class:reading={$summaryState.isReading}>
  <header class="summary-header">
    <h3 class="summary-title">Índice</h3>
    {#if showProgress}
      <div class="reading-progress">
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            style="width: {scrollProgress * 100}%"
          ></div>
        </div>
        <span class="progress-text">
          {Math.round(scrollProgress * 100)}% lido
        </span>
      </div>
    {/if}
  </header>

  <nav class="summary-nav">
    {#each sections as section}
      <SummarySection 
        {section} 
        {activeSection}
        {maxDepth}
        depth={1}
        on:navigate={(e) => scrollToSection(e.detail)}
      />
    {/each}
  </nav>
</aside>

<style>
  .markdown-summary {
    position: sticky;
    top: 2rem;
    max-height: calc(100vh - 4rem);
    overflow-y: auto;
    padding: 1rem;
    background: rgb(255 255 255);
    border-radius: 0.5rem;
    border: 1px solid rgb(229 231 235);
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  }

  :global(.dark) .markdown-summary {
    background: rgb(31 41 55);
    border-color: rgb(55 65 81);
  }

  .summary-header {
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgb(229 231 235);
  }

  :global(.dark) .summary-header {
    border-bottom-color: rgb(55 65 81);
  }

  .summary-title {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
    color: rgb(17 24 39);
  }

  :global(.dark) .summary-title {
    color: rgb(229 231 235);
  }

  .reading-progress {
    margin-top: 0.5rem;
  }

  .progress-bar {
    width: 100%;
    height: 4px;
    background: rgb(229 231 235);
    border-radius: 2px;
    overflow: hidden;
  }

  :global(.dark) .progress-bar {
    background: rgb(55 65 81);
  }

  .progress-fill {
    height: 100%;
    background: rgb(59 130 246);
    transition: width 0.3s ease;
  }
  
  :global(.dark) .progress-fill {
    background: rgb(96 165 250); /* Azul mais claro para melhor visibilidade */
  }

  .progress-text {
    font-size: 0.75rem;
    color: rgb(107 114 128);
    margin-top: 0.25rem;
    display: block;
  }

  :global(.dark) .progress-text {
    color: rgb(209 213 219); /* Cor mais clara para melhor contraste */
  }

  .summary-nav {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }

  /* Scrollbar personalizada */
  .markdown-summary::-webkit-scrollbar {
    width: 4px;
  }

  .markdown-summary::-webkit-scrollbar-track {
    background: transparent;
  }

  .markdown-summary::-webkit-scrollbar-thumb {
    background: rgb(209 213 219);
    border-radius: 2px;
  }

  :global(.dark) .markdown-summary::-webkit-scrollbar-thumb {
    background: rgb(75 85 99);
  }

  .markdown-summary::-webkit-scrollbar-thumb:hover {
    background: rgb(156 163 175);
  }

  :global(.dark) .markdown-summary::-webkit-scrollbar-thumb:hover {
    background: rgb(107 114 128);
  }
</style>
