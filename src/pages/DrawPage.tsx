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
		<div className='space-y-6'>
			<motion.div
				initial={{opacity: 0, y: -20}}
				animate={{opacity: 1, y: 0}}
				className='text-center'
			>
				<h2 className='text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>
					Проведение лотерейного тиража
				</h2>
				<p className='text-gray-400 max-w-2xl mx-auto'>
					Генерация случайных чисел с использованием гибридного источника
					энтропии и автоматической верификацией качества
				</p>
			</motion.div>

			<motion.div
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				transition={{delay: 0.2}}
				className='bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20'
			>
				<div className='flex items-center justify-between mb-6'>
					<div className='flex items-center space-x-4'>
						<label className='text-gray-300'>Количество чисел:</label>
						<input
							type='number'
							min='1'
							max='20'
							value={numbersCount}
							onChange={(e) => setNumbersCount(parseInt(e.target.value) || 1)}
							className='w-20 px-3 py-2 bg-black/30 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500'
							disabled={isGenerating}
						/>
					</div>

					<div className='flex space-x-3'>
						<button
							onClick={handleGenerate}
							disabled={isGenerating}
							className='px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
						>
							{isGenerating ? 'Генерация...' : 'Сгенерировать'}
						</button>

						{currentSession && (
							<>
								<button
									onClick={handleExport}
									className='px-6 py-3 bg-green-600 rounded-lg font-semibold hover:bg-green-700 transition-all'
								>
									Экспорт JSON
								</button>
								<button
									onClick={handleExportBinary}
									className='px-6 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-all'
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
							<span className='text-sm text-gray-400'>
								{visualizationState.stage === 'collecting' &&
									'Сбор энтропии...'}
								{visualizationState.stage === 'processing' &&
									'Обработка данных...'}
								{visualizationState.stage === 'testing' && 'Запуск тестов...'}
								{visualizationState.stage === 'complete' && 'Завершено'}
							</span>
							<span className='text-sm text-purple-400'>
								{visualizationState.progress}%
							</span>
						</div>
						<div className='w-full bg-gray-700/50 rounded-full h-2 overflow-hidden'>
							<motion.div
								initial={{width: 0}}
								animate={{width: `${visualizationState.progress}%`}}
								className='h-full bg-gradient-to-r from-purple-500 to-blue-500'
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
						className='bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20 text-center'
					>
						<h3 className='text-2xl font-semibold mb-6 text-purple-300'>
							Результат тиража
						</h3>
						<div className='flex flex-wrap justify-center gap-4 mb-6'>
							{currentSession.sequence.numbers.map((num, idx) => (
								<motion.div
									key={idx}
									initial={{opacity: 0, scale: 0}}
									animate={{opacity: 1, scale: 1}}
									transition={{delay: idx * 0.1}}
									className='w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-3xl font-bold shadow-lg shadow-purple-500/50'
								>
									{num}
								</motion.div>
							))}
						</div>

						<div className='bg-black/20 rounded-lg p-4 text-left'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
								<div>
									<span className='text-gray-400'>ID тиража:</span>
									<p className='font-mono text-purple-300 break-all'>
										{currentSession.id}
									</p>
								</div>
								<div>
									<span className='text-gray-400'>Timestamp:</span>
									<p className='font-mono text-purple-300'>
										{new Date(currentSession.timestamp).toLocaleString()}
									</p>
								</div>
								<div className='md:col-span-2'>
									<span className='text-gray-400'>SHA-256 Hash:</span>
									<p className='font-mono text-xs text-purple-300 break-all'>
										{currentSession.sequence.hash}
									</p>
								</div>
								<div>
									<span className='text-gray-400'>Верификация:</span>
									<p
										className={`font-semibold ${
											currentSession.verified
												? 'text-green-400'
												: 'text-red-400'
										}`}
									>
										{currentSession.verified ? '✓ Подтверждено' : '✗ Ошибка'}
									</p>
								</div>
								<div>
									<span className='text-gray-400'>Время сбора энтропии:</span>
									<p className='text-purple-300'>
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
