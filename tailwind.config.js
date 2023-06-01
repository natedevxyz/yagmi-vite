/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Work Sans', 'sans-serif'],
				chromate: ['Chromate', 'serif'],
			},
			colors: {
				'yagmi-pink': '#FF97D6',
				'yagmi-blue': '#3030D0',
				'yagmi-yellow': '#FFC501',
				'yagmi-aqua': '#00DEB5',
			},
		},
	},
	plugins: [],
};
