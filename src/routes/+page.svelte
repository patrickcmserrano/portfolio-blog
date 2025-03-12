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
				title: "Motor de Pagamentos",
				year: "2023",
				description: "Refatoração completa do sistema de processamento de pagamentos utilizando arquitetura Polylith, melhorando a modularidade, testabilidade e manutenibilidade do código.",
				impact: [
					"Redução de 40% no tempo de desenvolvimento",
					"Cobertura de testes aumentada para 85%",
					"Melhor isolamento de componentes"
				],
				tags: ["Clojure", "Polylith", "TDD"]
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
			}
		]}
	/>
</div>

<style lang="postcss">
</style>
