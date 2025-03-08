<div class="container mx-auto px-4 space-y-16">
  <!-- About Hero Section -->
  <section class="text-center py-20">
    <h1 class="h1 mb-6">
      Sobre Mim
    </h1>
    <div class="flex justify-center mb-8">
      <div class="w-32 h-32 rounded-full overflow-hidden">
        <img
          src="https://via.placeholder.com/300x300"
          alt="Profile"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
    <div class="space-y-6 max-w-3xl mx-auto">
      <p class="text-xl">
        Engenheiro de software apaixonado por resolver desafios complexos através de soluções elegantes e criativas.
        Minha jornada é marcada por projetos desafiadores que exigiram pensamento crítico e inovação, especialmente
        no desenvolvimento de sistemas distribuídos e soluções de pagamento.
      </p>
      <p class="text-xl">
        Na Moleque de Ideias, transformei desafios em oportunidades de inovação: desde a refatoração do Motor de Pagamentos
        com arquitetura Polylith, até o desenvolvimento de sistemas de autenticação robustos e pipelines de integração
        que conectam múltiplos serviços. Cada projeto foi uma chance de combinar criatividade técnica com resultados práticos.
      </p>
    </div>
  </section>

  <!-- Skills Section -->
  <section class="py-16">
    <h2 class="h2 mb-12 text-center">
      Habilidades Técnicas
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
      <!-- Languages & Core -->
      <div class="card variant-filled-surface p-6">
        <h3 class="h3 mb-4">
          Linguagens & Core
        </h3>
        <ul class="space-y-2">
          <li>Clojure / ClojureScript</li>
          <li>Java</li>
          <li>JavaScript / TypeScript</li>
          <li>Golang</li>
          <li>Python</li>
        </ul>
      </div>

      <!-- Frameworks & Libraries -->
      <div class="card variant-filled-surface p-6">
        <h3 class="h3 mb-4">
          Frameworks & Bibliotecas
        </h3>
        <ul class="space-y-2">
          <li>Polylith / Reitit / Pathom</li>
          <li>Fulcro / Fulcro-RAD</li>
          <li>React / React Native</li>
          <li>Reagent / Re-frame</li>
          <li>Malli / Datomic</li>
        </ul>
      </div>

      <!-- Infrastructure & Tools -->
      <div class="card variant-filled-surface p-6">
        <h3 class="h3 mb-4">
          Infraestrutura & Ferramentas
        </h3>
        <ul class="space-y-2">
          <li>AWS / Cognito</li>
          <li>Docker / Kubernetes</li>
          <li>RabbitMQ / Kafka</li>
          <li>Elastic Stack</li>
          <li>Prometheus / Grafana</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- Experience Section -->
  <section class="py-16">
    <h2 class="h2 mb-12 text-center">
      Experiência Profissional
    </h2>
    <div class="max-w-3xl mx-auto space-y-8">
      <!-- Experience Item 1 -->
      <div class="card variant-filled-surface p-6">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="h3">
              Programador Pleno
            </h3>
            <p>Moleque de Ideias</p>
          </div>
          <span class="text-sm opacity-70">
            2022 - 2024
          </span>
        </div>
        <p class="mb-4">
          Desenvolvimento de soluções para sistemas de pagamento e e-commerce, com foco em arquitetura de software,
          segurança e integração de sistemas. Trabalho com Clojure e arquiteturas distribuídas.
        </p>
        <h4 class="font-semibold mb-2">Principais Realizações:</h4>
        <ul class="space-y-2">
          <li>• <strong>Módulo de Inteligência (2024):</strong> Desenvolvimento de pipelines automatizados para integração com múltiplos serviços de pagamento e e-commerce, incluindo implementação de frontend com Superset.</li>
          <li>• <strong>Motor de Pagamentos (2023):</strong> Refatoração completa utilizando arquitetura Polylith, melhorando modularidade e testabilidade.</li>
          <li>• <strong>Sistema de Autenticação (2022):</strong> Implementação de interceptores de autenticação para APIs, reduzindo incidentes de segurança em 25%.</li>
        </ul>
      </div>

      <!-- Education Section -->
      <div class="card variant-filled-surface p-6">
        <h3 class="h3 mb-4">
          Formação Acadêmica
        </h3>
        <div class="space-y-4">
          <div>
            <h4 class="font-semibold">Engenharia de Software</h4>
            <p>Faculdade Descomplica • 2024 - presente</p>
          </div>
          <div>
            <h4 class="font-semibold">Bacharelado em Ciência da Computação</h4>
            <p>Universidade Federal Fluminense • 2022 - 2023</p>
            <p class="text-sm opacity-70">Incompleto</p>
          </div>
          <div>
            <h4 class="font-semibold">Bacharelado em Física</h4>
            <p>Universidade Federal Fluminense • 2015-2018</p>
            <p class="text-sm opacity-70">Incompleto, focado em desenvolvimento de software para o laboratório de informação quântica.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section class="py-16 card variant-glass-surface">
    <h2 class="h2 mb-8 text-center">
      Contato
    </h2>
    <p class="text-center max-w-2xl mx-auto mb-8">
      Estou sempre aberto a discutir novos projetos, oportunidades de colaboração ou apenas trocar ideias sobre tecnologia.
      Sinta-se à vontade para entrar em contato através de qualquer um dos canais abaixo:
    </p>
    <div class="flex justify-center space-x-10">
      <a
        href="https://github.com/patrickcmserrano"
        target="_blank"
        rel="noopener noreferrer"
        class="btn variant-filled-surface flex flex-col items-center group"
        aria-label="GitHub Profile"
      >
        <div class="p-3 rounded-full">
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
          </svg>
        </div>
        <span class="mt-2 font-medium">GitHub</span>
      </a>
      <a
        href="https://www.linkedin.com/in/patrickcmserrano/"
        target="_blank"
        rel="noopener noreferrer"
        class="btn variant-filled-surface flex flex-col items-center group"
        aria-label="LinkedIn Profile"
      >
        <div class="p-3 rounded-full">
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </div>
        <span class="mt-2 font-medium">LinkedIn</span>
      </a>
      <a
        href="mailto:patrickcmserrano@protonmail.com"
        class="btn variant-filled-surface flex flex-col items-center group"
        aria-label="Email Contact"
      >
        <div class="p-3 rounded-full">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <span class="mt-2 font-medium">Email</span>
      </a>
    </div>
  </section>
</div> 