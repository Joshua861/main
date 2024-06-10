<script>
	import SvelteMarkdown from 'svelte-markdown';

	let links = [
		{
			title: 'Wordle',
			description:
				'A Wordle clone I made for fun, and it actually works pretty well, which is unusual considering I made it. Fun fact, since all state is stored as svelte stores in local storage, if you open the page on two windows, whenever you type or press something on one window, it updates on both windows. You can share your games with your friends, and challenge them to try the same words as you, and, best of all, you can play it as many times as you want!',
			link: 'https://words.joshrl.dev/',
			source_code: 'https://github.com/Joshua861/wordle'
		},
		{
			title: 'Lights out',
			description:
				"Lights out game I made... for fun. It's much more basic than the Wordle one for sure, but it's pretty fun nonetheless.",
			link: 'https://lights.joshrl.dev/',
			source_code: 'https://github.com/Joshua861/lights'
		},
		{
			title: 'Particles',
			description:
				'Like powder toy, but it crashes all the time, and it has less stuff, but it was made by me.',
			link: 'https://github.com/Joshua861/particles'
		},
		{
			title: 'Games',
			description:
				'A few simple games recreated by yours truly. Pretty bad tbh. I was planning to spend _much_ longer on that, but I got bored. The only actually good thing on there is the [four in a row](https://games.joshrl.dev/four).',
			link: 'https://games.joshrl.dev/',
			source_code: 'https://github.com/Joshua861/games'
		},
		{
			title: 'Hacker News reader',
			description:
				"The design was inspired by (hckrnws)[https://www.hckrnws.com/top/1]. It works pretty well, but the way it fetches comments isn't very good, so the first comment often takes a while to load (it's fetching all the replies).",
			link: 'https://hn.joshrl.dev/best',
			source_code: 'https://github.com/Joshua861/hn'
		},
		{
			title: 'Offline notes',
			description:
				'A fully offline notes app with many a feature, including customisation, and other things I forgot also.',
			link: 'https://notes.joshrl.dev/',
			source_code: 'https://github.com/Joshua861/notes-app-v2'
		},
		{
			title: 'Online notes',
			description:
				"My first project with a database! Your notes sync between devices, you can share notes with friends and colaborate on them (don't expect anything on the same level as Google docs though, I'm trying my best), you can publish notes for all to see and comment on posts.",
			link: 'https://fb.joshrl.dev/',
			source_code: 'https://github.com/Joshua861/online-notes'
		},
		{
			title: 'Blog',
			description:
				"I wouldn't really call it a blog, just a place for me to put text, but I didn't know what else to call it, so here we are. Not much on there yet but I think it's pretty well made.",
			link: 'https://blog.joshrl.dev/',
			source_code: 'https://github.com/Joshua861/blog-svelte'
		},
		{
			title: 'Party Games',
			description:
				"Who's ready to party? You? Ok well this probably isn't for you. I don't know why I called it party games, I mean, it's mostly all games you can play with friends, but I can't imagine anyone playing this in a party.",
			link: 'https://party.joshrl.dev/',
			source_code: 'https://github.com/Joshua861/party-games'
		},
		{
			title: 'Link lengthener',
			description:
				"This ones kinda ass tbh. It was really low effort, and for some reason I used a database to store the ID's and the corresponding link, instead of doing the obvious and just encoding the real url in the long url. The reason I made this and not a link shortening site is that it has to be something.joshrl.dev, so it wouldn't ever be very short.",
			link: 'https://long.joshrl.dev',
			source_code: 'https://github.com/Joshua861/url-lengthener'
		}
	];
</script>

<div class="h-full min-h-[100vh] w-full min-w-[100vw] bg-bg_h pt-3">
	<div class="mx-auto max-w-screen-lg px-4 font-mono text-fg2">
		<br />
		<p class="text-lg">
			Hey! I'm Lily. I know the url says "joshrl", but I changed my name since then. I'm a
			prog(r)a(m)mer, who makes websites and rust stuff for fun. Anywhoozle, here's some of the
			stuff I've made:
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
		<a href="/other" class="link">Other projects that I don't like as much</a> |
		<a href="https://github.com/Joshua861/main" class="link">Source code</a> |
		<a href="mailto:joshrl@proton.me" class="link">Contact me</a> (if you want to)
		<br /><br />
	</div>
</div>

<style>
	.avoid-break {
		break-inside: avoid;
	}
</style>
