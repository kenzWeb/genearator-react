/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: {
					bg: '#0D1117',
					card: '#161B22',
					border: '#222831',
				},
				accent: {
					cyan: '#00BFFF',
					mint: '#4BFFB4',
				},
				status: {
					warning: '#FFD166',
					error: '#FF4D4D',
				},
				text: {
					primary: '#E6EDF3',
					secondary: '#9BA7B4',
				},
			},
			borderRadius: {
				card: '1.25rem',
			},
			boxShadow: {
				glow: '0 0 20px rgba(0, 191, 255, 0.3)',
				'glow-mint': '0 0 20px rgba(75, 255, 180, 0.3)',
				glass: '0 8px 32px rgba(0, 0, 0, 0.3)',
			},
			backdropBlur: {
				glass: '10px',
			},
			spacing: {
				card: '1.5rem',
			},
		},
	},
	plugins: [],
}
