import {useState} from 'react'
import {
	analysisService,
	rngService,
	type EntropyMetrics,
	type TestOutcomeView,
} from '../api'
import {
	downloadBlob,
	downloadJSON,
	parseNumbersFromHex,
} from '../utils/dataConverters'

interface DrawSession {
	runId: string
	numbers: number[]
	timestamp: string
	entropyMetrics: EntropyMetrics
	testResults?: TestOutcomeView[]
	rawData?: string
}

interface UseDrawReturn {
	isGenerating: boolean
	currentSession: DrawSession | null
	progress: number
	stage: 'idle' | 'generating' | 'analyzing'
	generateNumbers: (count: number) => Promise<void>
	exportJSON: () => void
	exportBinary: () => Promise<void>
	reset: () => void
}

export const useDraw = (): UseDrawReturn => {
	const [isGenerating, setIsGenerating] = useState(false)
	const [currentSession, setCurrentSession] = useState<DrawSession | null>(null)
	const [progress, setProgress] = useState(0)
	const [stage, setStage] = useState<'idle' | 'generating' | 'analyzing'>(
		'idle',
	)

	const generateNumbers = async (count: number): Promise<void> => {
		try {
			setIsGenerating(true)
			setStage('generating')
			setProgress(10)

			const minBytesForExport = 125000 
			const bytesNeeded = Math.max(count * 4, minBytesForExport)

			console.log(
				`Генерация: ${bytesNeeded} байт (${
					bytesNeeded * 8
				} битов) для ${count} чисел + экспорт`,
			)

			const response = await rngService.generate(
				{
					length: bytesNeeded,
					parameters: {
						duration_ms: 250,
						noise_amplitude: 0.7,
						spike_density: 0.05,
					},
				},
				'hex',
			)

			setProgress(60)

			const numbers = parseNumbersFromHex(response.data as string, count)

			setProgress(80)
			setStage('analyzing')

			const analysisResult = await analysisService.analyzeRun(response.run_id, {
				tests: ['frequency', 'runs', 'chi_square'],
			})

			setProgress(100)

			setCurrentSession({
				runId: response.run_id,
				numbers,
				timestamp: new Date().toISOString(),
				entropyMetrics: response.entropy_metrics,
				testResults: analysisResult.outcomes,
				rawData: response.data as string,
			})

			setStage('idle')
			setProgress(0)
		} catch (error) {
			console.error('Ошибка генерации:', error)
			setStage('idle')
			setProgress(0)
			throw error
		} finally {
			setIsGenerating(false)
		}
	}

	const exportJSON = (): void => {
		if (!currentSession) return

		const exportData = {
			runId: currentSession.runId,
			timestamp: currentSession.timestamp,
			numbers: currentSession.numbers,
			entropyMetrics: currentSession.entropyMetrics,
			testResults: currentSession.testResults,
		}

		downloadJSON(exportData, `draw-${currentSession.runId}.json`)
	}

	const exportBinary = async (): Promise<void> => {
		if (!currentSession) {
			console.error('Нет активной сессии для экспорта')
			return
		}

		try {
			console.log('Начало экспорта для run_id:', currentSession.runId)
			const blob = await rngService.exportRun(currentSession.runId, 1000000)
			console.log('Получен blob:', blob.size, 'bytes, type:', blob.type)

			if (blob.size === 0) {
				throw new Error('Получен пустой файл от API')
			}

			downloadBlob(blob, `sequence-${currentSession.runId}.txt`)
			console.log('Экспорт завершён успешно')
		} catch (error: unknown) {
			console.error('Ошибка экспорта бинарных данных:', error)

			// Обработка специфичной ошибки от API
			if (error && typeof error === 'object' && 'response' in error) {
				const axiosError = error as {
					response?: {
						data?: {
							detail?: {
								error?: string
								available_bits?: number
								required_bits?: number
							}
						}
					}
				}
				const detail = axiosError.response?.data?.detail
				if (detail?.error && detail.available_bits && detail.required_bits) {
					alert(
						`Недостаточно данных для экспорта!\n\n` +
							`Доступно: ${detail.available_bits} бит\n` +
							`Требуется: ${detail.required_bits} бит\n\n` +
							`Пожалуйста, сгенерируйте новый тираж.`,
					)
					return
				}
			}

			alert(
				'Ошибка при экспорте: ' +
					(error instanceof Error ? error.message : String(error)),
			)
			throw error
		}
	}

	const reset = (): void => {
		setCurrentSession(null)
		setProgress(0)
		setStage('idle')
		setIsGenerating(false)
	}

	return {
		isGenerating,
		currentSession,
		progress,
		stage,
		generateNumbers,
		exportJSON,
		exportBinary,
		reset,
	}
}
