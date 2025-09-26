<script lang="ts">
	export let title: string;
	export let competencies: { title: string; description: string }[];
</script>

<section class="bg-surface-50 dark:bg-surface-800 py-12">
	<div class="mx-auto max-w-6xl px-6">
		<h2 class="h2 mb-8 text-center text-surface-900 dark:text-surface-100">{title}</h2>
		<div class="grid grid-cols-1 justify-around gap-8 md:grid-cols-3">
			{#each competencies as competency}
				<div class="card bg-surface-100 dark:bg-surface-700 border border-surface-300 dark:border-surface-600 flex h-full flex-col p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
					<div class="flex h-full items-center gap-4">
						<svg
							class="h-8 w-8 flex-shrink-0 text-primary-600 dark:text-primary-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
							/>
						</svg>
						<div class="flex flex-grow flex-col">
							<h3 class="h3 mb-2 text-surface-900 dark:text-surface-100">{competency.title}</h3>
							<p class="text-justify text-base text-surface-700 dark:text-surface-200">
								{competency.description}
							</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
