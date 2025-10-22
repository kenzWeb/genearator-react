import {motion} from 'framer-motion'
import s from './AnalysisProgress.module.css'

export const AnalysisProgress = () => {
	return (
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
	)
}
