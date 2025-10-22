import {motion} from 'framer-motion'
import s from './DrawResults.module.css'

interface DrawResultsProps {
	numbers: number[]
	runId: string
	timestamp: string
}

export const DrawResults = ({numbers, runId, timestamp}: DrawResultsProps) => {
	return (
		<motion.div
			initial={{opacity: 0, scale: 0.98}}
			animate={{opacity: 1, scale: 1}}
			className={s.resultCard}
		>
			<h3 className={s.title}>Результат тиража</h3>
			<div className={s.kpiWrap}>
				{numbers.map((num, idx) => (
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
						<div className={s.mono}>{runId}</div>
					</div>
					<div>
						<div className={s.metaLabel}>Timestamp:</div>
						<div className={s.mono}>
							{new Date(timestamp).toLocaleString('ru-RU')}
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	)
}
