<!-- Página Sobre este Website -->
<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { currentLocale } from '$lib/i18n';
	import ReadmeViewer from '../../components/ReadmeViewer.svelte';

	$: currentLang = $currentLocale || 'pt';
	
	// URLs diferentes para cada idioma do README
	$: readmeUrl = currentLang === 'en' 
		? 'https://raw.githubusercontent.com/patrickcmserrano/svelte-portfolio-blog/skeleton/README.en.md'
		: 'https://raw.githubusercontent.com/patrickcmserrano/svelte-portfolio-blog/skeleton/README.md';

	// Reactive variables with fallbacks
	$: title = $_('aboutSite.title') || 'Sobre este Website';
	$: subtitle = $_('aboutSite.subtitle') || 'Tecnologias e inspiração por trás deste portfolio';
	$: description = $_('aboutSite.description') || 'Saiba mais sobre as tecnologias e ferramentas utilizadas neste portfolio';
	$: viewOnGitHub = $_('aboutSite.viewOnGithub') || 'Ver no GitHub';
	$: repositoryLink = $_('aboutSite.repositoryLink') || 'Repositório GitHub';
	$: techStackTitle = $_('aboutSite.techStack.title') || 'Stack Tecnológica';
	$: inspirationTitle = $_('aboutSite.inspiration.title') || 'Inspiração';
	$: inspirationDesc = $_('aboutSite.inspiration.description') || 'Este site foi criado com foco em performance, acessibilidade e experiência do usuário, utilizando as melhores práticas de desenvolvimento web moderno.';
	$: sourceCodeTitle = $_('aboutSite.sourceCode.title') || 'Código Fonte';
	$: sourceCodeDesc = $_('aboutSite.sourceCode.description') || 'O código deste site está disponível no GitHub. Sinta-se à vontade para explorar, fazer fork ou contribuir!';
</script>

<div class="container mx-auto px-4 py-8">
	<!-- Hero Section -->
	<div class="mb-12 text-center">
		<h1 class="mb-4 text-4xl font-bold">{title}</h1>
		<p class="mx-auto max-w-2xl text-lg text-surface-600 dark:text-surface-300">{subtitle}</p>
		<p class="mx-auto mt-4 max-w-3xl text-surface-700 dark:text-surface-400">{description}</p>
	</div>

	<!-- GitHub Repository Link -->
	<div class="mb-12 flex justify-center">
		<a
			href="https://github.com/patrickcmserrano/svelte-portfolio-blog"
			target="_blank"
			rel="noopener noreferrer"
			class="flex items-center gap-2 rounded-full bg-primary-500 px-6 py-3 text-white shadow-lg transition-colors duration-200 hover:bg-primary-600"
		>
			<!-- GitHub Icon -->
			<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
				<path
					fill-rule="evenodd"
					d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
					clip-rule="evenodd"
				/>
			</svg>
			{viewOnGitHub}
		</a>
	</div>

	<!-- Tech Stack Section -->
	<div class="mb-12">
		<h2 class="mb-8 text-center text-3xl font-bold">{techStackTitle}</h2>
		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			<div class="card bg-surface-100 p-6 dark:bg-surface-800">
				<h3 class="mb-4 text-xl font-semibold">Frontend</h3>
				<ul class="space-y-2 text-surface-700 dark:text-surface-300">
					<li>• SvelteKit</li>
					<li>• TypeScript</li>
					<li>• Svelte-i18n (Internationalization)</li>
					<li>• Marked (Markdown parsing)</li>
				</ul>
			</div>
			<div class="card bg-surface-100 p-6 dark:bg-surface-800">
				<h3 class="mb-4 text-xl font-semibold">{$_('aboutSite.techStack.styling') || 'Styling'}</h3>
				<ul class="space-y-2 text-surface-700 dark:text-surface-300">
					<li>• Tailwind CSS</li>
					<li>• Skeleton UI</li>
					<li>• CSS Custom Properties</li>
					<li>• Dark/Light Theme</li>
				</ul>
			</div>
			<div class="card bg-surface-100 p-6 dark:bg-surface-800">
				<h3 class="mb-4 text-xl font-semibold">{$_('aboutSite.techStack.features') || 'Features'}</h3>
				<ul class="space-y-2 text-surface-700 dark:text-surface-300">
					<li>• Responsive Design</li>
					<li>• Blog System</li>
					<li>• PDF Viewer</li>
					<li>• Music Player</li>
				</ul>
			</div>
		</div>
	</div>

	<!-- Inspiration Section -->
	<div class="mb-12 text-center">
		<h2 class="mb-6 text-3xl font-bold">{inspirationTitle}</h2>
		<div class="card bg-surface-50 p-8 dark:bg-surface-800">
			<p class="mx-auto max-w-4xl text-lg leading-relaxed text-surface-700 dark:text-surface-300">
				{inspirationDesc}
			</p>
		</div>
	</div>

	<!-- Source Code Section -->
	<div class="mb-12 text-center">
		<h2 class="mb-6 text-3xl font-bold">{sourceCodeTitle}</h2>
		<div class="card bg-surface-50 p-8 dark:bg-surface-800">
			<p class="mx-auto mb-6 max-w-4xl text-lg leading-relaxed text-surface-700 dark:text-surface-300">
				{sourceCodeDesc}
			</p>
			<a
				href="https://github.com/patrickcmserrano/svelte-portfolio-blog"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 rounded-lg bg-surface-700 px-4 py-2 text-white transition-colors duration-200 hover:bg-surface-600 dark:bg-surface-600 dark:hover:bg-surface-500"
			>
				<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
					<path
						fill-rule="evenodd"
						d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
						clip-rule="evenodd"
					/>
				</svg>
				{repositoryLink}
			</a>
		</div>
	</div>

	<!-- README Section -->
	<div class="card bg-surface-50 p-8 dark:bg-surface-800">
		<h2 class="mb-6 text-center text-2xl font-bold">README</h2>
		<ReadmeViewer url={readmeUrl} />
	</div>
</div>

<style lang="postcss">
	:global(.prose) {
		@apply mx-auto max-w-4xl;
	}

	:global(.prose pre) {
		@apply overflow-x-auto rounded-lg bg-surface-700 p-4;
	}

	:global(.prose code) {
		@apply rounded bg-surface-700 px-1 py-0.5;
	}

	:global(.prose h1) {
		@apply mb-8 border-b pb-4 text-4xl font-bold;
	}

	:global(.prose h2) {
		@apply mb-6 mt-12 text-3xl font-semibold;
	}

	:global(.prose h3) {
		@apply mb-4 mt-8 text-2xl font-semibold;
	}

	:global(.prose h4) {
		@apply mb-3 mt-6 text-xl font-semibold;
	}

	:global(.prose p) {
		@apply mb-4 leading-relaxed;
	}

	:global(.prose ul) {
		@apply mb-4 list-inside list-disc;
	}

	:global(.prose ol) {
		@apply mb-4 list-inside list-decimal;
	}

	:global(.prose a) {
		@apply text-primary-500 transition-colors duration-200 hover:text-primary-600;
	}

	:global(.prose blockquote) {
		@apply border-l-4 border-primary-500 pl-4 italic;
	}
</style>
