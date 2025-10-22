import {motion} from 'framer-motion'
import {Upload} from 'lucide-react'
import {useState} from 'react'
import {analysisService, auditService, type TestOutcomeView} from '../api'
import {TestResultsDisplay} from '../components/TestResultsDisplay'
import s from './AuditPage.module.css'

export const AuditPage = () => {
	const [isAnalyzing, setIsAnalyzing] = useState(false)
	const [fileName, setFileName] = useState<string>('')
	const [testResults, setTestResults] = useState<TestOutcomeView[] | null>(null)

	const handleFileUpload = async (file: File) => {
		try {
			setIsAnalyzing(true)
			setFileName(file.name)

			const text = await file.text()
			const hexData = binaryToHex(text.trim())

			const uploadResponse = await auditService.upload({
				name: file.name,
				description: `Uploaded at ${new Date().toISOString()}`,
				data: hexData,
			})

			const analysisResult = await analysisService.analyzeAudit(
				uploadResponse.audit_id,
				{
					tests: ['frequency', 'runs', 'chi_square'],
				},
			)

			setTestResults(analysisResult.outcomes)
		} catch (error) {
			console.error('Ошибка анализа:', error)
			setTestResults(null)
		} finally {
			setIsAnalyzing(false)
		}
	}

	const binaryToHex = (binary: string): string => {
		const cleaned = binary.replace(/\s/g, '')
		let hex = ''
		for (let i = 0; i < cleaned.length; i += 4) {
			const chunk = cleaned.slice(i, i + 4).padEnd(4, '0')
			hex += parseInt(chunk, 2).toString(16)
		}
		return hex
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
							onChange={(e) => {
								const file = e.target.files?.[0]
								if (file) handleFileUpload(file)
							}}
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
					<TestResultsDisplay
						results={{
							frequencyTest: {
								name: 'Frequency Test',
								result: testResults[0]?.passed ? 'passed' : 'failed',
								pValue: testResults[0]?.statistic || 0,
								threshold: testResults[0]?.threshold || 0,
								description: 'Тест частотности',
							},
							runsTest: {
								name: 'Runs Test',
								result: testResults[1]?.passed ? 'passed' : 'failed',
								pValue: testResults[1]?.statistic || 0,
								threshold: testResults[1]?.threshold || 0,
								description: 'Тест серий',
							},
							chiSquareTest: {
								name: 'Chi-Square Test',
								result: testResults[2]?.passed ? 'passed' : 'failed',
								pValue: testResults[2]?.statistic || 0,
								threshold: testResults[2]?.threshold || 0,
								description: 'Тест хи-квадрат',
							},
							serialCorrelationTest: {
								name: 'Serial Correlation',
								result: 'pending',
								pValue: 0,
								threshold: 0,
								description: 'Тест корреляции',
							},
							overall: testResults.every((t) => t.passed) ? 'passed' : 'failed',
						}}
					/>
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
