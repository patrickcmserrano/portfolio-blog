<script lang="ts">
	import { base } from '$app/paths';
	import BlogPost from './BlogPost.svelte';

	const posts = [
		{
			id: 'comparacao-clojure-golang',
			title: 'Comparação entre Clojure e Golang',
			excerpt: 'Uma análise detalhada das diferenças e semelhanças entre Clojure e Golang.',
			date: '2024-03-13',
			readTime: '14 min',
			tags: ['Clojure', 'Golang', 'Comparação']
		},
		{
			id: 'pilhas',
			title: 'Pilhas: Uma Estrutura de Dados Fundamental na Programação',
			excerpt: 'Entenda o que são pilhas, suas operações básicas e como implementá-las em Java.',
			date: '2024-03-09',
			readTime: '8 min',
			tags: ['Estruturas de Dados', 'Programação', 'Java']
		},
		{
			id: 'listas-ligadas',
			title: 'Listas Ligadas: Um Guia Completo sobre Estruturas de Dados Dinâmicas',
			excerpt: 'Aprenda sobre listas ligadas, suas operações e como implementá-las em Java.',
			date: '2024-03-10',
			readTime: '12 min',
			tags: ['Estruturas de Dados', 'Programação', 'Java']
		},
		{
			id: 'filas',
			title: 'Estrutura de Dados Fila: Um Guia Completo com Exemplo Prático',
			excerpt: 'Explore o conceito de filas, suas operações e como implementá-las em Java.',
			date: '2024-03-11',
			readTime: '10 min',
			tags: ['Estruturas de Dados', 'Programação', 'Java']
		},
		{
			id: 'estruturas-de-dados',
			title: 'Estruturas de Dados: O Guia Essencial para Estudantes e Entrevistas Técnicas',
			excerpt: 'Um resumo focado nas principais estruturas de dados e suas operações.',
			date: '2024-03-12',
			readTime: '15 min',
			tags: ['Estruturas de Dados', 'Entrevistas', 'Programação']
		},
		{
			id: 'engenharia-de-requisitos',
			title: 'Engenharia de Requisitos',
			excerpt: 'Explorando os fundamentos e práticas essenciais da engenharia de requisitos.',
			date: '2024-03-08',
			readTime: '10 min',
			tags: ['Requisitos', 'Engenharia', 'Software']
		},
		
	];
</script>

<div class="container mx-auto space-y-16 px-4">
	<!-- Blog Hero Section -->
	<section class="py-20 text-center">
		<h1 class="h1 mb-6">Blog</h1>
		<p class="mx-auto max-w-2xl text-xl">
			Compartilhando conhecimentos e experiências sobre desenvolvimento Clojure, arquitetura de
			software e boas práticas.
		</p>
	</section>

	<!-- Blog Posts -->
	<section class="mx-auto max-w-4xl">
		<div class="space-y-8">
			{#each posts as post}
				<BlogPost {post} />
			{/each}
		</div>
	</section>
</div>
