import {useState} from 'react'
import toast from 'react-hot-toast'
import {useAuditAnalysis} from '../../application/use-cases/audit.use-case'
import type {TestResults} from '../../core/domain/models'

interface UseAuditReturn {
	isAnalyzing: boolean
	fileName: string
	testResults: TestResults | null
	error: string | null
	handleFileUpload: (file: File) => Promise<void>
	reset: () => void
}

export const useAudit = (): UseAuditReturn => {
	const [isAnalyzing, setIsAnalyzing] = useState(false)
	const [fileName, setFileName] = useState<string>('')
	const [testResults, setTestResults] = useState<TestResults | null>(null)
	const [error, setError] = useState<string | null>(null)

	const {analyzeFile} = useAuditAnalysis()

	const handleFileUpload = async (file: File): Promise<void> => {
		try {
			setIsAnalyzing(true)
			setFileName(file.name)
			setError(null)

			const session = await analyzeFile(file)

			setTestResults(session.testResults || null)

			toast.success('Анализ завершен! Результаты готовы.', {
				duration: 5000,
			})
		} catch (err) {
			console.error('Ошибка анализа:', err)
			setTestResults(null)

			if (err instanceof Error) {
				setError(err.message)
			} else if (typeof err === 'object' && err !== null && 'response' in err) {
				const axiosError = err as {response?: {data?: {detail?: string}}}
				setError(
					axiosError.response?.data?.detail ||
						'Не удалось проанализировать файл. Проверьте формат данных.',
				)
			} else {
				setError('Произошла неизвестная ошибка при анализе файла')
			}
		} finally {
			setIsAnalyzing(false)
		}
	}

	const reset = (): void => {
		setFileName('')
		setTestResults(null)
		setIsAnalyzing(false)
		setError(null)
	}

	return {
		isAnalyzing,
		fileName,
		testResults,
		error,
		handleFileUpload,
		reset,
	}
}
