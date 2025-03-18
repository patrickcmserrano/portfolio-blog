# Svelte Portfolio & Blog

Bem-vindo ao **Svelte Portfolio & Blog**, um site de portfólio pessoal e blog construído com **SvelteKit**. Este projeto combina um design moderno e responsivo com funcionalidades práticas, como suporte a temas (light/dark mode) e um blog baseado em Markdown. É um exemplo de como utilizar SvelteKit para criar uma aplicação web performática e amigável.

### Funcionalidades

- **Portfólio Pessoal**: Exiba seus projetos e habilidades em um layout elegante e otimizado.
- **Blog Integrado**: Escreva e publique posts usando Markdown, com suporte a categorias e tags para organização.
- **Temas Dinâmicos**: Alterne entre os modos claro e escuro com um clique.
- **Design Responsivo**: Totalmente adaptado para dispositivos móveis e desktops.
- **Otimização de Desempenho**: Imagens com lazy loading e carregamento eficiente de conteúdo.

### Tecnologias Utilizadas

- **[SvelteKit](https://kit.svelte.dev/)**: Framework principal para construção do site.
- **[TailwindCSS](https://tailwindcss.com/)**: Estilização rápida e responsiva.
- **Markdown**: Para criação e renderização dos posts do blog.

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/patrickcmserrano/svelte-portfolio-blog.git
   ```
2. Entre no diretório:
   ```bash
   cd svelte-portfolio-blog
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Abra o navegador em `http://localhost:5173`.

### Contribuições

Sinta-se à vontade para abrir issues ou enviar pull requests com sugestões de melhorias!

### Licença

Este projeto está sob a licença MIT.

## Resumo do Processo de Build e Deploy

### Visão Geral do Fluxo

1. Desenvolvimento local usando Docker ou npm
2. Push para a branch `skeleton` dispara o GitHub Actions
3. GitHub Actions executa o build no container Docker
4. Arquivos de build são extraídos e publicados na branch gh-pages
5. GitHub Pages serve a aplicação a partir da branch gh-pages

### Processo Detalhado

#### 1. Build Process

- Container Docker usa multi-stage build:
  1. `base`: Configuração inicial e dependências
  2. `development`: Ambiente de desenvolvimento
  3. `builder`: Gera os arquivos estáticos
  4. `production`: Imagem final otimizada

#### 2. Deploy Process

```
Container (/app/build) -> GitHub Actions Runner (./build) -> Branch gh-pages (/) -> GitHub Pages
```

#### 3. Configurações Essenciais

- **SvelteKit**: Usa adapter-static e configura base path
- **GitHub Pages**: Deploy via branch (não via Actions)
- **GitHub Actions**: Copia arquivos do container e faz deploy

#### 4. Pontos Críticos Resolvidos

- Base path correto para GitHub Pages (`/svelte-portfolio-blog`)
- Extração correta dos arquivos de build do container
- Configuração do GitHub Pages via branch gh-pages
- Página 404.html para gerenciamento de rotas

Este projeto é um blog/portfolio construído com SvelteKit, Docker e GitHub Actions para CI/CD.

## Tecnologias Utilizadas

- SvelteKit com adapter-static para geração de páginas estáticas
- Docker para containerização
- GitHub Actions para CI/CD
- TailwindCSS para estilização
- GitHub Pages para hospedagem
- ESLint e Prettier para padronização do código

## Desenvolvimento Local

Para rodar o projeto localmente:

```bash
# Desenvolvimento com Docker
docker-compose up

# Desenvolvimento sem Docker
npm install
npm run dev
```

## Processo de Build e Deploy

O projeto utiliza GitHub Actions para automatizar o build e deploy. O pipeline inclui:

1. Build do container Docker
2. Geração dos arquivos estáticos
3. Deploy automático para GitHub Pages

### História do Deploy e Lições Aprendidas

#### Tentativa Inicial (Não Funcionou):

Inicialmente, tentamos configurar o GitHub Pages usando o método de "Actions" nas configurações do repositório:

1. Settings > Pages > Build and deployment > Source > GitHub Actions
2. Isso causou conflitos com o SvelteKit e Vite, pois:
   - O GitHub Actions tentava servir os arquivos diretamente
   - O base path do SvelteKit não era respeitado
   - As rotas não funcionavam corretamente

#### Solução Final (Funcionou):

Mudamos para o método tradicional de deploy via branch:

1. Settings > Pages > Build and deployment > Source > Deploy from a branch
2. Branch: gh-pages / folder: / (root)
3. Configuramos o workflow para:
   - Fazer build no container Docker
   - Extrair os arquivos de build
   - Fazer push para a branch gh-pages

Esta abordagem funcionou porque:

- Mantém a compatibilidade com o SvelteKit
- Respeita o base path configurado
- Permite o uso correto do adapter-static

### Configuração do Docker

```dockerfile
# Multi-stage build para otimização
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# Development stage
FROM base AS development
RUN npm install
COPY . .
EXPOSE 3000
CMD ["sh", "-c", "npx svelte-kit sync && npm run dev -- --host 0.0.0.0"]

# Build stage
FROM base AS builder
RUN npm install
COPY . .
ENV NODE_ENV=production
RUN set -ex && \
    npx svelte-kit sync && \
    npx vite build --debug

# Production stage
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/build ./build
COPY package*.json ./
RUN npm install --production
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
```

### Configuração do PostCSS com Svelte e TailwindCSS

Este projeto utiliza PostCSS para processar o CSS, integrando o TailwindCSS para estilização e o Svelte para construção da aplicação. A configuração do PostCSS está definida no arquivo `postcss.config.cjs`.

### Estrutura de Arquivos CSS

- `src/app.css`: Arquivo principal de estilos, onde são importadas as diretivas do TailwindCSS (`@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`).
- `src/app.postcss`: Arquivo adicional de estilos, aplicando utilitários do TailwindCSS e variantes.

### Como Efetuar Edições em CSS

1. **Adicionar Estilos Globais**:
   - Edite o arquivo `src/app.css` para adicionar ou sobrescrever estilos globais utilizando as diretivas do TailwindCSS.

2. **Adicionar Estilos Específicos**:
   - Utilize classes utilitárias do TailwindCSS diretamente nos componentes Svelte para aplicar estilos específicos.

3. **Configurar TailwindCSS**:
   - Edite o arquivo `tailwind.config.ts` para adicionar configurações personalizadas, como temas, plugins e extensões de estilos.

### Exemplo de Configuração do PostCSS

```javascript
// filepath: c:\dev\portifolio-blog\skeleton-portifolio-blog\postcss.config.cjs
module.exports = {
	plugins: {
		tailwindcss: {},
		autoprefixer: {}
	}
};
```

### Exemplo de Uso no Arquivo CSS Principal

```css
/* filepath: c:\dev\portifolio-blog\skeleton-portifolio-blog\src\app.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Sobrescrevendo a regra anterior (h1 strong) */
.prose :where(h1 strong):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
    font-weight: 900;
    color: rgb(229 231 235 ); /* Cor personalizada */
}

/* Sobrescrevendo a nova regra (strong) */
.prose :where(strong):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
    font-weight: 600; /* Mantém o peso original */
    color: rgb(229 231 235 ); /* Substitui var(--tw-prose-bold) por uma cor fixa, ex.: cinza escuro */
}
```

### Exemplo de Uso no Arquivo PostCSS

```postcss
// filepath: c:\dev\portifolio-blog\skeleton-portifolio-blog\src\app.postcss
@tailwind base;
@tailwind components;
@tailwind utilities;
@tailwind variants;

html,
body {
	@apply h-full overflow-hidden;
}
```

### Futuras Edições

Para futuras edições em CSS, siga os passos acima para adicionar ou modificar estilos globais e específicos. Utilize as classes utilitárias do TailwindCSS para manter a consistência e a eficiência dos estilos aplicados.

### Configuração do ESLint e Prettier

O projeto utiliza ESLint e Prettier para garantir a qualidade e consistência do código. A configuração do ESLint pode ser encontrada no arquivo `eslint.config.js`. O Prettier está integrado ao ESLint para formatação automática.

### Testes

O projeto utiliza Vitest para testes unitários e Playwright para testes de integração. Os testes podem ser executados com o seguinte comando:

```bash
npm run test
```

### Lições Aprendidas

#### O que funcionou:

- Multi-stage build do Docker para diferentes ambientes
- Uso do adapter-static do SvelteKit para geração de páginas estáticas
- Pipeline de CI/CD com GitHub Actions
- Extração correta dos arquivos de build do container Docker
- Configuração adequada de permissões no GitHub Actions
- Deploy via branch gh-pages ao invés do método Actions

#### Desafios Superados:

1. Problema com o comando Vite no container Docker
   - Solução: Uso do `npx` para garantir execução correta
2. Extração dos arquivos de build
   - Solução: Uso de `docker cp` ao invés de volumes
3. Permissões do GitHub Actions
   - Solução: Configuração explícita de permissões no workflow
4. GitHub Pages servindo README ao invés da aplicação
   - Solução: Configuração correta do workflow com `force_orphan` e verificação do conteúdo do build
5. Conflito entre GitHub Actions e SvelteKit
   - Solução: Mudança para deploy via branch gh-pages ao invés do método Actions
   - Configuração correta do base path no SvelteKit e Vite

### Configurações Críticas

1. **SvelteKit (svelte.config.js)**:

```javascript
kit: {
  adapter: adapter({
    pages: 'build',
    assets: 'build',
    fallback: '404.html'
  }),
  paths: {
    base: '/svelte-portfolio-blog'
  }
}
```

2. **Vite (vite.config.ts)**:

```typescript
export default defineConfig({
	base: '/svelte-portfolio-blog/'
	// ... outras configurações
});
```

3. **404.html para Redirecionamento**:

- Implementado para garantir que rotas diretas funcionem corretamente
- Mantém o estado da aplicação mesmo em refresh
- Gerencia corretamente o base path do GitHub Pages

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Preview do build
npm run preview

# Lint
npm run lint

# Testes
npm run test
```

## Estrutura do Projeto

```
.
├── src/               # Código fonte
├── static/           # Arquivos estáticos
├── tests/            # Testes
├── Dockerfile        # Configuração Docker
├── docker-compose.yml # Configuração Docker Compose
└── .github/workflows # Configurações CI/CD
```

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
