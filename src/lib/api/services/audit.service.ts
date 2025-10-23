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

		let binarySequence: string
		let detectedFormat = 'unknown'

		if (/^[01]+$/.test(cleanedSequence)) {
			detectedFormat = 'binary'
			binarySequence = cleanedSequence
			console.log(`  ✅ Detected BINARY format (using as-is)`)
		} else if (/^[0-9a-fA-F]+$/.test(cleanedSequence)) {
			detectedFormat = 'hex'
			binarySequence = cleanedSequence
				.split('')
				.map((char) => {
					const num = parseInt(char, 16)
					return num.toString(2).padStart(4, '0')
				})
				.join('')
			console.log(`  ✅ Detected HEX format (converting to binary)`)
		} else {
			throw new Error(
				'Файл должен содержать только символы 0 и 1 (Binary), либо 0-9, A-F (HEX)',
			)
		}

		if (binarySequence.length < 100) {
			throw new Error('Последовательность должна содержать минимум 100 битов')
		}

		console.log(`✅ Detected format: ${detectedFormat}`)
		console.log(`✅ Binary length: ${binarySequence.length} bits`)
		console.log(`✅ Binary preview: ${binarySequence.slice(0, 100)}...`)

		const {data} = await apiClient.post<AuditResponse>('/api/audit/upload', {
			name: file.name,
			description: `External audit file: ${file.name} (${detectedFormat})`,
			data: binarySequence,
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
