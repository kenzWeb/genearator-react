import type {AuditResponse} from '../../../core/domain/models'
import {apiClient} from '../client'

export interface AuditDetail {
	id: string
	filename: string
	file_size: number
	created_at: string
}

export const auditService = {
	async uploadFile(file: File): Promise<AuditResponse> {
		const formData = new FormData()
		formData.append('file', file)

		const {data} = await apiClient.post<AuditResponse>(
			'/api/audit/upload',
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		)
		return data
	},

	async getAudits(): Promise<AuditDetail[]> {
		const {data} = await apiClient.get<AuditDetail[]>('/api/audit/audits')
		return data
	},

	async getAudit(id: string): Promise<AuditDetail> {
		const {data} = await apiClient.get<AuditDetail>(`/api/audit/audits/${id}`)
		return data
	},
}
