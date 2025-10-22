import {motion} from 'framer-motion'
import {useState} from 'react'
import {EntropyVisualizer} from '../components/EntropyVisualizer'
import {TestResultsDisplay} from '../components/TestResultsDisplay'
import {mapEntropyMetricsToSources} from '../core/mappers'
import {useDraw} from '../presentation/hooks'
import {
	DrawForm,
	DrawResults,
	EntropyMetricsDisplay,
	ExportActions,
	ProgressBar,
} from '../presentation/components/draw'
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

	const onGenerateClick = async () => {
		await generateNumbers(numbersCount)
	}

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

			{currentSession && (
				<>
					<ExportActions
						onExportJSON={exportJSON}
						onExportBinary={exportBinary}
					/>

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
