export interface EntropyParameters {
	duration_ms?: number
	hum_amplitude?: number
	noise_amplitude?: number
	spike_density?: number
	spike_amplitude?: number
}

export interface EntropyMetrics {
	snr_db: number
	spectral_deviation_percent: number
	lyapunov_exponent: number
}

export interface EntropyMixRequest {
	noise_seed?: number | null
	parameters: EntropyParameters
}

export interface EntropyMixResponse {
	simulation_id: string
	seed_hex: string
	metrics: EntropyMetrics
}

export interface EntropySimulationSummary {
	id: string
	created_at: string
	updated_at: string
	noise_seed?: number
	metrics: EntropyMetrics
	seed_hex: string
}

export interface ChaosRun {
	lyapunov_exponent: number
	checksum: string
}

export interface EntropySimulationDetail extends EntropySimulationSummary {
	noise_config: EntropyParameters
	pool_hash: string
	chaos_checksum: string
	noise_raw_path?: string
	chaos_raw_path?: string
	chaos_run: ChaosRun
}

export interface RNGGenerateRequest {
	length: number
	noise_seed?: number | null
	parameters?: EntropyParameters
}

export interface RNGGenerateResponse {
	run_id: string
	format: 'hex' | 'ints'
	data: string | number[]
	entropy_metrics: EntropyMetrics
}

export interface RNGRunSummary {
	id: string
	simulation_id: string
	format: 'hex' | 'ints'
	length: number
	metrics: EntropyMetrics
	seed_hash: string
	export_path?: string
	created_at: string
	updated_at: string
}

export interface TestReport {
	name: string
	passed: boolean
	statistic: number
	threshold?: number
	details?: Record<string, unknown>
}

export interface RNGRunDetail extends RNGRunSummary {
	run_checksum: string
	test_reports: TestReport[]
}

export interface AuditSequenceRequest {
	name: string
	description?: string
	data: string
}

export interface AuditSequenceResponse {
	audit_id: string
	status: 'stored'
}

export interface AnalysisRequest {
	tests?: string[] | null
}

export interface TestOutcomeView {
	name: string
	passed: boolean
	statistic: number
	threshold?: number
	details?: Record<string, unknown>
}

export interface RunAnalysisResponse {
	run_id: string
	export_path?: string
	outcomes: TestOutcomeView[]
}

export interface AuditAnalysisResponse {
	audit_id: string
	data_hash: string
	outcomes: TestOutcomeView[]
}

export interface PaginationParams {
	limit?: number
	offset?: number
}

export interface APIError {
	detail: string | Record<string, unknown>
}
