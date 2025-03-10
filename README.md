# Portfólio e Blog com ClojureScript

Este é um projeto de portfólio e blog pessoal desenvolvido com ClojureScript, utilizando Reagent, re-frame e Material UI (via reagent-material-ui).

## Tecnologias

- ClojureScript
- Reagent (interface para React)
- re-frame (gerenciamento de estado)
- shadow-cljs (compilação e desenvolvimento)
- Material UI via reagent-material-ui
- Docker (para desenvolvimento sem precisar instalar Clojure/Java)

## Estrutura do Projeto

```
meu-portfolio/
├── public/               # Arquivos estáticos e compilados
│   ├── index.html       # Página HTML base
│   └── js/              # JavaScript compilado (gerado pelo shadow-cljs)
├── src/                  # Código-fonte ClojureScript
│   └── meu_portfolio/
│       ├── core.cljs    # Ponto de entrada da aplicação
│       ├── routes.cljs  # Roteamento com bidi
│       └── views.cljs   # Componentes de UI
├── posts/                # Arquivos Markdown para os posts do blog
├── Dockerfile            # Configuração do ambiente Docker
└── docker-compose.yml    # Configuração do Docker Compose
```

## Executando com Docker

Para iniciar o ambiente de desenvolvimento usando Docker:

1. Certifique-se de que o Docker e o Docker Compose estejam instalados em seu sistema.

2. Execute o seguinte comando na raiz do projeto:

```bash
docker-compose up
```

3. A aplicação estará disponível nas seguintes URLs:
   - App: http://localhost:3000
   - Interface do shadow-cljs: http://localhost:9630
   - Servidor de desenvolvimento: http://localhost:8080

## Desenvolvimento

### Estrutura da Aplicação

- **views.cljs**: Contém todos os componentes de UI para as diferentes páginas.
- **routes.cljs**: Gerencia o roteamento da aplicação.
- **core.cljs**: Configura o tema do Material UI e inicializa o aplicativo.

### Compilação para Produção

Para compilar a aplicação para produção:

```bash
docker-compose run --rm app npm run build
```

Os arquivos compilados estarão disponíveis na pasta `public/`. Essa pasta pode ser diretamente implantada no GitHub Pages ou em qualquer outro serviço de hospedagem de sites estáticos.

## Deploy no GitHub Pages

1. Compile a aplicação para produção.
2. Crie um repositório no GitHub.
3. Configure o GitHub Pages para usar a pasta `public/` como fonte.
4. Faça push do conteúdo para a branch gh-pages.

## Personalização

Para personalizar o site:

1. Edite os dados de exemplo no arquivo `views.cljs`.
2. Modifique o tema do Material UI no arquivo `core.cljs`.
3. Adicione novos componentes conforme necessário.

## Licença

MIT
