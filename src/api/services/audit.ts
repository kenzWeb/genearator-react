import {apiClient} from '../client'
import type {AuditSequenceRequest, AuditSequenceResponse} from '../types'

export const auditService = {
	async upload(request: AuditSequenceRequest): Promise<AuditSequenceResponse> {
		const {data} = await apiClient.post<AuditSequenceResponse>(
			'/api/audit/upload',
			request,
		)
		return data
	},
}
