import {useState} from 'react'
import {
	useDrawExport,
	useDrawGeneration,
} from '../../application/use-cases/draw.use-case'
import type {EntropyMetrics, TestResults} from '../../core/domain/models'

interface DrawSession {
	runId: string
	numbers: number[]
	timestamp: string
	entropyMetrics: EntropyMetrics
	testResults?: TestResults
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

	const {generateNumbers: generate} = useDrawGeneration()
	const {exportJSON: exportJ, exportBinary: exportB} =
		useDrawExport(currentSession)

	const generateNumbers = async (count: number): Promise<void> => {
		try {
			setIsGenerating(true)
			setStage('generating')
			setProgress(10)

			await new Promise((resolve) => setTimeout(resolve, 2500))
			setProgress(30)

			const session = await generate(count)

			setProgress(60)

			await new Promise((resolve) => setTimeout(resolve, 800))
			setStage('analyzing')
			setProgress(80)

			await new Promise((resolve) => setTimeout(resolve, 1200))

			setCurrentSession(session)
			setProgress(100)

			await new Promise((resolve) => setTimeout(resolve, 500))
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
		exportJ()
	}

	const exportBinary = async (): Promise<void> => {
		try {
			await exportB()
		} catch (error) {
			console.error('Ошибка экспорта:', error)
			throw error
		}
	}

	const reset = (): void => {
		setCurrentSession(null)
		setProgress(0)
		setStage('idle')
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
