import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import fs from 'fs';
import path from 'path';

// Read the posts.json file to get the list of post IDs
const postsFile = path.resolve('./static/posts.json');
const posts = JSON.parse(fs.readFileSync(postsFile, 'utf-8'));
const postIds = posts.map(post => `/blog/${post.id}`);

// Read the flashcards manifest to get deck IDs
const flashcardsManifest = path.resolve('./static/flashcards/manifest.json');
const flashcardsData = JSON.parse(fs.readFileSync(flashcardsManifest, 'utf-8'));
const flashcardIds = flashcardsData.decks.map(deck => `/flashcards/${deck.id}`);

/** @type {import('@sveltejs/kit').Config} */
const config = {
    extensions: ['.svelte'],
    preprocess: [vitePreprocess()],
    vitePlugin: {
        inspector: true
    },
    kit: {
        adapter: adapter({
            pages: 'build',
            assets: 'build',
            fallback: '404.html',
            precompress: false,
            strict: true
        }),
        paths: {
            base: '/portfolio-blog'
        },
        serviceWorker: {
            register: false
        },
        prerender: {
            handleHttpError: 'warn',
            entries: [
                '*', // Prerender all static routes
                ...postIds, // Add dynamic /blog/[id] routes
                ...flashcardIds // Add dynamic /flashcards/[deckId] routes
            ]
        }
    }
};

export default config;