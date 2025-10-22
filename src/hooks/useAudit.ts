import {useState} from 'react'
import {analysisService, auditService, type TestOutcomeView} from '../api'
import {binaryToHex, readFileAsText} from '../utils/dataConverters'

interface UseAuditReturn {
	isAnalyzing: boolean
	fileName: string
	testResults: TestOutcomeView[] | null
	handleFileUpload: (file: File) => Promise<void>
	reset: () => void
}

export const useAudit = (): UseAuditReturn => {
	const [isAnalyzing, setIsAnalyzing] = useState(false)
	const [fileName, setFileName] = useState<string>('')
	const [testResults, setTestResults] = useState<TestOutcomeView[] | null>(null)

	const handleFileUpload = async (file: File): Promise<void> => {
		try {
			setIsAnalyzing(true)
			setFileName(file.name)

			const text = await readFileAsText(file)
			const hexData = binaryToHex(text.trim())

			const uploadResponse = await auditService.upload({
				name: file.name,
				description: `Uploaded at ${new Date().toISOString()}`,
				data: hexData,
			})

			const analysisResult = await analysisService.analyzeAudit(
				uploadResponse.audit_id,
				{
					tests: ['frequency', 'runs', 'chi_square'],
				},
			)

			setTestResults(analysisResult.outcomes)
		} catch (error) {
			console.error('Ошибка анализа:', error)
			setTestResults(null)
			throw error
		} finally {
			setIsAnalyzing(false)
		}
	}

	const reset = (): void => {
		setFileName('')
		setTestResults(null)
		setIsAnalyzing(false)
	}

	return {
		isAnalyzing,
		fileName,
		testResults,
		handleFileUpload,
		reset,
	}
}
