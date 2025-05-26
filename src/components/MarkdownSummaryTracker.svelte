<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { summaryState, type MarkdownSection, type SummaryState } from '$lib/stores/markdownSummary';
  import { MarkdownSummaryParser } from '$lib/utils/markdownParser';

  export let markdownContainer: HTMLElement;
  export let rootMargin = '-20% 0px -70% 0px'; // Zona de ativação
  export let threshold = [0, 0.1, 0.5, 1.0];

  let parser = new MarkdownSummaryParser();
  let sections: MarkdownSection[] = [];
  let observer: IntersectionObserver;
  let scrollThrottleTimer: ReturnType<typeof setTimeout>;
  let lastScrollTime = 0;
  let isInitialized = false;

  // Dados de scroll
  let totalScrollPercentage = 0;
  let readingProgress = 0;

  onMount(() => {
    initializeSummary();
    setupScrollTracking();
    setupIntersectionObserver();
  });

  /**
   * Inicializa o sistema de summary
   */
  function initializeSummary() {
    if (!markdownContainer) return;

    sections = parser.parseFromRenderedHTML(markdownContainer);
    
    summaryState.update((state: SummaryState) => ({
      ...state,
      sections,
      isReading: true
    }));

    isInitialized = true;
  }

  /**
   * Configura o rastreamento de scroll otimizado
   */
  function setupScrollTracking() {
    const throttledHandler = () => {
      const now = performance.now();
      const minInterval = 100; // 100ms entre atualizações

      if (scrollThrottleTimer) {
        clearTimeout(scrollThrottleTimer);
      }

      if (now - lastScrollTime > minInterval) {
        updateScrollProgress();
        lastScrollTime = now;
      } else {
        scrollThrottleTimer = setTimeout(() => {
          updateScrollProgress();
          lastScrollTime = performance.now();
        }, minInterval);
      }
    };

    window.addEventListener('scroll', throttledHandler, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', throttledHandler);
      if (scrollThrottleTimer) {
        clearTimeout(scrollThrottleTimer);
      }
    };
  }

  /**
   * Calcula progresso de leitura e seção ativa via scroll
   */
  function updateScrollProgress() {
    if (!markdownContainer) return;

    const containerRect = markdownContainer.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const containerHeight = markdownContainer.offsetHeight;

    // Calcula progresso total de leitura
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const containerTop = markdownContainer.offsetTop;
    const maxScroll = containerHeight - viewportHeight;
    
    totalScrollPercentage = Math.max(0, Math.min(1, 
      (scrollTop - containerTop) / maxScroll
    ));

    // Calcula progresso de leitura (mais refinado)
    readingProgress = calculateReadingProgress();

    summaryState.update((state: SummaryState) => ({
      ...state,
      scrollProgress: readingProgress
    }));
  }

  /**
   * Calcula progresso de leitura baseado em posição das seções
   */
  function calculateReadingProgress(): number {
    if (sections.length === 0) return 0;

    const flatSections = parser.getFlatSectionList();
    const viewportCenter = window.innerHeight / 2;
    
    let currentIndex = 0;
    let closestDistance = Infinity;

    flatSections.forEach((section: MarkdownSection, index: number) => {
      if (!section.element) return;

      const rect = section.element.getBoundingClientRect();
      const sectionCenter = rect.top + (rect.height / 2);
      const distance = Math.abs(sectionCenter - viewportCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        currentIndex = index;
      }
    });

    return currentIndex / Math.max(1, flatSections.length - 1);
  }

  /**
   * Configura IntersectionObserver para detecção precisa
   */
  function setupIntersectionObserver() {
    if (!isInitialized) return;

    const flatSections = parser.getFlatSectionList();
    
    observer = new IntersectionObserver(
      (entries) => {
        // Encontra a seção mais visível
        let mostVisibleSection: MarkdownSection | null = null;
        let maxVisibilityRatio = 0;

        entries.forEach(entry => {
          const sectionId = entry.target.id;
          const section = flatSections.find((s: MarkdownSection) => s.id === sectionId);
          
          if (section && entry.isIntersecting && entry.intersectionRatio > maxVisibilityRatio) {
            maxVisibilityRatio = entry.intersectionRatio;
            mostVisibleSection = section;
          }
        });

        // Atualiza seção ativa
        if (mostVisibleSection) {
          summaryState.update((state: SummaryState) => ({
            ...state,
            currentSection: mostVisibleSection!.id
          }));
        }
      },
      {
        root: null,
        rootMargin,
        threshold
      }
    );

    // Observa todas as seções
    flatSections.forEach((section: MarkdownSection) => {
      if (section.element) {
        observer.observe(section.element);
      }
    });
  }

  onDestroy(() => {
    if (observer) {
      observer.disconnect();
    }
    if (scrollThrottleTimer) {
      clearTimeout(scrollThrottleTimer);
    }
  });
</script>
