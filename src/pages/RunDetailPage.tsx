import {motion} from 'framer-motion'
import {useParams} from 'react-router-dom'
import {TestResultsDisplay} from '../components/TestResultsDisplay'
import {
	EntropyVisualization,
	RunDetailHeader,
	RunInfoCard,
} from '../presentation/components/run-detail'
import {useRunDetail} from '../presentation/hooks'
import {mapRunToEntropyMetrics} from '../presentation/utils/mapRunToEntropyMetrics'
import s from './RunDetailPage.module.css'

export const RunDetailPage = () => {
	const {runId} = useParams<{runId: string}>()
	const {run, testResults, isLoading, error, exportRun} = useRunDetail(
		runId ?? '',
	)

	if (isLoading) {
		return (
			<div className={s.page}>
				<div className={s.loading}>
					<div className={s.spinner} />
					<p>Загрузка данных тиража...</p>
				</div>
			</div>
		)
	}

	if (error || !run) {
		return (
			<div className={s.page}>
				<div className={s.error}>
					<p>{error || 'Тираж не найден'}</p>
					<button onClick={() => window.history.back()} className={s.backBtn}>
						Вернуться назад
					</button>
				</div>
			</div>
		)
	}

	const entropyMetrics = mapRunToEntropyMetrics(run)

	return (
		<div className={s.page}>
			<RunDetailHeader />

			<RunInfoCard
				runId={run.id}
				createdAt={run.created_at}
				dataSize={run.data?.length ?? null}
				onExport={exportRun}
			/>

			{entropyMetrics && (
				<EntropyVisualization
					metrics={entropyMetrics}
					testsPassed={testResults?.overall === 'passed'}
				/>
			)}

			{testResults && (
				<motion.div
					initial={{opacity: 0, y: 20}}
					animate={{opacity: 1, y: 0}}
					transition={{delay: 0.2}}
				>
					<TestResultsDisplay results={testResults} />
				</motion.div>
			)}
		</div>
	)
}
