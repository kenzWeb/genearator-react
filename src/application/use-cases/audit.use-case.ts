import {readFileAsText} from '../../core/converters'
import type {TestResults} from '../../core/domain/models'
import {mapOutcomesToTestResults} from '../../core/mappers'
import {analysisService, auditService} from '../../lib/api'

interface AuditSession {
	auditId: string
	filename: string
	fileSize: number
	timestamp: string
	testResults?: TestResults
}

export function useAuditAnalysis() {
	const analyzeFile = async (file: File): Promise<AuditSession> => {
		const uploadResponse = await auditService.uploadFile(file)

		const analysisResult = await analysisService.analyzeAudit(
			uploadResponse.audit_id,
			{
				tests: ['frequency', 'runs', 'chi_square'],
			},
		)

		const testResults = mapOutcomesToTestResults(analysisResult.outcomes)

		return {
			auditId: uploadResponse.audit_id,
			filename: uploadResponse.filename,
			fileSize: uploadResponse.file_size,
			timestamp: uploadResponse.created_at,
			testResults,
		}
	}

	return {analyzeFile}
}

export function useFileReader() {
	const readFile = async (file: File): Promise<string> => {
		return readFileAsText(file)
	}

	return {readFile}
}
