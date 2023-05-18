/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				chromate: ['Chromate', 'serif'],
				work: ['Work Sans', 'sans-serif'],
			},
			colors: {
				neutral: '#F5F5F5',
				primary: '#FF6F61',
				accent: '#00A4FF',
			},
		},
	},
	plugins: [],
};
