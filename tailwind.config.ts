import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {},
		fontFamily: {
			'magazine-display': ['Playfair Display', 'serif'],
			'magazine-body': ['Roboto Serif', 'serif']
		}
	},

	plugins: [require('@tailwindcss/typography')]
} as Config;
