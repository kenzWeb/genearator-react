import {apiClient} from '../client'
import type {
	AnalysisRequest,
	AuditAnalysisResponse,
	RunAnalysisResponse,
} from '../types'

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
			`/api/analysis/runs/${runId}`,
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
