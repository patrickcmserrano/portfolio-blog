# Portfolio Blog com SvelteKit

Este projeto é um blog/portfolio construído com SvelteKit, Docker e GitHub Actions para CI/CD.

## Tecnologias Utilizadas

- SvelteKit com adapter-static para geração de páginas estáticas
- Docker para containerização
- GitHub Actions para CI/CD
- TailwindCSS para estilização
- GitHub Pages para hospedagem

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

### Lições Aprendidas

#### O que funcionou:
- Multi-stage build do Docker para diferentes ambientes
- Uso do adapter-static do SvelteKit para geração de páginas estáticas
- Pipeline de CI/CD com GitHub Actions
- Extração correta dos arquivos de build do container Docker
- Configuração adequada de permissões no GitHub Actions
- Deploy via branch gh-pages ao invés do método Actions do GitHub Pages

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
  base: '/svelte-portfolio-blog/',
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
