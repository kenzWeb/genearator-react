import {useState} from 'react'
import {useAuditAnalysis} from '../../application/use-cases/audit.use-case'
import type {TestResults} from '../../core/domain/models'

interface UseAuditReturn {
	isAnalyzing: boolean
	fileName: string
	testResults: TestResults | null
	handleFileUpload: (file: File) => Promise<void>
	reset: () => void
}

export const useAudit = (): UseAuditReturn => {
	const [isAnalyzing, setIsAnalyzing] = useState(false)
	const [fileName, setFileName] = useState<string>('')
	const [testResults, setTestResults] = useState<TestResults | null>(null)

	const {analyzeFile} = useAuditAnalysis()

	const handleFileUpload = async (file: File): Promise<void> => {
		try {
			setIsAnalyzing(true)
			setFileName(file.name)

			const session = await analyzeFile(file)

			setTestResults(session.testResults || null)
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
