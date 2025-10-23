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
		const text = await file.text()
		const cleanedSequence = text.replace(/\s+/g, '')

		console.log('📁 File upload details:')
		console.log(`  - Name: ${file.name}`)
		console.log(`  - Size: ${file.size} bytes`)
		console.log(`  - Cleaned length: ${cleanedSequence.length} chars`)
		console.log(`  - First 100 chars: ${cleanedSequence.slice(0, 100)}`)

		let hexData: string
		let detectedFormat = 'unknown'

		if (/^[01]+$/.test(cleanedSequence)) {
			detectedFormat = 'binary'
			hexData = ''
			for (let i = 0; i < cleanedSequence.length; i += 4) {
				const chunk = cleanedSequence.slice(i, i + 4).padEnd(4, '0')
				hexData += parseInt(chunk, 2).toString(16)
			}
			console.log(`  ✅ Detected BINARY format (converting to HEX)`)
		} else if (/^[0-9a-fA-F]+$/.test(cleanedSequence)) {
			detectedFormat = 'hex'
			hexData = cleanedSequence.toLowerCase()
			console.log(`  ✅ Detected HEX format (using as-is)`)
		} else {
			throw new Error(
				'Файл должен содержать только символы 0 и 1 (Binary), либо 0-9, A-F (HEX)',
			)
		}

		if (hexData.length < 25) {
			throw new Error(
				'Последовательность должна содержать минимум 100 битов (25 HEX символов)',
			)
		}

		console.log(`✅ Detected format: ${detectedFormat}`)
		console.log(`✅ HEX length: ${hexData.length} chars`)
		console.log(`✅ HEX preview: ${hexData.slice(0, 100)}...`)

		const {data} = await apiClient.post<AuditResponse>('/api/audit/upload', {
			name: file.name,
			description: `External audit file: ${file.name} (${detectedFormat})`,
			data: hexData,
		})
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
