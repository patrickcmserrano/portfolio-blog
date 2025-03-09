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

#### Desafios Superados:
1. Problema com o comando Vite no container Docker
   - Solução: Uso do `npx` para garantir execução correta
2. Extração dos arquivos de build
   - Solução: Uso de `docker cp` ao invés de volumes
3. Permissões do GitHub Actions
   - Solução: Configuração explícita de permissões no workflow

```yaml
permissions:
  contents: write
  pages: write
  id-token: write
```

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
