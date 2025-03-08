<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<div class="container mx-auto px-4 space-y-16">
	<!-- Hero Section -->
	<section class="text-center py-20">
		<h1 class="h1 mb-6">
			Olá, eu sou <span class="text-secondary-500">Patrick</span>
		</h1>
		<p class="text-xl max-w-2xl mx-auto mb-8">
			Engenheiro de Software com foco em arquiteturas distribuídas e sistemas de pagamento. 
			Especializado em Clojure e microsserviços, transformando desafios complexos em soluções elegantes e escaláveis.
		</p>
		<div class="flex justify-center gap-4">
			<a
				href="/about"
				class="btn variant-filled-secondary"
			>
				Conheça minha trajetória
			</a>
			<a
				href="/blog"
				class="btn variant-soft-secondary"
			>
				Artigos técnicos
			</a>
		</div>
	</section>

	<!-- Key Competencies Section -->
	<section class="py-12 card p-4 variant-glass-surface">
		<div class="max-w-6xl mx-auto px-6">
			<h2 class="h2 mb-8 text-center">
				Competências-chave
			</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8 justify-around">
				<div class="card p-4 variant-filled-surface h-full flex flex-col">
					<div class="flex items-center gap-4 h-full">
						<svg class="w-8 h-8 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
						</svg>
						<div class="flex flex-col flex-grow">
							<h3 class="h3 mb-2">Arquitetura de Software</h3>
							<p class="text-base text-justify">
								Experiência com arquiteturas modulares como Polylith e microsserviços, focando em manutenibilidade, testabilidade e escalabilidade.
							</p>
						</div>
					</div>
				</div>
				<div class="card p-4 variant-filled-surface h-full flex flex-col">
					<div class="flex items-center gap-4 h-full">
						<svg class="w-8 h-8 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
						</svg>
						<div class="flex flex-col flex-grow">
							<h3 class="h3 mb-2">Integração de Sistemas</h3>
							<p class="text-base text-justify">
								Desenvolvimento de pipelines robustos para integração com múltiplos serviços de pagamento, e-commerce e análise de fraude.
							</p>
						</div>
					</div>
				</div>
				<div class="card p-4 variant-filled-surface h-full flex flex-col">
					<div class="flex items-center gap-4 h-full">
						<svg class="w-8 h-8 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
						</svg>
						<div class="flex flex-col flex-grow">
							<h3 class="h3 mb-2">Desenvolvimento Full Stack</h3>
							<p class="text-base text-justify">
								Experiência em desenvolvimento frontend e backend com foco em qualidade, testes automatizados e práticas ágeis.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Featured Projects Section -->
	<section class="py-16">
		<h2 class="h2 mb-8 text-center">
			Projetos em Destaque
		</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			<!-- Project Card 1 -->
			<div class="card variant-filled-surface h-full">
				<header class="card-header flex justify-between items-center p-6">
					<h3 class="h3">
						Módulo de Inteligência
					</h3>
					<span class="text-sm opacity-70">2024</span>
				</header>
				<section class="p-6 flex flex-col h-[calc(100%-5rem)]">
					<p class="mb-4 flex-grow">
						Desenvolvimento de pipelines automatizados para integração com múltiplos serviços (Getnet, VTEX, Mercado Pago, Clearsale),
						incluindo implementação de frontend com Superset para visualização de dados.
					</p>
					<div class="space-y-4">
						<h4 class="font-semibold">Impacto:</h4>
						<ul class="list-disc pl-5 mb-4">
							<li>Automação de processos manuais</li>
							<li>Base de dados confiável para decisões</li>
							<li>Dashboards interativos para clientes</li>
						</ul>
						<div class="flex flex-wrap gap-2">
							<span class="chip variant-filled">Clojure</span>
							<span class="chip variant-filled">Superset</span>
							<span class="chip variant-filled">APIs</span>
						</div>
					</div>
				</section>
			</div>

			<!-- Project Card 2 -->
			<div class="card variant-filled-surface h-full">
				<header class="card-header flex justify-between items-center p-6">
					<h3 class="h3">
						Motor de Pagamentos
					</h3>
					<span class="text-sm opacity-70">2023</span>
				</header>
				<section class="p-6 flex flex-col h-[calc(100%-5rem)]">
					<p class="mb-4 flex-grow">
						Refatoração completa do sistema de processamento de pagamentos utilizando arquitetura Polylith,
						melhorando a modularidade, testabilidade e manutenibilidade do código.
					</p>
					<div class="space-y-4">
						<h4 class="font-semibold">Impacto:</h4>
						<ul class="list-disc pl-5 mb-4">
							<li>Redução de 40% no tempo de desenvolvimento</li>
							<li>Cobertura de testes aumentada para 85%</li>
							<li>Melhor isolamento de componentes</li>
						</ul>
						<div class="flex flex-wrap gap-2">
							<span class="chip variant-filled">Clojure</span>
							<span class="chip variant-filled">Polylith</span>
							<span class="chip variant-filled">TDD</span>
						</div>
					</div>
				</section>
			</div>

			<!-- Project Card 3 -->
			<div class="card variant-filled-surface h-full">
				<header class="card-header flex justify-between items-center p-6">
					<h3 class="h3">
						Sistema de Autenticação
					</h3>
					<span class="text-sm opacity-70">2022</span>
				</header>
				<section class="p-6 flex flex-col h-[calc(100%-5rem)]">
					<p class="mb-4 flex-grow">
						Desenvolvimento de um sistema robusto de autenticação e autorização para APIs,
						utilizando interceptores e integração com AWS Cognito.
					</p>
					<div class="space-y-4">
						<h4 class="font-semibold">Impacto:</h4>
						<ul class="list-disc pl-5 mb-4">
							<li>Redução de 25% em incidentes de segurança</li>
							<li>Autenticação centralizada</li>
							<li>Controle granular de permissões</li>
						</ul>
						<div class="flex flex-wrap gap-2">
							<span class="chip variant-filled">Clojure</span>
							<span class="chip variant-filled">AWS Cognito</span>
							<span class="chip variant-filled">Segurança</span>
						</div>
					</div>
				</section>
			</div>
		</div>
	</section>
</div>

<style lang="postcss">
	figure {
		@apply flex relative flex-col;
	}
	figure svg,
	.img-bg {
		@apply w-64 h-64 md:w-80 md:h-80;
	}
	.img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation: pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
			glow 5s linear infinite;
	}
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>
