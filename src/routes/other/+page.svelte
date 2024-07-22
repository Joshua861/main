<script>
	import SvelteMarkdown from 'svelte-markdown';

	let links = [
		// {
		// 	title: 'Rank',
		// 	description:
		// 		'This was meant to be somewhere where people could rank things. Basically AB testing for the best [x] thing. All you can actually rank is colors though.',
		// 	link: 'https://rank.joshrl.dev/',
		// 	source_code: 'https://github.com/Joshua861/rank'
		// },
		// {
		// 	title: 'Post timeline',
		// 	description:
		// 		'Basically Mastadon, but without all of the features, and people... but at least its easy to impersonate someone.',
		// 	link: 'https://post.joshrl.dev/',
		// 	source_code: 'https://github.com/Joshua861/post-timeline'
		// },
		{
			title: 'Placeholders',
			description:
				'Placeholder images. Basically just a clone of [placehold](https://placehold.co/).',
			link: 'https://ph.joshrl.dev/',
			source_code: 'https://github.com/Joshua861/placeholder'
		},
		{
			title: 'Timetable',
			description:
				"Semi-functional timetable app using classcharts api. Problem is: there isn't an official classcharts API, so it's really hard to parse.",
			link: 'https://timetable.joshrl.dev/',
			source_code: 'https://github.com/Joshua861/classcharts'
		},
		{
			title: 'Old notes',
			description: "It's like the offline notes site, but old and not very good. :(",
			link: 'https://old-notes.joshrl.dev/notes',
			source_code: 'https://github.com/Joshua861/notes'
		}
	];
</script>

<div class="h-full min-h-[100vh] w-full min-w-[100vw] bg-bg_h pt-3">
	<div class="mx-auto max-w-screen-lg px-4 font-mono text-fg2">
		<a class="text-fg0" href="/"> &lt;- Back </a>
		<br /><br />
		<p class="text-lg">
			Why are you here? These are the bad ones that even <em>I</em> don't think are good!
		</p>

		<br />
		<br />

		<div class="columns-1 sm:columns-2 md:columns-3">
			{#each links as link}
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
			{/each}
		</div>

		<br />
		<a href="https://github.com/Joshua861/main" class="link">Source code</a> |
		<a href="mailto:joshrl@proton.me" class="link">Contact me</a> (if you want to)
	</div>
</div>

<style>
	.avoid-break {
		break-inside: avoid;
	}
</style>
