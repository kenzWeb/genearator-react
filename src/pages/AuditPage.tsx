import {motion} from 'framer-motion'
import {TestResultsDisplay} from '../components/TestResultsDisplay'
import {
	AnalysisProgress,
	FileUploader,
	TestInterpretation,
} from '../presentation/components/audit'
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

			<FileUploader
				fileName={fileName}
				isAnalyzing={isAnalyzing}
				onFileSelect={handleFileUpload}
			/>

			{isAnalyzing && <AnalysisProgress />}

			{testResults && !isAnalyzing && (
				<>
					<motion.div
						initial={{opacity: 0, y: 20}}
						animate={{opacity: 1, y: 0}}
					>
						<TestResultsDisplay results={testResults} />
					</motion.div>

					<TestInterpretation />
				</>
			)}
		</div>
	)
}
