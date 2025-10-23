import {motion} from 'framer-motion'
import {Eye} from 'lucide-react'
import {useNavigate} from 'react-router-dom'
import s from './DrawResults.module.css'

interface DrawResultsProps {
	numbers: number[]
	runId: string
	timestamp: string
}

export const DrawResults = ({numbers, runId, timestamp}: DrawResultsProps) => {
	const MAX_DISPLAY_NUMBERS = 100
	const displayNumbers = numbers.slice(0, MAX_DISPLAY_NUMBERS)
	const hasMore = numbers.length > MAX_DISPLAY_NUMBERS
	const navigate = useNavigate()

	return (
		<motion.div
			initial={{opacity: 0, scale: 0.98}}
			animate={{opacity: 1, scale: 1}}
			className={s.resultCard}
		>
			<div className={s.header}>
				<h3 className={s.title}>Результат тиража</h3>
				<button
					onClick={() => navigate(`/run/${runId}`)}
					className={s.detailsBtn}
				>
					<Eye size={16} />
					Цифровой слепок
				</button>
			</div>
			<div className={s.kpiWrap}>
				{displayNumbers.map((num, idx) => (
					<motion.div
						key={idx}
						initial={{opacity: 0, scale: 0.8}}
						animate={{opacity: 1, scale: 1}}
						transition={{delay: idx * 0.02}}
						className={s.kpi}
					>
						{num}
					</motion.div>
				))}
			</div>

			{hasMore && (
				<div className={s.moreInfo}>
					Показаны первые {MAX_DISPLAY_NUMBERS} из{' '}
					{numbers.length.toLocaleString('ru-RU')} чисел. Полные данные доступны
					при экспорте.
				</div>
			)}

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
					<div>
						<div className={s.metaLabel}>Всего чисел:</div>
						<div className={s.mono}>
							{numbers.length.toLocaleString('ru-RU')}
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	)
}
