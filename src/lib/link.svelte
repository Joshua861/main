<script>
	import SvelteMarkdown from 'svelte-markdown';

	export let link;
</script>

<div class="avoid-break">
	<div class="[&>*]:!text-mono mb-4 h-fit border-2 border-bg2 p-3 hover:border-green">
		<strong class="text-fg0">
			{link.title}
		</strong>
		<SvelteMarkdown source={link.description} />
		<br />
		<div>
			<a href={link.link} class="link">Check it out!</a>
			{#if link.source_code}
				|
				<a href={link.source_code} class="link">Source code</a>
			{/if}
		</div>
	</div>
</div>
