export const RNG_CONSTANTS = {
	MIN_BYTES_FOR_EXPORT: 125000,

	MIN_BITS_FOR_EXPORT: 1000000,

	MAX_NUMBER_VALUE: 1000000,

	MIN_NUMBER_VALUE: 1,

	MIN_NUMBERS_COUNT: 1,

	MAX_NUMBERS_COUNT: 1000000,

	NUMBER_SIZE_BYTES: 4,

	HEX_CHUNK_LENGTH: 8,
} as const

export const ENTROPY_CONSTANTS = {
	WIRE_HUM_FREQUENCY: 60,

	DEFAULT_DURATION_MS: 250,

	DEFAULT_NOISE_AMPLITUDE: 0.7,

	DEFAULT_SPIKE_DENSITY: 0.05,
} as const

export const TEST_CONSTANTS = {
	P_VALUE_THRESHOLD: 0.01,

	MAIN_TESTS: ['frequency', 'runs', 'chi_square'] as const,

	ALL_TESTS: ['frequency', 'runs', 'chi_square', 'serial_correlation'] as const,

	MIN_TEST_BITS: 100,
} as const

export const VISUALIZATION_CONSTANTS = {
	WAVEFORM_BARS_COUNT: 40,

	ANIMATION_DELAY_MS: 100,

	BASE_ANIMATION_DURATION: 600,
} as const

export const FILE_FORMATS = {
	JSON: 'application/json',

	TEXT: 'text/plain',

	BINARY: 'application/octet-stream',
} as const

export const PROGRESS_STAGES = {
	IDLE: 'idle',
	GENERATING: 'generating',
	ANALYZING: 'analyzing',
} as const

export type ProgressStage =
	(typeof PROGRESS_STAGES)[keyof typeof PROGRESS_STAGES]

export const TEST_RESULTS = {
	PASSED: 'passed',
	FAILED: 'failed',
	PENDING: 'pending',
} as const

export type TestResult = (typeof TEST_RESULTS)[keyof typeof TEST_RESULTS]
