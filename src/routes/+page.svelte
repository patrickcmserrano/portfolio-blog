<script lang="ts">
	import { base } from '$app/paths';
	import HeroSection from '../components/HeroSection.svelte';
	import KeyCompetenciesSection from '../components/KeyCompetenciesSection.svelte';
	import FeaturedProjectsSection from '../components/FeaturedProjectsSection.svelte';
	import { _, json } from 'svelte-i18n';

	// Fallbacks para traduções
	$: homeTitle = $_('home.title') || 'Olá, eu sou Patrick';
	$: homeDescription = $_('home.description') || 'Engenheiro de Software com foco em arquiteturas distribuídas e sistemas de pagamento.';
	$: aboutLinkText = $_('home.aboutLinkText') || 'Conheça minha trajetória';
	$: blogLinkText = $_('home.blogLinkText') || 'Artigos técnicos';
	$: competenciesTitle = $_('competencies.title') || 'Competências-chave';
	$: architectureTitle = $_('competencies.architecture.title') || 'Arquitetura de Software';
	$: architectureDescription = $_('competencies.architecture.description') || 'Experiência com arquiteturas modulares como Polylith e microsserviços, focando em manutenibilidade, testabilidade e escalabilidade.';
	$: integrationTitle = $_('competencies.integration.title') || 'Integração de Sistemas';
	$: integrationDescription = $_('competencies.integration.description') || 'Desenvolvimento de pipelines robustos para integração com múltiplos serviços de pagamento, e-commerce e análise de fraude.';
	$: fullstackTitle = $_('competencies.fullstack.title') || 'Desenvolvimento Full Stack';
	$: fullstackDescription = $_('competencies.fullstack.description') || 'Experiência em desenvolvimento frontend e backend com foco em qualidade, testes automatizados e práticas ágeis.';
	$: projectsTitle = $_('projects.title') || 'Projetos em Destaque';

	// Function to get translated projects
	$: getTranslatedProjects = () => {
		// Helper to read array translations with safe fallback
		const tArr = (key: string, fallback: string[]) => $json(key) ?? fallback;
		return [
			{
				title: $_('projects.intelligenceModule.title') || 'Módulo de Inteligência',
				year: $_('projects.intelligenceModule.year') || '2024',
				description: $_('projects.intelligenceModule.description') || 'Desenvolvimento de pipelines automatizados para integração com múltiplos serviços (Getnet, VTEX, Mercado Pago, Clearsale), incluindo implementação de frontend com Superset para visualização de dados.',
				impact: tArr('projects.intelligenceModule.impact', [
					'Automação de processos manuais',
					'Base de dados confiável para decisões',
					'Dashboards interativos para clientes'
				]),
				tags: ['Clojure', 'Superset', 'APIs']
			},
			{
				title: $_('projects.paymentEnginePolylith.title') || 'Motor de Pagamentos - Arquitetura Polylith',
				year: $_('projects.paymentEnginePolylith.year') || '2023',
				description: $_('projects.paymentEnginePolylith.description') || 'Refatorei o Motor de Pagamentos utilizando a arquitetura Polylith, criando um sistema modular, escalável e testável, dividido em componentes independentes.',
				impact: tArr('projects.paymentEnginePolylith.impact', [
					'Redução de 40% no tempo de desenvolvimento',
					'Melhor modularidade e reutilização de componentes',
					'Base para futuros projetos de pagamento e e-commerce'
				]),
				tags: ['Clojure', 'Polylith', 'TDD', 'Arquitetura']
			},
			{
				title: $_('projects.paymentEngineOnyx.title') || 'Motor de Pagamentos - Processamento Distribuído com Onyx',
				year: $_('projects.paymentEngineOnyx.year') || '2023',
				description: $_('projects.paymentEngineOnyx.description') || "Aprimorei o Motor de Pagamentos utilizando Onyx, uma plataforma de computação distribuída, para processar tarefas assíncronas, como a geração de relatórios. Comandos disparados por usuários (ex.: 'gerar relatório') eram processados por Onyx em uma tarefa agendada diária, que gerava e enviava relatórios por e-mail.",
				impact: tArr('projects.paymentEngineOnyx.impact', [
					'Reduziu a carga no sistema, permitindo a geração eficiente de relatórios diários',
					'Processamento confiável e escalável',
					'Otimização do desempenho do sistema com jobs agendados'
				]),
				tags: ['Onyx', 'Clojure', 'Datomic', 'AWS']
			},
			{
				title: $_('projects.paymentEngineIntegrations.title') || 'Motor de Pagamentos - Integrações e Pipelines',
				year: $_('projects.paymentEngineIntegrations.year') || '2022',
				description: $_('projects.paymentEngineIntegrations.description') || 'Implementei integrações com APIs de serviços como Pix, Adyen, Cielo, Getnet, Pagar.me, Rede, MercadoPago e VTEX, utilizando pipelines automatizados para processamento de dados transacionais.',
				impact: tArr('projects.paymentEngineIntegrations.impact', [
					'Integração seamless com múltiplos provedores de pagamento',
					'Redução de 30% no tempo de implementação de novos serviços',
					'Coleta e processamento eficiente de dados em tempo real'
				]),
				tags: ['Clojure', 'Datomic', 'AWS', 'API REST', 'Pipelines']
			},
			{
				title: $_('projects.authenticationSystem.title') || 'Sistema de Autenticação',
				year: $_('projects.authenticationSystem.year') || '2022',
				description: $_('projects.authenticationSystem.description') || 'Desenvolvimento de um sistema robusto de autenticação e autorização para APIs, utilizando interceptores e integração com AWS Cognito.',
				impact: tArr('projects.authenticationSystem.impact', [
					'Redução de 25% em incidentes de segurança',
					'Autenticação centralizada',
					'Controle granular de permissões'
				]),
				tags: ['Clojure', 'AWS Cognito', 'Segurança']
			},
			{
				title: $_('projects.zougueMpmsFullstack.title') || 'Zougue MPMS - Fullstack',
				year: $_('projects.zougueMpmsFullstack.year') || '2021',
				description: $_('projects.zougueMpmsFullstack.description') || 'Assumi responsabilidades fullstack, integrando backend e frontend com Clojure, Pathom e Datomic, otimizando a infraestrutura na AWS com auto-scaling e garantindo escalabilidade para múltiplos canais e contas VTEX.',
				impact: tArr('projects.zougueMpmsFullstack.impact', [
					'Consolidação da expertise em sistemas distribuídos e escaláveis',
					'Entrega de solução agnóstica a Seller Centers para grandes operações de e-commerce',
					'Implementação de pipelines para absorção de itens e deduplicação avançada'
				]),
				tags: ['Clojure', 'Datomic', 'AWS', 'API REST', 'React']
			},
			{
				title: $_('projects.zougueMpmsFrontend.title') || 'Zougue MPMS - Frontend',
				year: $_('projects.zougueMpmsFrontend.year') || '2020',
				description: $_('projects.zougueMpmsFrontend.description') || 'Contribuí para o desenvolvimento de interfaces reativas e intuitivas, focando na gestão de estrutura e conteúdo de catálogos, como árvores de categorias, atributos e fichas de produtos.',
				impact: tArr('projects.zougueMpmsFrontend.impact', [
					'Aprimoramento das habilidades em programação funcional e UX',
					'Melhoria na usabilidade para operadores de marketplace',
					'Deduplicação de itens e operações massivas'
				]),
				tags: ['Clojure', 'ClojureScript', 'React']
			},
			{
				title: $_('projects.realEstatePlatform.title') || 'Plataforma Imobiliária (fexô)',
				year: $_('projects.realEstatePlatform.year') || '2018-2019',
				description: $_('projects.realEstatePlatform.description') || 'Desenvolvimento de uma aplicação mobile e web para anúncio, negociação, compra e venda de imóveis, utilizando ClojureScript, Fulcro e React Native.',
				impact: tArr('projects.realEstatePlatform.impact', [
					'Conexão eficiente entre clientes e corretores',
					'Experiência de usuário aprimorada',
					'Ferramenta poderosa para o mercado imobiliário'
				]),
				tags: ['ClojureScript', 'Fulcro', 'React Native']
			},
			{
				title: $_('projects.paymentGateway.title') || 'Gateway de Pagamentos',
				year: $_('projects.paymentGateway.year') || '2018',
				description: $_('projects.paymentGateway.description') || 'Colaborei no desenvolvimento de uma aplicação web para um gateway de pagamentos, focada em transações seguras e eficientes, utilizando ClojureScript e Fulcro.',
				impact: tArr('projects.paymentGateway.impact', [
					'Contribuí para a entrega de uma solução funcional',
					'Primeiro contato com desenvolvimento de software comercial',
					'Experiência inicial em integração de sistemas'
				]),
				tags: ['ClojureScript', 'Fulcro', 'API REST']
			}
		];
	};
</script>

<div class="container mx-auto space-y-16 px-4">
	<HeroSection
		{base}
		title={homeTitle}
		description={homeDescription}
		aboutLinkText={aboutLinkText}
		blogLinkText={blogLinkText}
	/>
	<KeyCompetenciesSection
		title={competenciesTitle}
		competencies={[
			{
				title: architectureTitle,
				description: architectureDescription
			},
			{
				title: integrationTitle,
				description: integrationDescription
			},
			{
				title: fullstackTitle,
				description: fullstackDescription
			}
		]}
	/>
	<FeaturedProjectsSection
		title={projectsTitle}
		projects={getTranslatedProjects()}
	/>
</div>

<style lang="postcss">
</style>
