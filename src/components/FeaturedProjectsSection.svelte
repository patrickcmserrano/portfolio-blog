<script lang="ts">
	export let title: string;
	export let projects: {
		title: string,
		year: string,
		description: string,
		impact: string[],
		tags: string[]
	}[];
</script>

<section class="py-16">
	<h2 class="h2 mb-8 text-center">{title}</h2>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#if projects.length === 0}
			<p>Nenhum projeto encontrado</p>
		{:else}
			{#each projects as project}
				<div class="card p-6 bg-surface-800 rounded-lg shadow-lg flex flex-col">
					<header class="mb-4">
						<h3 class="h2 mb-2">{project.title}</h3>
						<span class="text-sm opacity-70">{project.year}</span>
					</header>
					<section class="flex-grow">
						<p class="mb-4 text-sm dynamic-font">
							{project.description}
						</p>
						<div class="mb-4">
							<h4 class="h4">Impacto:</h4>
							<ul class="list-disc pl-5 space-y-1">
								{#each project.impact as impactItem}
									<li>{impactItem}</li>
								{/each}
							</ul>
						</div>
						<div class="flex flex-wrap gap-2">
							{#each project.tags as tag}
								<span class="chip variant-filled text-xs">{tag}</span>
							{/each}
						</div>
					</section>
				</div>
			{/each}
		{/if}
	</div>
</section>