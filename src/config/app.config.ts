export const API_CONFIG = {
	BASE_URL:
		import.meta.env.VITE_API_URL ||
		import.meta.env.VITE_API_BASE_URL ||
		'http://localhost:8000',

	TIMEOUT: 30000,

	ENDPOINTS: {
		RNG_GENERATE: '/api/rng/generate',
		RNG_EXPORT: (runId: string, minBits: number) =>
			`/api/rng/runs/${runId}/export?min_bits=${minBits}`,
		ANALYSIS_RUN: (runId: string) => `/api/analysis/runs/${runId}`,
	},
} as const

export const COMPETITION_REQUIREMENTS = {
	MIN_BITS_FOR_VALIDATION: 1000000,

	ENTROPY_SOURCES: [
		'Wire Hum Analysis (~60 Hz)',
		'Lorenz Attractor (Chaotic System)',
		'Spectral Analysis (Algorithmic)',
	] as const,

	CRYPTO_ALGORITHM: 'ChaCha20 Stream Cipher (RFC 8439)',

	REQUIRED_TESTS: [
		'frequency',
		'runs',
		'chi_square',
		'serial_correlation',
	] as const,

	SCENARIOS_COUNT: 3,

	USE_RANDOM_SEED: true,
} as const

export const DEMO_CONFIG = {
	DEFAULT_COUNT: 6,

	DEFAULT_MAX: 49,

	DEMO_EXPORT_BITS: 1000000,
} as const

export const ENV = {
	IS_DEV: import.meta.env.DEV,

	IS_PROD: import.meta.env.PROD,

	DEBUG: import.meta.env.VITE_DEBUG === 'true',
} as const
