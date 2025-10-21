import {motion} from 'framer-motion'
import {useState} from 'react'
import {TestResultsDisplay} from '../components/TestResultsDisplay'
import {useRandomGenerator} from '../hooks/useRandomGenerator'
import type {TestResults} from '../types'

export const AuditPage = () => {
	const {analyzeExternalSequence, verificationService} = useRandomGenerator()
	const [testResults, setTestResults] = useState<TestResults | null>(null)
	const [isAnalyzing, setIsAnalyzing] = useState(false)
	const [fileName, setFileName] = useState<string>('')

	const handleFileUpload = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = event.target.files?.[0]
		if (!file) return

		setFileName(file.name)
		setIsAnalyzing(true)

		try {
			const binaryData = await verificationService.parseBinaryFile(file)

			if (binaryData.length < 100) {
				alert('Файл должен содержать минимум 100 битов')
				setIsAnalyzing(false)
				return
			}

			const results = await analyzeExternalSequence(binaryData)
			setTestResults(results)
		} catch (error) {
			alert('Ошибка при обработке файла')
			console.error(error)
		} finally {
			setIsAnalyzing(false)
		}
	}

	return (
		<div className='space-y-6 max-w-5xl mx-auto'>
			<motion.div
				initial={{opacity: 0, y: -20}}
				animate={{opacity: 1, y: 0}}
				className='text-center'
			>
				<h2 className='text-4xl font-bold mb-4 text-accent-cyan'>
					Аудит внешнего генератора
				</h2>
				<p className='text-text-secondary max-w-2xl mx-auto'>
					Загрузите последовательность бинарных данных для проверки на
					соответствие критериям случайности
				</p>
			</motion.div>

			<motion.div
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				transition={{delay: 0.2}}
				className='bg-primary-card/80 backdrop-blur-md rounded-card p-8 border border-accent-cyan/20 shadow-glow'
			>
				<div className='max-w-xl mx-auto'>
					<div className='border-2 border-dashed border-accent-cyan/30 rounded-xl p-12 text-center hover:border-accent-cyan/60 transition-all'>
						<input
							type='file'
							accept='.txt'
							onChange={handleFileUpload}
							className='hidden'
							id='file-upload'
							disabled={isAnalyzing}
						/>
						<label
							htmlFor='file-upload'
							className='cursor-pointer flex flex-col items-center space-y-4'
						>
							<div className='w-16 h-16 bg-accent-cyan/15 rounded-full flex items-center justify-center'>
								<span className='text-4xl'>📁</span>
							</div>
							<div>
								<p className='text-lg font-semibold text-text-primary mb-2'>
									{fileName || 'Выберите файл'}
								</p>
								<p className='text-sm text-text-secondary'>
									Поддерживаются текстовые файлы с последовательностью 0 и 1
								</p>
							</div>
							{!isAnalyzing ? (
								<button className='px-6 h-12 bg-accent-cyan text-primary-bg rounded-lg font-semibold hover:bg-accent-cyan/80 transition-all'>
									Загрузить файл
								</button>
							) : (
								<div className='px-6 h-12 bg-primary-card border border-accent-cyan/30 rounded-lg font-semibold flex items-center'>
									Анализ...
								</div>
							)}
						</label>
					</div>

					<div className='mt-6 bg-primary-bg/40 rounded-lg p-4 border border-accent-cyan/10'>
						<h4 className='font-semibold text-text-primary mb-3'>
							Формат файла:
						</h4>
						<div className='space-y-2 text-sm text-text-secondary'>
							<p>• Текстовый файл (.txt)</p>
							<p>• Содержит последовательность из 0 и 1</p>
							<p>• Минимум 100 битов</p>
							<p>• Пример: 01101001101010...</p>
						</div>
					</div>
				</div>
			</motion.div>

			{isAnalyzing && (
				<motion.div
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					className='bg-primary-card/80 backdrop-blur-md rounded-card p-6 border border-accent-cyan/20 shadow-glow'
				>
					<div className='flex items-center justify-center space-x-3'>
						<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-accent-cyan'></div>
						<span className='text-text-primary'>
							Выполняется анализ последовательности...
						</span>
					</div>
				</motion.div>
			)}

			{testResults && !isAnalyzing && (
				<motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}>
					<TestResultsDisplay results={testResults} />
				</motion.div>
			)}

			{testResults && !isAnalyzing && (
				<motion.div
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					className='bg-primary-card/80 backdrop-blur-md rounded-card p-6 border border-accent-cyan/20 shadow-glow'
				>
					<h3 className='text-xl font-semibold mb-4 text-accent-cyan'>
						Интерпретация результатов
					</h3>
					<div className='space-y-3 text-text-primary'>
						<p>
							<strong className='text-accent-cyan'>Frequency Test:</strong>{' '}
							Проверяет баланс между 0 и 1. Последовательность должна содержать
							примерно равное количество нулей и единиц.
						</p>
						<p>
							<strong className='text-accent-cyan'>Runs Test:</strong>{' '}
							Анализирует количество серий (последовательных одинаковых битов).
							Слишком много или слишком мало серий указывает на неслучайность.
						</p>
						<p>
							<strong className='text-accent-cyan'>Chi-Square Test:</strong>{' '}
							Проверяет равномерность распределения битовых паттернов. Выявляет
							аномалии в распределении.
						</p>
						<p>
							<strong className='text-accent-cyan'>Serial Correlation:</strong>{' '}
							Проверяет корреляцию между последовательными битами. Высокая
							корреляция указывает на предсказуемость.
						</p>
					</div>
				</motion.div>
			)}
		</div>
	)
}
