import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: [['babel-plugin-react-compiler']],
			},
		}),
		tailwindcss(),
	],
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (!id.includes('node_modules')) return null
					if (id.includes('react-router-dom')) return 'router'
					if (id.includes('recharts')) return 'charts'
					if (id.includes('framer-motion')) return 'motion'
					if (id.includes('react')) return 'react'
					return null
				},
			},
		},
		chunkSizeWarningLimit: 900,
	},
})
