import {motion} from 'framer-motion'
import {Upload} from 'lucide-react'
import {useState} from 'react'
import {TestResultsDisplay} from '../components/TestResultsDisplay'
import {useRandomGenerator} from '../hooks/useRandomGenerator'
import type {TestResults} from '../types'
import s from './AuditPage.module.css'

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
		<div className={s.page}>
			<motion.div
				initial={{opacity: 0, y: -20}}
				animate={{opacity: 1, y: 0}}
				className={s.center}
			>
				<h2 className={s.title}>Аудит внешнего генератора</h2>
				<p className={s.subtitle}>
					Загрузите последовательность бинарных данных для проверки на
					соответствие критериям случайности
				</p>
			</motion.div>

			<motion.div
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				transition={{delay: 0.2}}
				className={s.card}
			>
				<div className={s.inner}>
					<div className={s.drop}>
						<input
							type='file'
							accept='.txt'
							onChange={handleFileUpload}
							className={s.hidden}
							id='file-upload'
							disabled={isAnalyzing}
						/>
						<label htmlFor='file-upload' className={s.label}>
							<div className={s.icon} style={{color: 'var(--cyan)'}}>
								<Upload size={28} />
							</div>
							<div>
								<p className={s.fileTitle}>{fileName || 'Выберите файл'}</p>
								<p className={s.fileHint}>
									Поддерживаются текстовые файлы с последовательностью 0 и 1
								</p>
							</div>
							{!isAnalyzing ? (
								<button className={s.uploadBtn}>Загрузить файл</button>
							) : (
								<div className={s.uploadDisabled}>Анализ...</div>
							)}
						</label>
					</div>

					<div className={s.info}>
						<h4 className={s.infoTitle}>Формат файла:</h4>
						<div className={s.infoList}>
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
					className={s.progressCard}
				>
					<div className={s.spinner} />
					<span className={s.progressText}>
						Выполняется анализ последовательности...
					</span>
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
					className={s.resultCard}
				>
					<h3 className={s.resultTitle}>Интерпретация результатов</h3>
					<div className={s.explain}>
						<p>
							<strong className={s.accent}>Frequency Test:</strong> Проверяет
							баланс между 0 и 1. Последовательность должна содержать примерно
							равное количество нулей и единиц.
						</p>
						<p>
							<strong className={s.accent}>Runs Test:</strong> Анализирует
							количество серий (последовательных одинаковых битов). Слишком
							много или слишком мало серий указывает на неслучайность.
						</p>
						<p>
							<strong className={s.accent}>Chi-Square Test:</strong> Проверяет
							равномерность распределения битовых паттернов. Выявляет аномалии в
							распределении.
						</p>
						<p>
							<strong className={s.accent}>Serial Correlation:</strong>{' '}
							Проверяет корреляцию между последовательными битами. Высокая
							корреляция указывает на предсказуемость.
						</p>
					</div>
				</motion.div>
			)}
		</div>
	)
}
