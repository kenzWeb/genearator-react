import {apiClient} from '../client'
import type {
	PaginationParams,
	RNGGenerateRequest,
	RNGGenerateResponse,
	RNGRunDetail,
	RNGRunSummary,
} from '../types'

export const rngService = {
	async generate(
		request: RNGGenerateRequest,
		format: 'hex' | 'ints' = 'hex',
	): Promise<RNGGenerateResponse> {
		const {data} = await apiClient.post<RNGGenerateResponse>(
			'/api/rng/generate',
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
		console.log(
			`Запрос экспорта: /api/rng/runs/${id}/export?min_bits=${minBits}`,
		)
		const {data} = await apiClient.get(`/api/rng/runs/${id}/export`, {
			params: {min_bits: minBits},
			responseType: 'blob',
		})
		console.log('Ответ от API получен, размер:', data.size)
		return data
	},
}
