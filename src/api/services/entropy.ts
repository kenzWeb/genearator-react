import {apiClient} from '../client'
import type {
	EntropyMixRequest,
	EntropyMixResponse,
	EntropySimulationDetail,
	EntropySimulationSummary,
	PaginationParams,
} from '../types'

export const entropyService = {
	async mix(request: EntropyMixRequest): Promise<EntropyMixResponse> {
		const {data} = await apiClient.post<EntropyMixResponse>(
			'/api/entropy/mix',
			request,
		)
		return data
	},

	async getSimulations(
		params: PaginationParams = {},
	): Promise<EntropySimulationSummary[]> {
		const {data} = await apiClient.get<EntropySimulationSummary[]>(
			'/api/entropy/simulations',
			{params},
		)
		return data
	},

	async getSimulation(id: string): Promise<EntropySimulationDetail> {
		const {data} = await apiClient.get<EntropySimulationDetail>(
			`/api/entropy/simulations/${id}`,
		)
		return data
	},
}
