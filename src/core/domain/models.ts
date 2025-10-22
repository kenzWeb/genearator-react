export interface EntropySource {
	name: string
	type: 'physical' | 'algorithmic' | 'hybrid'
	collected: number
	quality: number
}

export interface RandomSequence {
	id: string
	timestamp: number
	numbers: number[]
	binaryData: number[]
	hash: string
	entropyData: EntropyData
}

export interface EntropyData {
	sources: EntropySource[]
	totalEntropy: number
	collectionTime: number
}

export interface StatisticalTest {
	name: string
	result: 'passed' | 'failed' | 'pending'
	pValue: number
	threshold: number
	description: string
}

export interface TestResults {
	frequencyTest: StatisticalTest
	runsTest: StatisticalTest
	chiSquareTest: StatisticalTest
	serialCorrelationTest: StatisticalTest
	overall: 'passed' | 'failed' | 'pending'
}

export interface DrawSession {
	id: string
	timestamp: number
	sequence: RandomSequence
	testResults: TestResults
	verified: boolean
}

export interface VisualizationState {
	stage: 'idle' | 'collecting' | 'processing' | 'testing' | 'complete'
	progress: number
	currentSource?: string
}

export interface EntropyMetrics {
	snr: number
	lyapunov: number
	spectralDeviation: number
	snr_db: number
	lyapunov_exponent: number
	spectral_deviation_percent: number
}

export interface GenerationRequest {
	count: number
	max?: number
	duration?: number
	noise_amplitude?: number
	spike_density?: number
	noise_seed?: number | null
}

export interface GenerationResponse {
	run_id: string
	data: string
	test_results?: TestResults
}

export interface ExportRequest {
	runId: string
	minBits: number
}

export interface AnalysisRequest {
	runId: string
}

export interface AuditRequest {
	file: File
}

export interface AuditResponse {
	audit_id: string
	filename: string
	file_size: number
	created_at: string
}
