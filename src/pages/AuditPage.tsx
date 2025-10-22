import {motion} from 'framer-motion'
import {Upload} from 'lucide-react'
import {TestResultsDisplay} from '../components/TestResultsDisplay'
import {useAudit} from '../presentation/hooks'
import s from './AuditPage.module.css'

export const AuditPage = () => {
	const {isAnalyzing, fileName, testResults, handleFileUpload} = useAudit()

	return (
		<div className={s.page}>
			<motion.div
				initial={{opacity: 0, y: -20}}
				animate={{opacity: 1, y: 0}}
				className={s.center}
			>
				<h2 className={s.title}>Аудит внешнего генератора</h2>
				<p className={s.subtitle}>
					Загрузите бинарную последовательность для независимой проверки на
					соответствие критериям случайности через статистические тесты
					RandomTrust API
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
