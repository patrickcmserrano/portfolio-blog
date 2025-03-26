<script lang="ts">
	import { base } from '$app/paths';
	import HeroSection from '../components/HeroSection.svelte';
	import KeyCompetenciesSection from '../components/KeyCompetenciesSection.svelte';
	import FeaturedProjectsSection from '../components/FeaturedProjectsSection.svelte';
</script>

<div class="container mx-auto space-y-16 px-4">
	<HeroSection 
		base={base}
		title="Olá, eu sou Patrick"
		description="Engenheiro de Software com foco em arquiteturas distribuídas e sistemas de pagamento. Especializado em Clojure e microsserviços, transformando desafios complexos em soluções elegantes e escaláveis."
		aboutLinkText="Conheça minha trajetória"
		blogLinkText="Artigos técnicos"
	/>
	<KeyCompetenciesSection 
		title="Competências-chave"
		competencies={[
			{
				title: "Arquitetura de Software",
				description: "Experiência com arquiteturas modulares como Polylith e microsserviços, focando em manutenibilidade, testabilidade e escalabilidade."
			},
			{
				title: "Integração de Sistemas",
				description: "Desenvolvimento de pipelines robustos para integração com múltiplos serviços de pagamento, e-commerce e análise de fraude."
			},
			{
				title: "Desenvolvimento Full Stack",
				description: "Experiência em desenvolvimento frontend e backend com foco em qualidade, testes automatizados e práticas ágeis."
			}
		]}
	/>
	<FeaturedProjectsSection 
		title="Projetos em Destaque"
		projects={[
			{
				title: "Módulo de Inteligência",
				year: "2024",
				description: "Desenvolvimento de pipelines automatizados para integração com múltiplos serviços (Getnet, VTEX, Mercado Pago, Clearsale), incluindo implementação de frontend com Superset para visualização de dados.",
				impact: [
					"Automação de processos manuais",
					"Base de dados confiável para decisões",
					"Dashboards interativos para clientes"
				],
				tags: ["Clojure", "Superset", "APIs"]
			},
			{
				title: "Motor de Pagamentos - Arquitetura Polylith",
				year: "2023",
				description: "Refatorei o Motor de Pagamentos utilizando a arquitetura Polylith, criando um sistema modular, escalável e testável, dividido em componentes independentes.",
				impact: [
					"Redução de 40% no tempo de desenvolvimento",
					"Melhor modularidade e reutilização de componentes",
					"Base para futuros projetos de pagamento e e-commerce"
				],
				tags: ["Clojure", "Polylith", "TDD", "Arquitetura"]
			},
			{
				title: "Motor de Pagamentos - Processamento Distribuído com Onyx",
				year: "2023",
				description: "Aprimorei o Motor de Pagamentos utilizando Onyx, uma plataforma de computação distribuída, para processar tarefas assíncronas, como a geração de relatórios. Comandos disparados por usuários (ex.: 'gerar relatório') eram processados por Onyx em uma tarefa agendada diária, que gerava e enviava relatórios por e-mail.",
				impact: [
					"Reduziu a carga no sistema, permitindo a geração eficiente de relatórios diários",
					"Processamento confiável e escalável",
					"Otimização do desempenho do sistema com jobs agendados"
				],
				tags: ["Onyx", "Clojure", "Datomic", "AWS"]
			},
			{
				title: "Motor de Pagamentos - Integrações e Pipelines",
				year: "2022",
				description: "Implementei integrações com APIs de serviços como Pix, Adyen, Cielo, Getnet, Pagar.me, Rede, MercadoPago e VTEX, utilizando pipelines automatizados para processamento de dados transacionais.",
				impact: [
					"Integração seamless com múltiplos provedores de pagamento",
					"Redução de 30% no tempo de implementação de novos serviços",
					"Coleta e processamento eficiente de dados em tempo real"
				],
				tags: ["Clojure", "Datomic", "AWS", "API REST", "Pipelines"]
			},
			{
				title: "Sistema de Autenticação",
				year: "2022",
				description: "Desenvolvimento de um sistema robusto de autenticação e autorização para APIs, utilizando interceptores e integração com AWS Cognito.",
				impact: [
					"Redução de 25% em incidentes de segurança",
					"Autenticação centralizada",
					"Controle granular de permissões"
				],
				tags: ["Clojure", "AWS Cognito", "Segurança"]
			},
			{
				title: "Zougue MPMS - Fullstack",
				year: "2021",
				description: "Assumi responsabilidades fullstack, integrando backend e frontend com Clojure, Pathom e Datomic, otimizando a infraestrutura na AWS com auto-scaling e garantindo escalabilidade para múltiplos canais e contas VTEX.",
				impact: [
					"Consolidação da expertise em sistemas distribuídos e escaláveis",
					"Entrega de solução agnóstica a Seller Centers para grandes operações de e-commerce",
					"Implementação de pipelines para absorção de itens e deduplicação avançada"
				],
				tags: ["Clojure", "Datomic", "AWS", "API REST", "React"]
			},
			{
				title: "Zougue MPMS - Frontend",
				year: "2020",
				description: "Contribuí para o desenvolvimento de interfaces reativas e intuitivas, focando na gestão de estrutura e conteúdo de catálogos, como árvores de categorias, atributos e fichas de produtos.",
				impact: [
					"Aprimoramento das habilidades em programação funcional e UX",
					"Melhoria na usabilidade para operadores de marketplace",
					"Deduplicação de itens e operações massivas"
				],
				tags: ["Clojure", "ClojureScript", "React"]
			},
			{
				title: "Plataforma Imobiliária (fexô)",
				year: "2018-2019",
				description: "Desenvolvimento de uma aplicação mobile e web para anúncio, negociação, compra e venda de imóveis, utilizando ClojureScript, Fulcro e React Native.",
				impact: [
					"Conexão eficiente entre clientes e corretores",
					"Experiência de usuário aprimorada",
					"Ferramenta poderosa para o mercado imobiliário"
				],
				tags: ["ClojureScript", "Fulcro", "React Native"]
			},
			{
				title: "Gateway de Pagamentos",
				year: "2018",
				description: "Colaborei no desenvolvimento de uma aplicação web para um gateway de pagamentos, focada em transações seguras e eficientes, utilizando ClojureScript e Fulcro.",
				impact: [
					"Contribuí para a entrega de uma solução funcional",
					"Primeiro contato com desenvolvimento de software comercial",
					"Experiência inicial em integração de sistemas"
				],
				tags: ["ClojureScript", "Fulcro", "API REST"]
			},
			
		]}
	/>
</div>

<style lang="postcss">
</style>
