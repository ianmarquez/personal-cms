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
		fontFamily: {
			mono: ['JetBrains Mono', 'monospace']
		},
		extend: {
			animation: {
				typewriter: 'typewriter 2s steps(12) forwards',
				caret: 'typewriter 2s steps(12) forwards, blink 1s steps(12) infinite 2s'
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
