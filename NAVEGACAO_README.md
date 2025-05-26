# Sistema de Navegação e Rastreamento para Posts Markdown

Este sistema implementa uma experiência de leitura avançada para posts markdown, similar ao encontrado em documentações modernas como GitHub, GitBook e outras plataformas profissionais.

## Funcionalidades Implementadas

### 🧭 Navegação Automática
- **Índice dinâmico** gerado automaticamente a partir dos headers (h1-h6)
- **Estrutura hierárquica** respeitando a organização dos headers
- **Navegação suave** com scroll animado ao clicar em seções
- **Indicação visual** da seção ativa atual

### 📊 Progresso de Leitura
- **Barra de progresso** mostrando percentual lido
- **Cálculo inteligente** baseado na posição das seções
- **Atualização em tempo real** durante o scroll

### 👁️ Rastreamento Avançado
- **IntersectionObserver** para detecção precisa de seções visíveis
- **Throttling otimizado** para performance em documentos grandes
- **Dual tracking** combinando scroll e intersection para máxima precisão

### 📱 Design Responsivo
- **Layout adaptativo** para desktop e mobile
- **Sidebar reposicionável** em telas menores
- **Controles touch-friendly** para dispositivos móveis

## Arquitetura do Sistema

### Stores (Estado Global)
```typescript
// src/lib/stores/markdownSummary.ts
- MarkdownSection: Interface para seções
- SummaryState: Estado global do sistema
- summaryState: Store principal
- currentSection: Store derivado para seção ativa
```

### Parser de Markdown
```typescript
// src/lib/utils/markdownParser.ts
- MarkdownSummaryParser: Classe para extrair headers
- parseFromRenderedHTML(): Analisa HTML renderizado
- generateId(): Gera IDs únicos para seções
- getFlatSectionList(): Lista hierárquica achatada
```

### Componentes

#### MarkdownSummaryTracker
- Componente invisível responsável pelo rastreamento
- Configura IntersectionObserver e listeners de scroll
- Calcula progresso de leitura e seção ativa
- Atualiza stores em tempo real

#### MarkdownSummary
- Componente visual do índice/sidebar
- Mostra estrutura hierárquica das seções
- Exibe barra de progresso
- Permite navegação por clique

#### SummarySection
- Componente recursivo para itens do índice
- Suporta estrutura aninhada (h1 > h2 > h3, etc.)
- Indicação visual de seção ativa
- Feedback hover e estados interativos

## Como Usar

### Implementação Básica
```svelte
<script>
  import MarkdownSummary from '$lib/components/MarkdownSummary.svelte';
  import MarkdownSummaryTracker from '$lib/components/MarkdownSummaryTracker.svelte';
  
  let markdownContainer;
</script>

<div class="docs-layout">
  <main class="docs-content">
    <article bind:this={markdownContainer} class="markdown-content">
      {@html content}
    </article>
  </main>

  {#if markdownContainer}
    <aside class="docs-sidebar">
      <MarkdownSummary 
        showProgress={true}
        maxDepth={4}
      />
      
      <MarkdownSummaryTracker 
        {markdownContainer}
        rootMargin="-10% 0px -80% 0px"
        threshold={[0, 0.25, 0.5, 0.75, 1.0]}
      />
    </aside>
  {/if}
</div>
```

### Parâmetros de Configuração

#### MarkdownSummary
- `showProgress`: Exibe barra de progresso (padrão: true)
- `maxDepth`: Profundidade máxima do índice (padrão: 3)

#### MarkdownSummaryTracker
- `markdownContainer`: Elemento HTML do container markdown
- `rootMargin`: Margem para IntersectionObserver (padrão: "-20% 0px -70% 0px")
- `threshold`: Array de thresholds para detecção (padrão: [0, 0.1, 0.5, 1.0])

## Otimizações de Performance

### Throttling de Scroll
- Limitação de atualizações a cada 100ms
- Previne sobrecarga em documentos extensos
- Mantém responsividade da interface

### IntersectionObserver
- API nativa do navegador para detecção de elementos
- Mais eficiente que listeners de scroll tradicionais
- Configurável via rootMargin e threshold

### Lazy Initialization
- Componentes só inicializam quando container está disponível
- Evita processamento desnecessário
- Melhora tempo de carregamento inicial

## Estilização

### CSS Personalizado
- Suporte a modo escuro via `:global(.dark)`
- Cores e espaçamentos customizáveis
- Scrollbar personalizada
- Transições suaves

### Integração com Tailwind
- Classes utilitárias para layout responsivo
- Consistent design system
- Fácil customização de cores e espaçamentos

## Casos de Uso

### Ideal Para:
- 📚 Documentações técnicas
- 📝 Posts de blog longos
- 📖 Artigos acadêmicos
- 📋 Manuais e tutoriais
- 📊 Relatórios estruturados

### Benefícios:
- ⬆️ **Melhor UX**: Navegação intuitiva e progresso visual
- 🎯 **Orientação**: Usuários sempre sabem onde estão
- ⚡ **Performance**: Otimizado para documentos grandes
- 📱 **Acessibilidade**: Responsivo e touch-friendly
- 🔧 **Flexibilidade**: Altamente configurável

## Implementação no Projeto

O sistema está totalmente integrado nas páginas de blog (`/blog/[id]`) e pode ser facilmente adaptado para outras seções que utilizem conteúdo markdown estruturado.

### Arquivos Modificados:
- `src/routes/blog/[id]/+page.svelte`: Layout principal com grid responsivo
- Novos componentes criados na pasta `src/components/`
- Stores e utilitários em `src/lib/`

Este sistema transforma a experiência de leitura de posts markdown, oferecendo navegação profissional e intuitiva comparável às melhores plataformas de documentação modernas.
