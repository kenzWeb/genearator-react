import {useCallback, useState} from 'react'
import {useRandomGenerator} from '../../hooks/useRandomGenerator'
import type {TestResults} from '../../types'

export const useAuditAnalyzer = () => {
	const {analyzeExternalSequence, verificationService} = useRandomGenerator()
	const [isAnalyzing, setIsAnalyzing] = useState(false)
	const [fileName, setFileName] = useState('')
	const [testResults, setTestResults] = useState<TestResults | null>(null)

	const handleFileUpload = useCallback(
		async (file: File) => {
			setFileName(file.name)
			setIsAnalyzing(true)
			try {
				const binaryData = await verificationService.parseBinaryFile(file)
				if (binaryData.length < 100) {
					throw new Error('Файл должен содержать минимум 100 битов')
				}
				const results = await analyzeExternalSequence(binaryData)
				setTestResults(results)
			} finally {
				setIsAnalyzing(false)
			}
		},
		[analyzeExternalSequence, verificationService],
	)

	return {
		isAnalyzing,
		fileName,
		testResults,
		setTestResults,
		setFileName,
		handleFileUpload,
	}
}
