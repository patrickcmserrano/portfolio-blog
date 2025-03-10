<script lang="ts">
	import { base } from '$app/paths';

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
				<div class="card variant-filled-surface">
					<section class="p-6">
						<div class="mb-4 flex flex-wrap gap-2">
							{#each post.tags as tag}
								<span class="variant-filled chip">{tag}</span>
							{/each}
						</div>
						<h2 class="h2 mb-2">
							<a
								href={`${base}/blog/${post.id}`}
								class="anchor transition-colors duration-200 hover:text-tertiary-500"
							>
								{post.title}
							</a>
						</h2>
						<div class="mb-4 flex items-center text-sm opacity-70">
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
							href={`${base}/blog/${post.id}`}
							class="anchor inline-flex items-center text-tertiary-500 hover:text-tertiary-600"
						>
							Ler mais
							<svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
