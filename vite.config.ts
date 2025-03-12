import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), purgeCss()],
	define: {
		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
	}
});
