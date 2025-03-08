<script lang="ts">
  const posts = [
    {
      id: 1,
      title: 'Arquitetura Polylith em Clojure: Um Guia Prático',
      excerpt: 'Aprenda como a arquitetura Polylith pode transformar o desenvolvimento de aplicações Clojure, baseado em experiências reais com o Motor de Pagamentos.',
      date: '2024-03-08',
      readTime: '10 min',
      tags: ['Clojure', 'Polylith', 'Arquitetura']
    },
    {
      id: 2,
      title: 'Microsserviços e Pipelines: Automatizando Integrações',
      excerpt: 'Uma análise profunda sobre a implementação de pipelines automatizados para integração de dados entre microsserviços.',
      date: '2024-03-01',
      readTime: '8 min',
      tags: ['Microsserviços', 'DevOps', 'Automação']
    },
    {
      id: 3,
      title: 'Segurança em APIs: Implementando Interceptores',
      excerpt: 'Como desenvolver um sistema robusto de autenticação usando interceptores para proteger APIs públicas e privadas.',
      date: '2024-02-25',
      readTime: '12 min',
      tags: ['Segurança', 'API', 'Backend']
    },
    {
      id: 4,
      title: 'Datomic: Banco de Dados para Aplicações Clojure',
      excerpt: 'Explorando as vantagens do Datomic como banco de dados para aplicações Clojure e como ele se integra com a arquitetura Polylith.',
      date: '2024-02-18',
      readTime: '15 min',
      tags: ['Datomic', 'Clojure', 'Database']
    }
  ];
</script>

<div class="container mx-auto px-4 space-y-16">
  <!-- Blog Hero Section -->
  <section class="text-center py-20">
    <h1 class="h1 mb-6">
      Blog
    </h1>
    <p class="text-xl max-w-2xl mx-auto">
      Compartilhando conhecimentos e experiências sobre desenvolvimento Clojure, arquitetura de software e boas práticas.
    </p>
  </section>

  <!-- Blog Posts -->
  <section class="max-w-4xl mx-auto">
    <div class="space-y-8">
      {#each posts as post}
        <div class="card variant-filled-surface">
          <section class="p-6">
            <div class="flex flex-wrap gap-2 mb-4">
              {#each post.tags as tag}
                <span class="chip variant-filled">{tag}</span>
              {/each}
            </div>
            <h2 class="h2 mb-2">
              <a
                href={`/blog/${post.id}`}
                class="anchor hover:text-tertiary-500 transition-colors duration-200"
              >
                {post.title}
              </a>
            </h2>
            <div class="flex items-center text-sm opacity-70 mb-4">
              <time datetime={post.date}>
                {new Date(post.date).toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span class="mx-2">•</span>
              <span>{post.readTime} de leitura</span>
            </div>
            <p class="mb-4">
              {post.excerpt}
            </p>
            <a
              href={`/blog/${post.id}`}
              class="anchor inline-flex items-center text-tertiary-500 hover:text-tertiary-600"
            >
              Ler mais
              <svg
                class="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </section>
        </div>
      {/each}
    </div>
  </section>
</div> 