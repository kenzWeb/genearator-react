import {API_CONFIG} from '../../../config/app.config'
import type {
	GenerationRequest,
	GenerationResponse,
} from '../../../core/domain/models'
import {apiClient} from '../client'

export interface RNGRunSummary {
	id: string
	created_at: string
	count: number
	max: number
	duration: number
}

export interface RNGRunDetail extends RNGRunSummary {
	data?: string
	entropy_metrics?: {
		snr: number
		lyapunov: number
		spectral_deviation: number
	}
}

export interface PaginationParams {
	page?: number
	per_page?: number
}

export const rngService = {
	async generate(
		request: GenerationRequest,
		format: 'hex' | 'ints' = 'hex',
	): Promise<GenerationResponse> {
		const {data} = await apiClient.post<GenerationResponse>(
			API_CONFIG.ENDPOINTS.RNG_GENERATE,
			request,
			{params: {format}},
		)
		return data
	},

	async getRuns(params: PaginationParams = {}): Promise<RNGRunSummary[]> {
		const {data} = await apiClient.get<RNGRunSummary[]>('/api/rng/runs', {
			params,
		})
		return data
	},

	async getRun(id: string): Promise<RNGRunDetail> {
		const {data} = await apiClient.get<RNGRunDetail>(`/api/rng/runs/${id}`)
		return data
	},

	async exportRun(id: string, minBits: number = 1000000): Promise<Blob> {
		const {data} = await apiClient.get(
			API_CONFIG.ENDPOINTS.RNG_EXPORT(id, minBits),
			{
				responseType: 'blob',
			},
		)
		return data
	},
}
