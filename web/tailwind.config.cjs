const daisyui = require('daisyui');
const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	daisyui: {
		themes: ['winter', 'dracula']
	},
	theme: {
		extend: {
			animation: {
				typewriter: 'typewriter 4s steps(29) forwards',
				caret: 'typewriter 4s steps(29) forwards, blink 1s steps(29) infinite 4s'
			},
			keyframes: {
				typewriter: {
					to: {
						left: '100%'
					}
				},
				blink: {
					'0%': {
						opacity: '0'
					},
					'0.1%': {
						opacity: '1'
					},
					'50%': {
						opacity: '1'
					},
					'50.1%': {
						opacity: '0'
					},
					'100%': {
						opacity: '0'
					}
				}
			}
		}
	},
	plugins: [forms, typography, daisyui]
};

module.exports = config;
