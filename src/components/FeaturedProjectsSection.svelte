<script lang="ts">
	import { _ } from 'svelte-i18n';

	export let title: string;
	export let projects: {
		title: string;
		year: string;
		description: string;
		impact: string[];
		tags: string[];
	}[];

	// Reactive variables with fallbacks
	$: noProjectsText = $_('projects.noProjects') || 'Nenhum projeto encontrado';
	$: impactText = $_('projects.impact') || 'Impacto:';
</script>

<section class="py-16">
	<h2 class="h2 mb-8 text-center text-surface-900 dark:text-surface-100">{title}</h2>
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#if projects.length === 0}
			<p class="text-surface-700 dark:text-surface-200">{noProjectsText}</p>
		{:else}
			{#each projects as project}
				<div class="card flex flex-col rounded-lg bg-surface-100 dark:bg-surface-700 border border-surface-300 dark:border-surface-600 p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 h-full">
					<header class="mb-4">
						<h3 class="h2 mb-2 text-surface-900 dark:text-surface-100">{project.title}</h3>
						<span class="text-sm text-surface-600 dark:text-surface-300">{project.year}</span>
					</header>
					<section class="flex-grow">
						<p class="dynamic-font mb-4 text-sm text-surface-700 dark:text-surface-200">
							{project.description}
						</p>
						<div class="mb-4">
							<h4 class="h4 text-surface-900 dark:text-surface-100">{impactText}</h4>
							<ul class="list-disc space-y-1 pl-5 text-surface-700 dark:text-surface-200">
								{#each project.impact as impactItem}
									<li>{impactItem}</li>
								{/each}
							</ul>
						</div>
					</section>
					<div class="flex flex-wrap gap-2 mt-auto pt-4">
						{#each project.tags as tag}
							<span class="bg-primary-500 text-white px-2 py-1 rounded-full text-xs">{tag}</span>
						{/each}
					</div>
				</div>
			{/each}
		{/if}
	</div>
</section>
