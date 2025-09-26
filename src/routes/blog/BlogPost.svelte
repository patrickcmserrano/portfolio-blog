<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import { getLanguageIndicator } from '$lib/i18n/postLoader';
	
	export let post;
	let languageIndicator = '';

	// Reactive variables with fallbacks
	$: readingTime = $_('blog.readingTime') || 'de leitura';
	$: readMore = $_('general.readMore') || 'Ler mais';

	onMount(async () => {
		if (post.availableLanguages && post.availableLanguages.length > 1) {
			languageIndicator = getLanguageIndicator(post.availableLanguages);
		}
	});
</script>

<div class="blog-card variant-filled-surface">
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
				{#if languageIndicator}
					<span class="language-flags ml-2" title="Available languages">{languageIndicator}</span>
				{/if}
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
			<span>{post.readTime} {readingTime}</span>
		</div>
		<p class="mb-4">
			{post.excerpt}
		</p>
		<a
			href={`${base}/blog/${post.id}`}
			class="anchor inline-flex items-center text-tertiary-500 hover:text-tertiary-600"
		>
			{readMore}
			<svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</a>
	</section>
</div>
