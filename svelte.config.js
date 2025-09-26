import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import fs from 'fs';
import path from 'path';

// Read the posts.json file to get the list of post IDs
const postsFile = path.resolve('./static/posts.json');
const posts = JSON.parse(fs.readFileSync(postsFile, 'utf-8'));
const postIds = posts.map(post => `/blog/${post.id}`);

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
                ...postIds // Add dynamic /blog/[id] routes
            ]
        }
    }
};

export default config;