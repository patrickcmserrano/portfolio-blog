<script lang="ts">
	import { _ } from 'svelte-i18n';

	$: title = $_('about.education.title') || 'Formação Acadêmica';
	$: academicFormationTitle = $_('about.education.academicFormation') || 'Formação Acadêmica';
	$: softwareEngineering = $_('about.education.softwareEngineering') || 'Engenharia de Software';
	$: computerScience = $_('about.education.computerScience') || 'Bacharelado em Ciência da Computação';
	$: physics = $_('about.education.physics') || 'Bacharelado em Física';
	$: incomplete = $_('about.education.incomplete') || 'Incompleto';
	$: physicsNote = $_('about.education.physicsNote') || 'Incompleto, focado em desenvolvimento de software para o laboratório de informação quântica.';
	$: present = $_('general.present') || 'presente';
</script>

<section class="py-16">
	<h2 class="h2 mb-12 text-center text-surface-900 dark:text-surface-100">{title}</h2>
	<div class="mx-auto max-w-3xl space-y-8">
		<div class="card bg-surface-100 dark:bg-surface-700 border border-surface-300 dark:border-surface-600 p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
			<h3 class="h3 mb-4 text-surface-900 dark:text-surface-100">{academicFormationTitle}</h3>
			<div class="space-y-4">
				<div>
					<h4 class="font-semibold text-surface-900 dark:text-surface-100">{softwareEngineering}</h4>
					<p class="text-surface-700 dark:text-surface-200">Faculdade Descomplica • 2024 - {present}</p>
				</div>
				<div>
					<h4 class="font-semibold text-surface-900 dark:text-surface-100">{computerScience}</h4>
					<p class="text-surface-700 dark:text-surface-200">Universidade Federal Fluminense • 2022 - 2023</p>
					<p class="text-sm text-surface-600 dark:text-surface-300">{incomplete}</p>
				</div>
				<div>
					<h4 class="font-semibold text-surface-900 dark:text-surface-100">{physics}</h4>
					<p class="text-surface-700 dark:text-surface-200">Universidade Federal Fluminense • 2015-2018</p>
					<p class="text-sm text-surface-600 dark:text-surface-300">
						{physicsNote}
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
