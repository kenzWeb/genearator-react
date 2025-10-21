import {motion} from 'framer-motion'
import {useState} from 'react'
import {EntropyVisualizer} from '../components/EntropyVisualizer'
import {TestResultsDisplay} from '../components/TestResultsDisplay'
import {formatTimestamp} from '../domain/formatters'
import {
	formatMs,
	getProgressLabel,
	getVerificationLabel,
} from '../domain/selectors/draw'
import {useDrawActions} from '../features/draw/useDrawActions'
import {useRandomGenerator} from '../hooks/useRandomGenerator'
import s from './DrawPage.module.css'

export const DrawPage = () => {
	const {
		visualizationState,
		generateDraw,
		currentSession,
		isGenerating,
		verificationService,
		rng,
	} = useRandomGenerator()
	const {handleGenerate, handleExport, handleExportBinary} = useDrawActions({
		generateDraw,
		currentSession,
		verificationService,
		rng,
		isGenerating,
	})
	const [numbersCount, setNumbersCount] = useState(6)

	const onGenerateClick = async () => {
		await handleGenerate(numbersCount)
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

				{visualizationState.stage !== 'idle' && (
					<div className={s.progressWrap}>
						<div className={s.progressHead}>
							<span>{getProgressLabel(visualizationState.stage)}</span>
							<span style={{color: 'var(--cyan)', fontWeight: 600}}>
								{visualizationState.progress}%
							</span>
						</div>
						<div className={s.progress}>
							<motion.div
								initial={{width: 0}}
								animate={{width: `${visualizationState.progress}%`}}
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
							{currentSession.sequence.numbers.map((num, idx) => (
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
										{currentSession.id}
									</div>
								</div>
								<div>
									<div className={s.metaLabel}>Timestamp:</div>
									<div className={s.mono} style={{marginTop: 4}}>
										{formatTimestamp(currentSession.timestamp)}
									</div>
								</div>
								<div style={{gridColumn: '1 / -1'}}>
									<div className={s.metaLabel}>SHA-256 Hash:</div>
									<div className={s.mono} style={{marginTop: 4, fontSize: 12}}>
										{currentSession.sequence.hash}
									</div>
								</div>
								<div>
									<div className={s.metaLabel}>Верификация:</div>
									<div
										style={{
											marginTop: 4,
											fontWeight: 700,
											color: currentSession.verified
												? 'var(--mint)'
												: 'var(--error)',
										}}
									>
										{getVerificationLabel(currentSession.verified)}
									</div>
								</div>
								<div>
									<div className={s.metaLabel}>Время сбора энтропии:</div>
									<div className={s.mono} style={{marginTop: 4}}>
										{formatMs(
											currentSession.sequence.entropyData.collectionTime,
										)}
									</div>
								</div>
							</div>
						</div>
					</motion.div>

					{currentSession.sequence.entropyData && (
						<EntropyVisualizer
							sources={currentSession.sequence.entropyData.sources}
							isCollecting={false}
						/>
					)}

					<TestResultsDisplay results={currentSession.testResults} />
				</>
			)}
		</div>
	)
}
