<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { base } from '$app/paths';
    import BlogPost from './BlogPost.svelte';
    import { onMount } from 'svelte';
    import { loadPostsMetadata, type PostMetadata } from '$lib/i18n/postLoader';

    let posts: PostMetadata[] = [];
    let postsByTag: { [key: string]: PostMetadata[] } = {};
    let sortedTags: string[] = [];
    let error: string | null = null;

    // Reactive variables with fallbacks
    $: title = $_('blog.title') || 'Blog';
    $: description = $_('blog.description') || 'Um espaço para aprender e trocar ideias sobre tecnologia, mercados financeiros e práticas de desenvolvimento.';
    $: loading = $_('general.loading') || 'Carregando...';
    $: errorMessage = error ? `${$_('general.error') || 'Erro'}: ${error}` : null;

    async function loadPosts() {
        try {
            console.log('Carregando posts com sistema de i18n...');
            posts = await loadPostsMetadata();
            organizePosts();
        } catch (err) {
            console.error('Erro ao carregar posts:', err);
            error = `Não foi possível carregar os posts. Erro: ${err instanceof Error ? err.message : 'Erro desconhecido'}`;
        }
    }

    function organizePosts() {
        postsByTag = {};
        posts.forEach(post => {
            const firstTag = post.tags[0];
            if (!postsByTag[firstTag]) {
                postsByTag[firstTag] = [];
            }
            postsByTag[firstTag].push(post);
        });

        for (const tag in postsByTag) {
            postsByTag[tag].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }

        sortedTags = Object.keys(postsByTag).sort();
    }

    onMount(() => {
        loadPosts();
    });
</script>

<div class="blog-page container mx-auto space-y-16 px-4 min-h-screen text-gray-100">
    <!-- Blog Hero Section -->
    <section class="pt-20 text-center">
        <h1 class="h1 mb-6 text-white">{title}</h1>
        <p class="mx-auto max-w-2xl text-xl text-gray-300">
            {description}
        </p>
    </section>

    <!-- Blog Posts -->
    <section class="mx-auto max-w-5xl">
        {#if errorMessage}
            <p class="text-center text-red-400">{errorMessage}</p>
        {:else if sortedTags.length > 0}
            {#each sortedTags as tag}
                <h2 class="h2 mt-12 mb-6 text-white">{tag} ({postsByTag[tag].length})</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                    {#each postsByTag[tag] as post}
                        <BlogPost {post} />
                    {/each}
                </div>
            {/each}
        {:else}
            <p class="text-center text-gray-300">{loading}</p>
        {/if}
    </section>
</div>

<style>
    /* Estilos específicos para cards do blog - aplicados globalmente apenas nesta página */
    :global(.blog-page .blog-card) {
        border-radius: 0.5rem;
        overflow: hidden;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    
    :global(.blog-page .blog-card > section) {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    
    :global(.chip) {
        display: inline-block;
        padding: 0.2rem 0.6rem;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 500;
        background-color: #4b5563;
        color: #f3f4f6;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
        line-height: 1.2;
    }
    
    :global(.anchor) {
        color: #a78bfa;
        text-decoration: none;
        transition: color 0.2s ease-in-out;
    }
    
    :global(.anchor:hover) {
        color: #c4b5fd;
    }
</style>