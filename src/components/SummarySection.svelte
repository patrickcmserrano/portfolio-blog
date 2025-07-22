<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { MarkdownSection } from '$lib/stores/markdownSummary';

  export let section: MarkdownSection;
  export let activeSection: string | null;
  export let maxDepth: number;
  export let depth: number;

  const dispatch = createEventDispatcher<{ navigate: MarkdownSection }>();

  $: isActive = section.id === activeSection;
  $: hasActiveChild = section.children.some((child: MarkdownSection) => 
    child.id === activeSection || hasActiveDescendant(child)
  );
  $: shouldShowChildren = depth < maxDepth && section.children.length > 0;

  function hasActiveDescendant(sect: MarkdownSection): boolean {
    if (sect.id === activeSection) return true;
    return sect.children.some(hasActiveDescendant);
  }

  function handleClick() {
    dispatch('navigate', section);
  }
</script>

<div class="summary-section" class:active={isActive} class:has-active-child={hasActiveChild}>
  <button 
    class="section-link level-{section.level}" 
    class:active={isActive}
    on:click={handleClick}
  >
    <span class="section-title">{section.title}</span>
    {#if isActive}
      <span class="active-indicator">→</span>
    {/if}
  </button>

  {#if shouldShowChildren && section.children.length > 0}
    <div class="section-children" class:expanded={hasActiveChild}>
      {#each section.children as childSection}
        <svelte:self 
          section={childSection}
          {activeSection}
          {maxDepth}
          depth={depth + 1}
          on:navigate
        />
      {/each}
    </div>
  {/if}
</div>

<style>
  .section-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.25rem 0.5rem;
    text-align: left;
    background: none;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.875rem;
    color: rgb(75 85 99);
  }

  :global(.dark) .section-link {
    color: rgb(209 213 219); /* Cor mais clara para melhor contraste */
  }

  .section-link:hover {
    background: rgb(243 244 246);
    color: rgb(17 24 39);
  }

  :global(.dark) .section-link:hover {
    background: rgba(59, 130, 246, 0.15); /* Azul leve para destacar hover */
    color: rgb(243 244 246); /* Texto mais claro no hover */
  }

  .section-link.active {
    background: rgb(59 130 246);
    color: white;
    font-weight: 600;
  }
  
  :global(.dark) .section-link.active {
    background: rgb(96 165 250); /* Azul mais claro para melhor contraste */
    color: rgb(15 23 42); /* Texto escuro sobre fundo azul claro */
    font-weight: 600;
  }

  .level-1 { 
    font-size: 1rem; 
    font-weight: 600; 
    padding-left: 0.5rem;
  }
  
  .level-2 { 
    font-size: 0.9rem; 
    padding-left: 1rem; 
  }
  
  .level-3 { 
    font-size: 0.85rem; 
    padding-left: 1.5rem; 
  }
  
  .level-4 { 
    font-size: 0.8rem; 
    padding-left: 2rem; 
  }
  
  .level-5 { 
    font-size: 0.75rem; 
    padding-left: 2.5rem; 
  }
  
  .level-6 { 
    font-size: 0.7rem; 
    padding-left: 3rem; 
  }

  .section-children {
    margin-left: 0.5rem;
    border-left: 2px solid rgb(229 231 235);
    padding-left: 0.5rem;
    margin-top: 0.25rem;
  }

  :global(.dark) .section-children {
    border-left-color: rgb(55 65 81);
  }

  .active-indicator {
    font-size: 0.8rem;
    opacity: 0.8;
  }

  .section-title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
