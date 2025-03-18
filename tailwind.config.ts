import { join } from 'path';
import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';

export default {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,svelte,ts}', // Escaneia os arquivos do seu projeto
    join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}'), // Escaneia os arquivos do Skeleton Labs
  ],
  theme: {
    extend: {},
  },
  plugins: [
    typography,
    skeleton({
      themes: {
        preset: [
          {
            name: 'wintry',
            enhancements: true,
          },
          {
            name: 'skeleton',
            enhancements: true,
          },
        ],
      },
    }),
  ],
} satisfies Config;