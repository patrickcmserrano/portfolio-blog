import type { MarkdownSection } from '$lib/stores/markdownSummary';

export class MarkdownSummaryParser {
  private sections: MarkdownSection[] = [];
  private sectionCounter = 0;

  /**
   * Extrai headers do HTML renderizado do markdown
   */
  parseFromRenderedHTML(container: HTMLElement): MarkdownSection[] {
    const headers = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    this.sections = [];
    
    const sectionStack: MarkdownSection[] = [];

    headers.forEach((header, index) => {
      const level = parseInt(header.tagName.charAt(1));
      const title = header.textContent?.trim() || `Seção ${index + 1}`;
      
      // Gera ID único se não existir
      let id = header.id;
      if (!id) {
        id = this.generateId(title);
        header.id = id;
      }

      const section: MarkdownSection = {
        id,
        title,
        level,
        element: header as HTMLElement,
        children: [],
        parent: undefined
      };

      // Encontra o pai correto baseado na hierarquia
      while (sectionStack.length > 0 && sectionStack[sectionStack.length - 1].level >= level) {
        sectionStack.pop();
      }

      if (sectionStack.length > 0) {
        const parent = sectionStack[sectionStack.length - 1];
        section.parent = parent;
        parent.children.push(section);
      } else {
        this.sections.push(section);
      }

      sectionStack.push(section);
    });

    return this.sections;
  }

  /**
   * Gera ID único baseado no título
   */
  private generateId(title: string): string {
    const base = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
    
    return `section-${++this.sectionCounter}-${base}`;
  }

  /**
   * Calcula a estrutura hierárquica completa
   */
  getFlatSectionList(): MarkdownSection[] {
    const flatList: MarkdownSection[] = [];
    
    const traverse = (sections: MarkdownSection[]) => {
      sections.forEach(section => {
        flatList.push(section);
        if (section.children.length > 0) {
          traverse(section.children);
        }
      });
    };

    traverse(this.sections);
    return flatList;
  }
}
