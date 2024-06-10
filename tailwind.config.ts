import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {},
		fontFamily: {
			'magazine-display': ['Playfair Display', 'serif'],
			'magazine-body': ['Roboto Serif', 'serif'],
			mono: [
				'JetBrains Mono',
				'ui-monospace',
				'SFMono-Regular',
				'Menlo',
				'Monaco',
				'Consolas',
				'Liberation Mono',
				'Courier New',
				'monospace'
			]
		},
		colors: {
			bg_h: '#1d2021',
			bg: '#282828',
			bg_s: '#32302f',
			bg1: '#3c3836',
			bg2: '#504945',
			bg3: '#665c54',
			bg4: '#7c6f64',

			fg0: '#fbf1c7',
			fg1: '#ebdbb2',
			fg2: '#d5c4a1',
			fg3: '#bdae93',
			fg4: '#a89984',

			red: '#cc241d',
			green: '#98971a',
			yellow: '#d79921',
			blue: '#458588',
			purple: '#b16286',
			aqua: '#689d6a',
			orange: '#d65d0e',
			gray: '#a89984',

			redDim: '#fb4934',
			greenDim: '#b8bb26',
			yellowDim: '#fabd2f',
			blueDim: '#83a598',
			purpleDim: '#d3869b',
			aquaDim: '#8ec07c',
			orangeDim: '#fe8019',
			grayDim: '#928374'
		}
	},

	plugins: [require('@tailwindcss/typography')]
} as Config;
