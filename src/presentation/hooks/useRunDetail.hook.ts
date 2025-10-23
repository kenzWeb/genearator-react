import {useEffect, useState} from 'react'
import type {TestResults} from '../../core/domain/models'
import {mapOutcomesToTestResults} from '../../core/mappers/test.mapper'
import {analysisService} from '../../lib/api/services/analysis.service'
import {rngService, type RNGRunDetail} from '../../lib/api/services/rng.service'

interface UseRunDetailReturn {
	run: RNGRunDetail | null
	testResults: TestResults | null
	isLoading: boolean
	error: string | null
	exportRun: () => Promise<void>
}

export const useRunDetail = (runId: string | undefined): UseRunDetailReturn => {
	const [run, setRun] = useState<RNGRunDetail | null>(null)
	const [testResults, setTestResults] = useState<TestResults | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!runId) return

		const loadRunDetails = async () => {
			try {
				setIsLoading(true)
				setError(null)

				const runData = await rngService.getRun(runId)
				setRun(runData)

				try {
					const analysisResult = await analysisService.analyzeRun(runId, {
						tests: ['frequency', 'runs', 'chi_square'],
					})
					setTestResults(mapOutcomesToTestResults(analysisResult.outcomes))
				} catch (err) {
					console.warn('Анализ недоступен для этого тиража:', err)
				}
			} catch (err) {
				console.error('Ошибка загрузки тиража:', err)
				setError('Не удалось загрузить информацию о тираже')
			} finally {
				setIsLoading(false)
			}
		}

		loadRunDetails()
	}, [runId])

	const exportRun = async () => {
		if (!runId) return
		try {
			const blob = await rngService.exportRun(runId, 1000000)
			const url = URL.createObjectURL(blob)
			const a = document.createElement('a')
			a.href = url
			a.download = `run-${runId}.txt`
			a.click()
			URL.revokeObjectURL(url)
		} catch (err) {
			console.error('Ошибка экспорта:', err)
		}
	}

	return {
		run,
		testResults,
		isLoading,
		error,
		exportRun,
	}
}
