<script lang="ts">
	import { _ } from 'svelte-i18n';

	$: title = $_('about.experience.title') || 'Experiência Profissional';
	
	// Senior position
	$: seniorTitle = $_('about.experience.senior.title') || 'Desenvolvedor de Software Pleno (Fullstack)';
	$: seniorCompany = $_('about.experience.senior.company') || 'Moleque de Ideias';
	$: seniorPeriod = $_('about.experience.senior.period') || '2021 - 2024';
	$: seniorDescription = $_('about.experience.senior.description') || 'Desenvolvimento de soluções inovadoras para sistemas de pagamento e e-commerce, com ênfase em refatoração de código, integração de APIs, arquitetura de software e automação de processos.';
	$: seniorAchievements = $_('about.experience.senior.achievements') || 'Principais Realizações:';
	$: seniorAch1 = $_('about.experience.senior.achievement1') || '**Módulo de Inteligência (2024):** Desenvolvimento de auto-pipelines para integração com serviços como Getnet, Pagar.me, Rede, ClearSale, MercadoPago, VTEX e Unico, otimizando a coleta, processamento e armazenamento de dados no banco Datomic.';
	$: seniorAch2 = $_('about.experience.senior.achievement2') || '**Refatoração do Motor de Pagamentos (2023):** Liderança na refatoração do "Motor de Pagamentos" e "Formiguinhas Service" com a arquitetura Polylith, promovendo modularidade, reutilização, escalabilidade e testabilidade.';
	$: seniorAch3 = $_('about.experience.senior.achievement3') || '**Segurança em APIs (2022):** Implementação de interceptadores de autenticação para APIs públicas e privadas, reduzindo incidentes de segurança em 25%.';
	$: seniorAch4 = $_('about.experience.senior.achievement4') || '**Processamento Distribuído com Onyx no Motor de Pagamentos (2023):** Implementei Onyx para gerenciar tarefas assíncronas no Motor de Pagamentos, como a geração de relatórios. Configurei workflows para processar comandos (ex.: "gerar relatório") em uma tarefa agendada diária, que gerava e enviava relatórios por e-mail, garantindo escalabilidade e responsividade.';
	$: seniorAch5 = $_('about.experience.senior.achievement5') || '**Integração de Pagamentos (2021-2023):** Desenvolvimento e homologação de adaptadores para Pix e cartão de crédito, integrando com os serviços Adyen, Cielo, Clearsale, VTEX, Rede, dentre outros, incluindo geração de QR Code para Pix.';
	$: seniorAch6 = $_('about.experience.senior.achievement6') || '**Frontend e UX (2021-2024):** Criação de componentes de UI com Fulcro-RAD e React, aprimorando a usabilidade e a estética das interfaces.';
	
	// Junior position
	$: juniorTitle = $_('about.experience.junior.title') || 'Desenvolvedor de Software Junior (Frontend)';
	$: juniorCompany = $_('about.experience.junior.company') || 'Moleque de Ideias';
	$: juniorPeriod = $_('about.experience.junior.period') || '2019 - 2021';
	$: juniorDescription = $_('about.experience.junior.description') || 'Desenvolvimento de aplicações web e mobile com ClojureScript, Fulcro e React Native, contribuindo para soluções nos setores imobiliário, e-commerce e gestão de catálogos de produtos.';
	$: juniorAchievements = $_('about.experience.junior.achievements') || 'Principais Realizações:';
	$: juniorAch1 = $_('about.experience.junior.achievement1') || '**Aplicação Mobile e Web para Imobiliárias (fexô):** Participação no desenvolvimento de uma aplicação mobile com ClojureScript, Fulcro e React Native.';
	$: juniorAch2 = $_('about.experience.junior.achievement2') || '**Startup de Varejo/E-commerce:** Contribuição no desenvolvimento frontend (ClojureScript, Fulcro, React), entregando atualizações contínuas.';
	$: juniorAch3 = $_('about.experience.junior.achievement3') || '**Zougue MPMS - Fase Inicial (2021-2022):** Desenvolvimento de interfaces com Clojure e React, implementando gestão de catálogos e deduplicação de itens.';
	
	// Intern position
	$: internTitle = $_('about.experience.intern.title') || 'Estágio em Desenvolvimento de Software (Frontend)';
	$: internCompany = $_('about.experience.intern.company') || 'Moleque de Ideias';
	$: internPeriod = $_('about.experience.intern.period') || '2018 - 2019';
	$: internDescription = $_('about.experience.intern.description') || 'Estágio em desenvolvimento de software, com foco em integração de aplicações web e suporte a projetos de incubação de startups.';
	$: internAchievements = $_('about.experience.intern.achievements') || 'Principais Realizações:';
	$: internAch1 = $_('about.experience.intern.achievement1') || '**Integração de Gateway de Pagamentos:** Colaborei na construção e integração de uma aplicação web para um gateway de pagamentos, utilizando ClojureScript e Fulcro. O projeto envolveu o desenvolvimento de interfaces iniciais e a integração com APIs, proporcionando uma solução funcional para transações seguras. Minha participação incluiu suporte na configuração de rotas e testes básicos, garantindo a comunicação eficiente entre frontend e backend.';
	$: internAch2 = $_('about.experience.intern.achievement2') || '**Plataforma Imobiliária (fexô) - Fase Inicial:** Participei das etapas iniciais de planejamento e desenvolvimento de uma plataforma web e mobile para anúncio, negociação, compra e venda de imóveis. O foco estava em criar uma experiência inicial de usuário, conectando clientes a corretores. Contribuí com a implementação de funcionalidades básicas de UI, utilizando ClojureScript, React Native e ferramentas como Pathom e Datomic, sob orientação da equipe.';
</script>

<section class="py-16">
	<h2 class="h2 mb-12 text-center text-surface-900 dark:text-surface-100">{title}</h2>
	<div class="mx-auto max-w-3xl space-y-8">
		<!-- Senior Position -->
		<div class="card bg-surface-100 dark:bg-surface-700 border border-surface-300 dark:border-surface-600 p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
			<div class="mb-4 flex items-start justify-between">
				<div>
					<h3 class="h3 text-surface-900 dark:text-surface-100">{seniorTitle}</h3>
					<p class="text-surface-700 dark:text-surface-200">{seniorCompany}</p>
				</div>
				<span class="text-sm text-surface-600 dark:text-surface-300">{seniorPeriod}</span>
			</div>
			<p class="mb-4 text-surface-700 dark:text-surface-200">
				{seniorDescription}
			</p>
			<h4 class="mb-2 font-semibold text-surface-900 dark:text-surface-100">{seniorAchievements}</h4>
			<ul class="space-y-2 text-surface-700 dark:text-surface-200">
				<li>{@html seniorAch1}</li>
				<li>{@html seniorAch2}</li>
				<li>{@html seniorAch3}</li>
				<li>{@html seniorAch4}</li>
				<li>{@html seniorAch5}</li>
				<li>{@html seniorAch6}</li>
			</ul>
		</div>

		<!-- Junior Position -->
		<div class="card bg-surface-100 dark:bg-surface-700 border border-surface-300 dark:border-surface-600 p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
			<div class="mb-4 flex items-start justify-between">
				<div>
					<h3 class="h3 text-surface-900 dark:text-surface-100">{juniorTitle}</h3>
					<p class="text-surface-700 dark:text-surface-200">{juniorCompany}</p>
				</div>
				<span class="text-sm text-surface-600 dark:text-surface-300">{juniorPeriod}</span>
			</div>
			<p class="mb-4 text-surface-700 dark:text-surface-200">
				{juniorDescription}
			</p>
			<h4 class="mb-2 font-semibold text-surface-900 dark:text-surface-100">{juniorAchievements}</h4>
			<ul class="space-y-2 text-surface-700 dark:text-surface-200">
				<li>{@html juniorAch1}</li>
				<li>{@html juniorAch2}</li>
				<li>{@html juniorAch3}</li>
			</ul>
		</div>

		<!-- Intern Position -->
		<div class="card bg-surface-100 dark:bg-surface-700 border border-surface-300 dark:border-surface-600 p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
			<div class="mb-4 flex items-start justify-between">
				<div>
					<h3 class="h3 text-surface-900 dark:text-surface-100">{internTitle}</h3>
					<p class="text-surface-700 dark:text-surface-200">{internCompany}</p>
				</div>
				<span class="text-sm text-surface-600 dark:text-surface-300">{internPeriod}</span>
			</div>
			<p class="mb-4 text-surface-700 dark:text-surface-200">
				{internDescription}
			</p>
			<h4 class="mb-2 font-semibold text-surface-900 dark:text-surface-100">{internAchievements}</h4>
			<ul class="space-y-2 text-surface-700 dark:text-surface-200">
				<li>{@html internAch1}</li>
				<li>{@html internAch2}</li>
			</ul>
		</div>
	</div>
</section>