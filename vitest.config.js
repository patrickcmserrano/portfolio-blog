// filepath: c:\dev\portifolio-blog\skeleton-portifolio-blog\vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'jsdom'
	}
});
