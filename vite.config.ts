<<<<<<< HEAD
import { purgeCss } from 'vite-plugin-tailwind-purgecss';
=======
import tailwindcss from '@tailwindcss/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
>>>>>>> c641080cdcae894032dc594ea8ee2a8e0f10db97
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
<<<<<<< HEAD
	plugins: [sveltekit(), purgeCss()]
});
=======
	plugins: [sveltekit(), tailwindcss()],

	test: {
		workspace: [
			{
				extends: './vite.config.ts',
				plugins: [svelteTesting()],

				test: {
					name: 'client',
					environment: 'jsdom',
					clearMocks: true,
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**'],
					setupFiles: ['./vitest-setup-client.ts']
				}
			},
			{
				extends: './vite.config.ts',

				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
>>>>>>> c641080cdcae894032dc594ea8ee2a8e0f10db97
