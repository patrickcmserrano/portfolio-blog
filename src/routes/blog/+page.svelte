<script lang="ts">
	import { base } from '$app/paths';
	import BlogPost from './BlogPost.svelte';

	const posts = [
		{
			id: 'engenharia-de-requisitos',
			title: 'Engenharia de Requisitos',
			excerpt: 'Explorando os fundamentos e práticas essenciais da engenharia de requisitos.',
			date: '2024-03-08',
			readTime: '10 min',
			tags: ['Requisitos', 'Engenharia', 'Software']
		}
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
