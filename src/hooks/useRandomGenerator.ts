import {useCallback, useMemo, useState} from 'react'
import {HybridRNG} from '../services/HybridRNG'
import {StatisticalTestService} from '../services/StatisticalTestService'
import {VerificationService} from '../services/VerificationService'
import type {
	DrawSession,
	EntropySource,
	RandomSequence,
	TestResults,
	VisualizationState,
} from '../types'

export const useRandomGenerator = () => {
	const [visualizationState, setVisualizationState] =
		useState<VisualizationState>({
			stage: 'idle',
			progress: 0,
		})
	const [currentSession, setCurrentSession] = useState<DrawSession | null>(null)
	const [isGenerating, setIsGenerating] = useState(false)

	const rng = useMemo(() => new HybridRNG(), [])
	const testService = useMemo(() => new StatisticalTestService(), [])
	const verificationService = useMemo(() => new VerificationService(), [])

	const generateDraw = useCallback(
		async (count: number = 6): Promise<DrawSession> => {
			setIsGenerating(true)
			setVisualizationState({stage: 'collecting', progress: 0})

			const entropyData = await rng.collectEntropy((source: EntropySource) => {
				setVisualizationState((prev) => ({
					stage: 'collecting',
					progress: prev.progress + 25,
					currentSource: source.name,
				}))
			})

			setVisualizationState({stage: 'processing', progress: 100})
			await new Promise((resolve) => setTimeout(resolve, 500))

			const numbers = rng.generateRandomNumbers(count)
			const binaryData = rng.generateBinarySequence(10000)

			const sequenceId = `draw-${Date.now()}`
			const timestamp = Date.now()

			const tempSequence: RandomSequence = {
				id: sequenceId,
				timestamp,
				numbers,
				binaryData,
				hash: '',
				entropyData,
			}

			const hash = await verificationService.createSequenceHash(tempSequence)
			const sequence: RandomSequence = {...tempSequence, hash}

			setVisualizationState({stage: 'testing', progress: 0})

			const testResults = await new Promise<TestResults>((resolve) => {
				setTimeout(() => {
					const results = testService.runAllTests(binaryData)
					setVisualizationState({stage: 'testing', progress: 100})
					resolve(results)
				}, 1000)
			})

			setVisualizationState({stage: 'complete', progress: 100})

			const session: DrawSession = {
				id: sequenceId,
				timestamp,
				sequence,
				testResults,
				verified: true,
			}

			setCurrentSession(session)
			setIsGenerating(false)
			rng.reset()

			return session
		},
		[rng, testService, verificationService],
	)

	const analyzeExternalSequence = useCallback(
		async (binaryData: number[]): Promise<TestResults> => {
			setVisualizationState({stage: 'testing', progress: 0})

			const results = await new Promise<TestResults>((resolve) => {
				setTimeout(() => {
					const testResults = testService.runAllTests(binaryData)
					setVisualizationState({stage: 'testing', progress: 100})
					resolve(testResults)
				}, 1500)
			})

			setVisualizationState({stage: 'complete', progress: 100})
			return results
		},
		[testService],
	)

	const resetGenerator = useCallback(() => {
		rng.reset()
		setVisualizationState({stage: 'idle', progress: 0})
		setCurrentSession(null)
		setIsGenerating(false)
	}, [rng])

	return {
		visualizationState,
		currentSession,
		isGenerating,
		generateDraw,
		analyzeExternalSequence,
		resetGenerator,
		verificationService,
		rng,
	}
}
