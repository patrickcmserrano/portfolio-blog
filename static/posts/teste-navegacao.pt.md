# Sistema de Navegação Avançado

Este é um post de teste para demonstrar o sistema de navegação e rastreamento de leitura.

## Introdução

O sistema implementado oferece funcionalidades avançadas para navegação em documentos markdown.

### Características Principais

- Navegação automática
- Progresso de leitura
- Rastreamento de seção ativa

#### Detalhes Técnicos

O sistema utiliza IntersectionObserver para detectar seções visíveis.

##### Performance

Throttling é aplicado para otimizar a performance.

###### Compatibilidade

Funciona em todos os navegadores modernos.

## Funcionalidades

### Parser Automático

O parser extrai automaticamente os headers do HTML renderizado.

```typescript
function parseFromRenderedHTML(container: HTMLElement): MarkdownSection[] {
  const headers = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
  // ...resto da implementação
}
```

### Rastreamento de Scroll

O sistema monitora o scroll de forma otimizada.

#### Throttling

Para evitar sobrecarga, o sistema usa throttling no evento de scroll.

#### Cálculo de Progresso

O progresso é calculado baseado na posição das seções.

### Navegação Suave

Clicando em uma seção no índice, a navegação é suave.

## Configuração

### Parâmetros Disponíveis

- `showProgress`: Mostra barra de progresso
- `maxDepth`: Profundidade máxima do índice
- `rootMargin`: Margem para IntersectionObserver

### Exemplo de Uso

```svelte
<MarkdownSummary 
  showProgress={true}
  maxDepth={4}
/>
```

## Conclusão

Este sistema oferece uma experiência de leitura superior, similar a documentações modernas como GitHub ou GitBook.

### Próximos Passos

- Adicionar animações
- Melhorar responsividade
- Otimizar para mobile

#### Considerações Finais

O sistema é altamente customizável e performático.
