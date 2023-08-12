const daisyui = require('daisyui');
const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	daisyui: {
		themes: ['light', 'dark', 'synthwave', 'dracula']
	},
	theme: {
		extend: {}
	},
	plugins: [forms, typography, daisyui]
};

module.exports = config;
