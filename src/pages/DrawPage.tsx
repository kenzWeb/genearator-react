import {motion} from 'framer-motion'
import {useState} from 'react'
import {EntropyVisualizer} from '../components/EntropyVisualizer'
import {TestResultsDisplay} from '../components/TestResultsDisplay'
import {useRandomGenerator} from '../hooks/useRandomGenerator'

export const DrawPage = () => {
	const {
		generateDraw,
		visualizationState,
		currentSession,
		isGenerating,
		verificationService,
		rng,
	} = useRandomGenerator()
	const [numbersCount, setNumbersCount] = useState(6)

	const handleGenerate = async () => {
		await generateDraw(numbersCount)
	}

	const handleExport = () => {
		if (!currentSession) return
		const blob = verificationService.exportToTextFile(currentSession.sequence)
		verificationService.downloadFile(blob, `draw-${currentSession.id}.json`)
	}

	const handleExportBinary = () => {
		const binary = verificationService.generateLargeBinarySequence(rng, 1000000)
		const blob = verificationService.exportToBinaryFile(binary)
		verificationService.downloadFile(blob, `binary-sequence-${Date.now()}.txt`)
	}

	return (
		<div className='space-y-8 max-w-5xl mx-auto pt-4'>
			<motion.div
				initial={{opacity: 0, y: -20}}
				animate={{opacity: 1, y: 0}}
				className='text-center'
			>
				<h2 className='text-4xl font-extrabold mb-2 text-accent-cyan tracking-tight'>
					Проведение лотерейного тиража
				</h2>
				<p className='text-text-secondary max-w-2xl mx-auto'>
					Генерация случайных чисел с использованием гибридного источника
					энтропии и автоматической верификацией качества
				</p>
			</motion.div>

			<motion.div
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				transition={{delay: 0.2}}
				className='bg-primary-card backdrop-blur-md rounded-xl p-6 border border-primary-border/60 shadow-glass'
			>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4 items-end'>
					<div className='md:col-span-2'>
						<label className='block text-sm text-text-secondary mb-2'>
							Количество чисел
						</label>
						<div className='flex items-center gap-3'>
							<input
								type='number'
								min='1'
								max='20'
								value={numbersCount}
								onChange={(e) => setNumbersCount(parseInt(e.target.value) || 1)}
								className='w-24 h-12 px-3 bg-primary-bg/60 border border-primary-border/60 rounded-lg text-text-primary focus:outline-none focus:border-accent-cyan transition-all'
								disabled={isGenerating}
							/>
						</div>
					</div>

					<div className='flex gap-3 justify-start md:justify-end'>
						<button
							onClick={handleGenerate}
							disabled={isGenerating}
							className='px-6 h-12 bg-accent-cyan text-primary-bg rounded-lg font-semibold hover:bg-accent-cyan/85 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
						>
							{isGenerating ? 'Генерация...' : 'Сгенерировать'}
						</button>

						{currentSession && (
							<>
								<button
									onClick={handleExport}
									className='px-6 h-12 bg-accent-mint text-primary-bg rounded-lg font-semibold hover:bg-accent-mint/85 transition-all'
								>
									Экспорт JSON
								</button>
								<button
									onClick={handleExportBinary}
									className='px-6 h-12 bg-primary-card border border-primary-border/60 text-text-primary rounded-lg font-semibold hover:border-accent-cyan transition-all'
								>
									Экспорт 1M битов
								</button>
							</>
						)}
					</div>
				</div>

				{visualizationState.stage !== 'idle' && (
					<div className='mb-4'>
						<div className='flex items-center justify-between mb-2'>
							<span className='text-sm text-text-secondary'>
								{visualizationState.stage === 'collecting' &&
									'Сбор энтропии...'}
								{visualizationState.stage === 'processing' &&
									'Обработка данных...'}
								{visualizationState.stage === 'testing' && 'Запуск тестов...'}
								{visualizationState.stage === 'complete' && 'Завершено'}
							</span>
							<span className='text-sm text-accent-cyan font-semibold'>
								{visualizationState.progress}%
							</span>
						</div>
						<div className='w-full bg-primary-bg/50 rounded-full h-2 overflow-hidden border border-primary-border/40'>
							<motion.div
								initial={{width: 0}}
								animate={{width: `${visualizationState.progress}%`}}
								className='h-full bg-accent-cyan'
							/>
						</div>
					</div>
				)}
			</motion.div>

			{currentSession && (
				<>
					<motion.div
						initial={{opacity: 0, scale: 0.9}}
						animate={{opacity: 1, scale: 1}}
						className='bg-primary-card/80 backdrop-blur-md rounded-card p-8 border border-accent-cyan/20 shadow-glow text-center'
					>
						<h3 className='text-2xl font-semibold mb-6 text-accent-cyan'>
							Результат тиража
						</h3>
						<div className='flex flex-wrap justify-center gap-4 mb-6'>
							{currentSession.sequence.numbers.map((num, idx) => (
								<motion.div
									key={idx}
									initial={{opacity: 0, scale: 0}}
									animate={{opacity: 1, scale: 1}}
									transition={{delay: idx * 0.1}}
									className='w-20 h-20 bg-accent-cyan text-primary-bg rounded-xl flex items-center justify-center text-3xl font-bold shadow-glow'
								>
									{num}
								</motion.div>
							))}
						</div>

						<div className='bg-primary-bg/40 rounded-lg p-4 text-left border border-primary-border/40'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
								<div>
									<span className='text-text-secondary'>ID тиража:</span>
									<p className='font-mono text-accent-cyan break-all mt-1'>
										{currentSession.id}
									</p>
								</div>
								<div>
									<span className='text-text-secondary'>Timestamp:</span>
									<p className='font-mono text-accent-cyan mt-1'>
										{new Date(currentSession.timestamp).toLocaleString()}
									</p>
								</div>
								<div className='md:col-span-2'>
									<span className='text-text-secondary'>SHA-256 Hash:</span>
									<p className='font-mono text-xs text-accent-cyan break-all mt-1'>
										{currentSession.sequence.hash}
									</p>
								</div>
								<div>
									<span className='text-text-secondary'>Верификация:</span>
									<p
										className={`font-semibold mt-1 ${
											currentSession.verified
												? 'text-accent-mint'
												: 'text-error'
										}`}
									>
										{currentSession.verified ? '✓ Подтверждено' : '✗ Ошибка'}
									</p>
								</div>
								<div>
									<span className='text-text-secondary'>
										Время сбора энтропии:
									</span>
									<p className='text-accent-cyan mt-1'>
										{currentSession.sequence.entropyData.collectionTime}ms
									</p>
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
