import {motion} from 'framer-motion'
import {useState} from 'react'
import {EntropyVisualizer} from '../components/EntropyVisualizer'
import {TestResultsDisplay} from '../components/TestResultsDisplay'
import {mapEntropyMetricsToSources} from '../core/mappers'
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
								max='1000000'
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
										setNumbersCount(Math.min(1000000, numbersCount + 1))
									}
									disabled={isGenerating || numbersCount >= 1000000}
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
									onClick={exportJSON}
									className={`${s.btn} ${s.success}`}
								>
									Экспорт JSON
								</button>
								<button
									onClick={exportBinary}
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
											color:
												currentSession.testResults?.overall === 'passed'
													? 'var(--mint)'
													: 'var(--error)',
										}}
									>
										{currentSession.testResults?.overall === 'passed'
											? '✓ Все тесты'
											: '✗ Есть ошибки'}
									</div>
								</div>
							</div>
						</div>
					</motion.div>

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
