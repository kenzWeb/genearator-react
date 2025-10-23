import {motion} from 'framer-motion'
import {AlertCircle} from 'lucide-react'
import {TestResultsDisplay} from '../components/TestResultsDisplay'
import {
	AnalysisProgress,
	FileUploader,
	TestInterpretation,
} from '../presentation/components/audit'
import {useAudit} from '../presentation/hooks'
import s from './AuditPage.module.css'

export const AuditPage = () => {
	const {isAnalyzing, testResults, error, handleFileUpload} = useAudit()

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

			<FileUploader isAnalyzing={isAnalyzing} onFileSelect={handleFileUpload} />

			{error && !isAnalyzing && (
				<motion.div
					className={s.errorCard}
					initial={{opacity: 0, scale: 0.95}}
					animate={{opacity: 1, scale: 1}}
					transition={{type: 'spring', stiffness: 300}}
				>
					<AlertCircle size={24} />
					<div>
						<h4 className={s.errorTitle}>Ошибка анализа</h4>
						<p className={s.errorMessage}>{error}</p>
					</div>
				</motion.div>
			)}

			{isAnalyzing && <AnalysisProgress />}

			{testResults && !isAnalyzing && (
				<>
					<motion.div
						initial={{opacity: 0, y: 20}}
						animate={{opacity: 1, y: 0}}
						transition={{delay: 0.2}}
					>
						<TestResultsDisplay results={testResults} />
					</motion.div>

					<motion.div
						initial={{opacity: 0, y: 20}}
						animate={{opacity: 1, y: 0}}
						transition={{delay: 0.4}}
					>
						<TestInterpretation />
					</motion.div>
				</>
			)}
		</div>
	)
}
