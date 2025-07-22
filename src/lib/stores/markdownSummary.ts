import { writable, derived } from 'svelte/store';

// Tipos para o sistema de summary
export interface MarkdownSection {
  id: string;
  title: string;
  level: number; // 1-6 (h1-h6)
  element?: HTMLElement;
  children: MarkdownSection[];
  parent?: MarkdownSection;
}

export interface SummaryState {
  sections: MarkdownSection[];
  currentSection: string | null;
  scrollProgress: number;
  isReading: boolean;
}

// Stores principais
export const summaryState = writable<SummaryState>({
  sections: [],
  currentSection: null,
  scrollProgress: 0,
  isReading: false
});

export const currentSection = derived(
  summaryState,
  ($state: SummaryState) => $state.currentSection
);
