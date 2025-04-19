<script lang="ts">
    import { base } from '$app/paths';
    import BlogPost from './BlogPost.svelte';
    import { onMount } from 'svelte';

    interface Post {
        id: string;
        title: string;
        excerpt: string;
        date: string;
        readTime: string;
        tags: string[];
        videoId?: string | null;
    }

    let posts: Post[] = [];
    let postsByTag: { [key: string]: Post[] } = {};
    let sortedTags: string[] = [];
    let error: string | null = null;

    async function loadPosts() {
        try {
            console.log('Tentando carregar posts de:', `${base}/posts.json`);
            const response = await fetch(`${base}/posts.json`);
            if (!response.ok) {
                throw new Error(`Falha ao carregar posts: ${response.status} ${response.statusText}`);
            }
            posts = await response.json();
            organizePosts();
        } catch (err) {
            console.error('Erro ao carregar posts:', err);
            error = `Não foi possível carregar os posts. Verifique se o arquivo posts.json está no diretório static e acessível em ${base}/posts.json.`;
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

<div class="container mx-auto space-y-16 px-4 min-h-screen text-gray-100">
    <!-- Blog Hero Section -->
    <section class="py-20 text-center">
        <h1 class="h1 mb-6 text-white">Blog</h1>
        <p class="mx-auto max-w-2xl text-xl text-gray-300">
            Um espaço para aprender e trocar ideias sobre tecnologia, mercados financeiros e práticas de desenvolvimento.
        </p>
    </section>

    <!-- Blog Posts -->
    <section class="mx-auto max-w-5xl">
        {#if error}
            <p class="text-center text-red-400">{error}</p>
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
            <p class="text-center text-gray-300">Carregando posts...</p>
        {/if}
    </section>
</div>

<style>
    :global(.card) {
        background-color: #1e3a8a;
        border-radius: 0.5rem;
        overflow: hidden;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    :global(.card > section) {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    :global(.card h2) {
        font-size: 1.5rem;
        font-weight: 600;
        color: #ffffff;
    }
    :global(.card p) {
        color: #d1d5db;
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