<script lang="ts">
	export let title: string;
	export let projects: {
		title: string;
		year: string;
		description: string;
		impact: string[];
		tags: string[];
	}[];
</script>

<section class="py-16">
	<h2 class="h2 mb-8 text-center">{title}</h2>
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#if projects.length === 0}
			<p>Nenhum projeto encontrado</p>
		{:else}
			{#each projects as project}
				<div class="card flex flex-col rounded-lg bg-surface-800 p-6 shadow-lg">
					<header class="mb-4">
						<h3 class="h2 mb-2">{project.title}</h3>
						<span class="text-sm opacity-70">{project.year}</span>
					</header>
					<section class="flex-grow">
						<p class="dynamic-font mb-4 text-sm">
							{project.description}
						</p>
						<div class="mb-4">
							<h4 class="h4">Impacto:</h4>
							<ul class="list-disc space-y-1 pl-5">
								{#each project.impact as impactItem}
									<li>{impactItem}</li>
								{/each}
							</ul>
						</div>
						<div class="flex flex-wrap gap-2">
							{#each project.tags as tag}
								<span class="variant-filled chip text-xs">{tag}</span>
							{/each}
						</div>
					</section>
				</div>
			{/each}
		{/if}
	</div>
</section>
