import {API_CONFIG} from '../../../config/app.config'
import {apiClient} from '../client'

export interface AnalysisRequest {
	tests?: string[]
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

export const analysisService = {
	async getTests(): Promise<string[]> {
		const {data} = await apiClient.get<string[]>('/api/analysis/tests')
		return data
	},

	async analyzeRun(
		runId: string,
		request: AnalysisRequest = {},
	): Promise<RunAnalysisResponse> {
		const {data} = await apiClient.post<RunAnalysisResponse>(
			API_CONFIG.ENDPOINTS.ANALYSIS_RUN(runId),
			request,
		)
		return data
	},

	async analyzeAudit(
		auditId: string,
		request: AnalysisRequest = {},
	): Promise<AuditAnalysisResponse> {
		const {data} = await apiClient.post<AuditAnalysisResponse>(
			`/api/analysis/audits/${auditId}`,
			request,
		)
		return data
	},
}
