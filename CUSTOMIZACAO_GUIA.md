# Guia de Customização - Sistema de Navegação

## Personalizando Cores

### CSS Custom Properties
```css
:root {
  /* Cores do índice */
  --summary-bg: rgb(255 255 255);
  --summary-border: rgb(229 231 235);
  --summary-text: rgb(75 85 99);
  
  /* Seção ativa */
  --active-bg: rgb(59 130 246);
  --active-text: white;
  
  /* Progresso */
  --progress-bg: rgb(229 231 235);
  --progress-fill: rgb(59 130 246);
}

.dark {
  --summary-bg: rgb(31 41 55);
  --summary-border: rgb(55 65 81);
  --summary-text: rgb(156 163 175);
  --progress-bg: rgb(55 65 81);
}
```

### Sobrescrevendo Estilos
```css
/* Em seu arquivo CSS global */
.markdown-summary {
  background: var(--summary-bg) !important;
  border: 2px solid var(--summary-border) !important;
}

.section-link.active {
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%) !important;
}
```

## Configurações Avançadas

### IntersectionObserver Customizado
```svelte
<MarkdownSummaryTracker 
  {markdownContainer}
  rootMargin="-10% 0px -90% 0px"  <!-- Zona de ativação -->
  threshold={[0, 0.25, 0.5, 0.75, 1.0]}  <!-- Pontos de detecção -->
/>
```

### Profundidade e Comportamento
```svelte
<MarkdownSummary 
  showProgress={true}      <!-- Barra de progresso -->
  maxDepth={6}            <!-- Mostrar até h6 -->
/>
```

## Layouts Alternativos

### Layout Horizontal (Progresso no Topo)
```svelte
<div class="horizontal-layout">
  <header class="progress-header">
    <MarkdownSummary showProgress={true} maxDepth={2} />
  </header>
  
  <main bind:this={container}>
    {@html content}
  </main>
  
  <MarkdownSummaryTracker {markdownContainer} />
</div>

<style>
  .horizontal-layout {
    display: flex;
    flex-direction: column;
  }
  
  .progress-header {
    position: sticky;
    top: 0;
    background: white;
    border-bottom: 1px solid #e5e7eb;
    padding: 1rem;
    z-index: 100;
  }
</style>
```

### Layout com Modal/Popup
```svelte
<script>
  let showIndex = false;
</script>

<!-- Botão para abrir -->
<button class="index-trigger" on:click={() => showIndex = true}>
  📑 Índice
</button>

<!-- Modal -->
{#if showIndex}
  <div class="modal-overlay" on:click={() => showIndex = false}>
    <div class="modal-content" on:click|stopPropagation>
      <MarkdownSummary maxDepth={4} />
      <button class="close-btn" on:click={() => showIndex = false}>×</button>
    </div>
  </div>
{/if}
```

## Integrações Especiais

### Com Busca/Filtro
```svelte
<script>
  import { summaryState } from '$lib/stores/markdownSummary';
  
  let searchTerm = '';
  $: filteredSections = $summaryState.sections.filter(section => 
    section.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
</script>

<div class="search-container">
  <input 
    bind:value={searchTerm} 
    placeholder="Buscar seções..."
    class="search-input"
  />
  
  <!-- Exibir apenas seções filtradas -->
  <nav class="filtered-nav">
    {#each filteredSections as section}
      <button on:click={() => scrollToSection(section)}>
        {section.title}
      </button>
    {/each}
  </nav>
</div>
```

### Com Estimativa de Tempo
```svelte
<script>
  // Calcular tempo estimado baseado em WPM (palavras por minuto)
  function estimateReadTime(content: string, wpm = 200) {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wpm);
    return minutes;
  }
  
  $: readTime = estimateReadTime(textContent);
</script>

<div class="reading-info">
  <span>Tempo estimado: {readTime} min</span>
  <span>Progresso: {Math.round($summaryState.scrollProgress * 100)}%</span>
</div>
```

## Acessibilidade

### ARIA Labels e Navegação por Teclado
```svelte
<nav class="summary-nav" role="navigation" aria-label="Índice do documento">
  {#each sections as section}
    <button 
      class="section-link"
      aria-current={section.id === activeSection ? 'true' : 'false'}
      tabindex="0"
      on:click={() => scrollToSection(section)}
      on:keydown={(e) => e.key === 'Enter' && scrollToSection(section)}
    >
      {section.title}
    </button>
  {/each}
</nav>
```

### Indicadores Visuais Melhorados
```css
.section-link:focus {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

.section-link[aria-current="true"] {
  position: relative;
}

.section-link[aria-current="true"]::before {
  content: '';
  position: absolute;
  left: -8px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 70%;
  background: #2563eb;
  border-radius: 2px;
}
```

## Performance Tips

### Lazy Loading para Documentos Grandes
```svelte
<script>
  import { onMount } from 'svelte';
  
  let shouldLoadNavigation = false;
  
  onMount(() => {
    // Só carrega navegação após 1s ou quando usuário rola
    const timer = setTimeout(() => shouldLoadNavigation = true, 1000);
    
    const handleScroll = () => {
      shouldLoadNavigation = true;
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
    
    window.addEventListener('scroll', handleScroll, { once: true });
  });
</script>

{#if shouldLoadNavigation && markdownContainer}
  <MarkdownSummary />
  <MarkdownSummaryTracker {markdownContainer} />
{/if}
```

### Debounce para Atualizações
```typescript
function debounce(func: Function, wait: number) {
  let timeout: number;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Uso no scroll
const debouncedUpdate = debounce(updateScrollProgress, 150);
```

Essas customizações permitem adaptar o sistema para diferentes necessidades e estilos de design!
