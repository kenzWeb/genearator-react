import {motion} from 'framer-motion'
import {useState} from 'react'
import {
	analysisService,
	rngService,
	type EntropyMetrics,
	type TestOutcomeView,
} from '../api'
import {EntropyVisualizer} from '../components/EntropyVisualizer'
import {TestResultsDisplay} from '../components/TestResultsDisplay'
import s from './DrawPage.module.css'

interface DrawSession {
	runId: string
	numbers: number[]
	timestamp: string
	entropyMetrics: EntropyMetrics
	testResults?: TestOutcomeView[]
	rawData?: string
}

export const DrawPage = () => {
	const [numbersCount, setNumbersCount] = useState(6)
	const [isGenerating, setIsGenerating] = useState(false)
	const [currentSession, setCurrentSession] = useState<DrawSession | null>(null)
	const [progress, setProgress] = useState(0)
	const [stage, setStage] = useState<'idle' | 'generating' | 'analyzing'>(
		'idle',
	)

	const onGenerateClick = async () => {
		try {
			setIsGenerating(true)
			setStage('generating')
			setProgress(10)

			const bytesNeeded = numbersCount * 4
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

			const numbers = parseNumbersFromHex(response.data as string, numbersCount)

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
		} finally {
			setIsGenerating(false)
		}
	}

	const parseNumbersFromHex = (hex: string, count: number): number[] => {
		const numbers: number[] = []
		for (let i = 0; i < count; i++) {
			const chunk = hex.slice(i * 8, (i + 1) * 8)
			const num = (parseInt(chunk, 16) % 50) + 1
			numbers.push(num)
		}
		return numbers
	}

	const handleExport = () => {
		if (!currentSession) return

		const exportData = {
			runId: currentSession.runId,
			timestamp: currentSession.timestamp,
			numbers: currentSession.numbers,
			entropyMetrics: currentSession.entropyMetrics,
			testResults: currentSession.testResults,
		}

		const blob = new Blob([JSON.stringify(exportData, null, 2)], {
			type: 'application/json',
		})
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = `draw-${currentSession.runId}.json`
		a.click()
		URL.revokeObjectURL(url)
	}

	const handleExportBinary = async () => {
		if (!currentSession) return

		try {
			const blob = await rngService.exportRun(currentSession.runId, 1000000)
			const url = URL.createObjectURL(blob)
			const a = document.createElement('a')
			a.href = url
			a.download = `sequence-${currentSession.runId}.txt`
			a.click()
			URL.revokeObjectURL(url)
		} catch (error) {
			console.error('Ошибка экспорта:', error)
		}
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
					Генерация случайных чисел с использованием гибридного источника
					энтропии и автоматической верификацией качества
				</p>
			</motion.div>

			<motion.div
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				transition={{delay: 0.2}}
				className={s.card}
			>
				<div className={s.grid}>
					<div>
						<label className={s.label}>Количество чисел</label>
						<div className={s.inputRow}>
							<input
								type='number'
								min='1'
								max='20'
								value={numbersCount}
								onChange={(e) => setNumbersCount(parseInt(e.target.value) || 1)}
								className={s.input}
								disabled={isGenerating}
							/>
							<div className={s.spinners}>
								<button
									type='button'
									className={s.spinUp}
									onClick={() =>
										setNumbersCount(Math.min(20, numbersCount + 1))
									}
									disabled={isGenerating || numbersCount >= 20}
									aria-label='Увеличить'
								>
									<svg
										width='12'
										height='12'
										viewBox='0 0 12 12'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path d='M6 3L9 6L3 6L6 3Z' fill='currentColor' />
									</svg>
								</button>
								<button
									type='button'
									className={s.spinDown}
									onClick={() => setNumbersCount(Math.max(1, numbersCount - 1))}
									disabled={isGenerating || numbersCount <= 1}
									aria-label='Уменьшить'
								>
									<svg
										width='12'
										height='12'
										viewBox='0 0 12 12'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path d='M6 9L3 6L9 6L6 9Z' fill='currentColor' />
									</svg>
								</button>
							</div>
						</div>
					</div>

					<div className={s.actions}>
						<button
							onClick={onGenerateClick}
							disabled={isGenerating}
							className={`${s.btn} ${s.primary} ${
								isGenerating ? s.disabled : ''
							}`}
						>
							{isGenerating ? 'Генерация...' : 'Сгенерировать'}
						</button>
						{currentSession && (
							<>
								<button
									onClick={handleExport}
									className={`${s.btn} ${s.success}`}
								>
									Экспорт JSON
								</button>
								<button
									onClick={handleExportBinary}
									className={`${s.btn} ${s.outline}`}
								>
									Экспорт 1M битов
								</button>
							</>
						)}
					</div>
				</div>

				{stage !== 'idle' && (
					<div className={s.progressWrap}>
						<div className={s.progressHead}>
							<span>
								{stage === 'generating' ? 'Генерация...' : 'Анализ...'}
							</span>
							<span style={{color: 'var(--cyan)', fontWeight: 600}}>
								{progress}%
							</span>
						</div>
						<div className={s.progress}>
							<motion.div
								initial={{width: 0}}
								animate={{width: `${progress}%`}}
								className={s.bar}
							/>
						</div>
					</div>
				)}
			</motion.div>

			{currentSession && (
				<>
					<motion.div
						initial={{opacity: 0, scale: 0.98}}
						animate={{opacity: 1, scale: 1}}
						className={s.resultCard}
					>
						<h3
							style={{
								fontSize: 22,
								fontWeight: 700,
								color: 'var(--cyan)',
								marginBottom: 16,
							}}
						>
							Результат тиража
						</h3>
						<div className={s.kpiWrap}>
							{currentSession.numbers.map((num, idx) => (
								<motion.div
									key={idx}
									initial={{opacity: 0, scale: 0.8}}
									animate={{opacity: 1, scale: 1}}
									transition={{delay: idx * 0.08}}
									className={s.kpi}
								>
									{num}
								</motion.div>
							))}
						</div>

						<div className={s.meta}>
							<div className={s.metaGrid}>
								<div>
									<div className={s.metaLabel}>ID тиража:</div>
									<div className={s.mono} style={{marginTop: 4}}>
										{currentSession.runId}
									</div>
								</div>
								<div>
									<div className={s.metaLabel}>Timestamp:</div>
									<div className={s.mono} style={{marginTop: 4}}>
										{new Date(currentSession.timestamp).toLocaleString('ru-RU')}
									</div>
								</div>
								<div>
									<div className={s.metaLabel}>SNR (dB):</div>
									<div className={s.mono} style={{marginTop: 4}}>
										{currentSession.entropyMetrics.snr_db.toFixed(2)}
									</div>
								</div>
								<div>
									<div className={s.metaLabel}>Lyapunov:</div>
									<div className={s.mono} style={{marginTop: 4}}>
										{currentSession.entropyMetrics.lyapunov_exponent.toFixed(4)}
									</div>
								</div>
								<div>
									<div className={s.metaLabel}>Spectral Deviation:</div>
									<div className={s.mono} style={{marginTop: 4}}>
										{currentSession.entropyMetrics.spectral_deviation_percent.toFixed(
											2,
										)}
										%
									</div>
								</div>
								<div>
									<div className={s.metaLabel}>Тесты пройдены:</div>
									<div
										style={{
											marginTop: 4,
											fontWeight: 700,
											color: currentSession.testResults?.every((t) => t.passed)
												? 'var(--mint)'
												: 'var(--error)',
										}}
									>
										{currentSession.testResults?.every((t) => t.passed)
											? '✓ Все тесты'
											: '✗ Есть ошибки'}
									</div>
								</div>
							</div>
						</div>
					</motion.div>

					<EntropyVisualizer
						sources={[
							{
								name: 'Wire Hum',
								type: 'physical' as const,
								collected: currentSession.entropyMetrics.snr_db,
								quality: Math.min(
									100,
									currentSession.entropyMetrics.snr_db * 2,
								),
							},
							{
								name: 'Lorenz Attractor',
								type: 'algorithmic' as const,
								collected:
									currentSession.entropyMetrics.lyapunov_exponent * 100,
								quality: Math.min(
									100,
									currentSession.entropyMetrics.lyapunov_exponent * 100,
								),
							},
							{
								name: 'Spectral Analysis',
								type: 'hybrid' as const,
								collected:
									currentSession.entropyMetrics.spectral_deviation_percent,
								quality:
									100 -
									currentSession.entropyMetrics.spectral_deviation_percent,
							},
						]}
						isCollecting={false}
					/>

					{currentSession.testResults && (
						<TestResultsDisplay
							results={{
								frequencyTest: {
									name: 'Frequency Test',
									result: currentSession.testResults[0]?.passed
										? 'passed'
										: 'failed',
									pValue: currentSession.testResults[0]?.statistic || 0,
									threshold: currentSession.testResults[0]?.threshold || 0,
									description: 'Тест частотности',
								},
								runsTest: {
									name: 'Runs Test',
									result: currentSession.testResults[1]?.passed
										? 'passed'
										: 'failed',
									pValue: currentSession.testResults[1]?.statistic || 0,
									threshold: currentSession.testResults[1]?.threshold || 0,
									description: 'Тест серий',
								},
								chiSquareTest: {
									name: 'Chi-Square Test',
									result: currentSession.testResults[2]?.passed
										? 'passed'
										: 'failed',
									pValue: currentSession.testResults[2]?.statistic || 0,
									threshold: currentSession.testResults[2]?.threshold || 0,
									description: 'Тест хи-квадрат',
								},
								serialCorrelationTest: {
									name: 'Serial Correlation',
									result: 'pending',
									pValue: 0,
									threshold: 0,
									description: 'Тест корреляции',
								},
								overall: currentSession.testResults.every((t) => t.passed)
									? 'passed'
									: 'failed',
							}}
						/>
					)}
				</>
			)}
		</div>
	)
}
