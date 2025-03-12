<script lang="ts">
	export let base: string;
	export let title: string;
	export let description: string;
	export let aboutLinkText: string;
	export let blogLinkText: string;
</script>

<section class="py-20 text-center">
	<h1 class="h1 mb-6">
		{title}
	</h1>
	<p class="mx-auto mb-8 max-w-2xl text-xl">
		{description}
	</p>
	<div class="flex justify-center gap-4">
		<a href="{base}/about" class="variant-filled-secondary btn"> {aboutLinkText} </a>
		<a href="{base}/blog" class="variant-soft-secondary btn"> {blogLinkText} </a>
	</div>
</section>
