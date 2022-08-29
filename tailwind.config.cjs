/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			'sans': ['Ubuntu', 'sans-serif'],
			'serif': ['Merriweather', 'serif'],
			'cursive': ['Goldman', 'curisve']
		},
		extend: {
			colors: { 
                primary: colors.orange,
                secondary : colors.purple,
                gray : colors.stone,
                danger: colors.red,
                success: colors.emerald,
                warning: colors.amber,
            },
			keyframes: {
				wavepulse: {
					'0%, 100%': { 'background-position-y': '0%;' },
					'50%': { 'background-position-y': '80%;' },
				}
			},
			animation: {
				wavepulse : 'wavepulse 4s ease-in-out infinite',
			}
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/line-clamp'),	
	],
}
