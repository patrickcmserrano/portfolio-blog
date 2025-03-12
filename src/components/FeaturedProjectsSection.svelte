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
	<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#if projects.length === 0}
			<p>Nenhum projeto encontrado</p>
		{:else}
			{#each projects as project}
				<div class="card variant-filled-surface h-full">
					<header class="card-header flex items-center justify-between p-6">
						<h3 class="h3">{project.title}</h3>
						<span class="text-sm opacity-70">{project.year}</span>
					</header>
					<section class="flex h-[calc(100%-5rem)] flex-col p-6">
						<p class="mb-4 flex-grow">
							{project.description}
						</p>
						<div class="space-y-4">
							<h4 class="font-semibold">Impacto:</h4>
							<ul class="mb-4 list-disc pl-5">
								{#each project.impact as impactItem}
									<li>{impactItem}</li>
								{/each}
							</ul>
							<div class="flex flex-wrap gap-2">
								{#each project.tags as tag}
									<span class="variant-filled chip">{tag}</span>
								{/each}
							</div>
						</div>
					</section>
				</div>
			{/each}
		{/if}
	</div>
</section>
