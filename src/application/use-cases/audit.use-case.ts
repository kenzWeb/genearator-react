import {readFileAsText} from '../../core/converters'
import {
	analysisService,
	auditService,
	type AuditAnalysisResponse,
} from '../../lib/api'

interface AuditSession {
	auditId: string
	filename: string
	fileSize: number
	timestamp: string
	testResults?: AuditAnalysisResponse['test_results']
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

		return {
			auditId: uploadResponse.audit_id,
			filename: uploadResponse.filename,
			fileSize: uploadResponse.file_size,
			timestamp: uploadResponse.created_at,
			testResults: analysisResult.test_results,
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
