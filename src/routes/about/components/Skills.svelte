<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<section class="py-16">
	<h2 class="h2 mb-12 text-center">{$_('skills.title')}</h2>
	<div class="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
		<!-- Languages & Core -->
		<div class="card bg-surface-100 dark:bg-surface-700 border border-surface-300 dark:border-surface-600 p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
			<h3 class="h3 mb-4 text-surface-900 dark:text-surface-100">{$_('skills.languages')}</h3>
			<ul class="space-y-2 text-surface-700 dark:text-surface-200">
				<li>Clojure / ClojureScript</li>
				<li>Java</li>
				<li>JavaScript / TypeScript</li>
				<li>Golang</li>
				<li>Python</li>
			</ul>
		</div>

		<!-- Frameworks & Libraries -->
		<div class="card bg-surface-100 dark:bg-surface-700 border border-surface-300 dark:border-surface-600 p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
			<h3 class="h3 mb-4 text-surface-900 dark:text-surface-100">{$_('skills.frameworks')}</h3>
			<ul class="space-y-2 text-surface-700 dark:text-surface-200">
				<li>Polylith / Reitit / Pathom</li>
				<li>Fulcro / Fulcro-RAD</li>
				<li>React / React Native</li>
				<li>Reagent / Re-frame</li>
				<li>Svelte</li>
				<li>Malli / Datomic</li>
			</ul>
		</div>

		<!-- Infrastructure & Tools -->
		<div class="card bg-surface-100 dark:bg-surface-700 border border-surface-300 dark:border-surface-600 p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
			<h3 class="h3 mb-4 text-surface-900 dark:text-surface-100">{$_('skills.cloud')}</h3>
			<ul class="space-y-2 text-surface-700 dark:text-surface-200">
				<li>AWS / Cognito</li>
				<li>Docker / Kubernetes</li>
				<li>RabbitMQ / Kafka</li>
				<li>Elastic Stack</li>
				<li>Prometheus / Grafana</li>
			</ul>
		</div>
	</div>
</section>
