import {motion} from 'framer-motion'
import {useEffect, useRef, useState} from 'react'
import {EntropyVisualizer} from '../components/EntropyVisualizer'
import {TestResultsDisplay} from '../components/TestResultsDisplay'
import {mapEntropyMetricsToSources} from '../core/mappers'
import {
	DrawForm,
	DrawResults,
	EntropyCollection,
	EntropyMetricsDisplay,
	ExportActions,
	ProgressBar,
} from '../presentation/components/draw'
import {useDraw} from '../presentation/hooks'
import s from './DrawPage.module.css'

export const DrawPage = () => {
	const [numbersCount, setNumbersCount] = useState(6)
	const {
		isGenerating,
		currentSession,
		progress,
		stage,
		generateNumbers,
		exportJSON,
		exportBinary,
	} = useDraw()

	const [showVisualization, setShowVisualization] = useState(false)
	const vizTimeoutRef = useRef<number | null>(null)

	const visualActive =
		(isGenerating && stage === 'generating') || showVisualization

	const onGenerateClick = async () => {
		setShowVisualization(true)
		if (vizTimeoutRef.current) {
			clearTimeout(vizTimeoutRef.current)
		}

		await generateNumbers(numbersCount)

		vizTimeoutRef.current = window.setTimeout(() => {
			setShowVisualization(false)
			vizTimeoutRef.current = null
		}, 8000)
	}

	useEffect(() => {
		return () => {
			if (vizTimeoutRef.current) clearTimeout(vizTimeoutRef.current)
		}
	}, [])

	return (
		<div className={s.page}>
			<motion.div
				initial={{opacity: 0, y: -20}}
				animate={{opacity: 1, y: 0}}
				className={s.center}
			>
				<h2 className={s.title}>Проведение лотерейного тиража</h2>
				<p className={s.subtitle}>
					Генерация криптографически стойких случайных чисел через RandomTrust
					API с использованием нестандартных источников энтропии и
					автоматической статистической верификацией
				</p>
			</motion.div>
			<DrawForm
				numbersCount={numbersCount}
				isGenerating={isGenerating}
				onNumbersCountChange={setNumbersCount}
				onGenerate={onGenerateClick}
			/>
			<ProgressBar stage={stage} progress={progress} />

			{visualActive && (
				<EntropyCollection
					sources={mapEntropyMetricsToSources(
						currentSession?.entropyMetrics ?? {
							snr: 25,
							lyapunov: 1.5,
							spectralDeviation: 45,
							snr_db: 25,
							lyapunov_exponent: 1.5,
							spectral_deviation_percent: 45,
						},
					)}
					isCollecting={isGenerating && stage === 'generating'}
					metrics={
						currentSession?.entropyMetrics ?? {
							snr: 25,
							lyapunov: 1.5,
							spectralDeviation: 45,
							snr_db: 25,
							lyapunov_exponent: 1.5,
							spectral_deviation_percent: 45,
						}
					}
				/>
			)}
			{currentSession && (
				<>
					<ExportActions
						onExportJSON={exportJSON}
						onExportBinary={exportBinary}
					/>

					<button
						className={s.vizToggle}
						onClick={() => {
							if (vizTimeoutRef.current) {
								clearTimeout(vizTimeoutRef.current)
								vizTimeoutRef.current = null
							}
							setShowVisualization((v) => !v)
						}}
					>
						{showVisualization
							? 'Скрыть визуализацию'
							: 'Показать визуализацию'}
					</button>

					<DrawResults
						numbers={currentSession.numbers}
						runId={currentSession.runId}
						timestamp={currentSession.timestamp}
					/>

					<EntropyMetricsDisplay
						metrics={currentSession.entropyMetrics}
						testsPassed={currentSession.testResults?.overall === 'passed'}
					/>

					<EntropyVisualizer
						sources={mapEntropyMetricsToSources(currentSession.entropyMetrics)}
						isCollecting={false}
					/>

					{currentSession.testResults && (
						<TestResultsDisplay results={currentSession.testResults} />
					)}
				</>
			)}
		</div>
	)
}
