import {motion} from 'framer-motion'
import {Activity, BarChart3, Sparkles} from 'lucide-react'
import s from './AnalysisProgress.module.css'

export const AnalysisProgress = () => {
	const tests = [
		{name: 'Frequency Test', icon: <BarChart3 size={20} />, delay: 0.2},
		{name: 'Runs Test', icon: <Activity size={20} />, delay: 0.4},
		{name: 'Chi-Square Test', icon: <Sparkles size={20} />, delay: 0.6},
	]

	return (
		<motion.div
			initial={{opacity: 0, y: 20}}
			animate={{opacity: 1, y: 0}}
			className={s.progressCard}
		>
			<div className={s.header}>
				<motion.div
					className={s.spinner}
					animate={{rotate: 360}}
					transition={{duration: 2, repeat: Infinity, ease: 'linear'}}
				/>
				<span className={s.progressText}>
					Выполняется анализ последовательности...
				</span>
			</div>

			<div className={s.tests}>
				{tests.map((test, idx) => (
					<motion.div
						key={test.name}
						className={s.testItem}
						initial={{opacity: 0, x: -20}}
						animate={{opacity: 1, x: 0}}
						transition={{delay: test.delay}}
					>
						<motion.div
							className={s.testIcon}
							animate={{
								scale: [1, 1.2, 1],
								opacity: [0.5, 1, 0.5],
							}}
							transition={{
								duration: 2,
								repeat: Infinity,
								delay: idx * 0.3,
							}}
						>
							{test.icon}
						</motion.div>
						<span className={s.testName}>{test.name}</span>
						<motion.div
							className={s.testProgress}
							initial={{width: 0}}
							animate={{width: '100%'}}
							transition={{
								duration: 2,
								repeat: Infinity,
								repeatType: 'reverse',
								delay: idx * 0.2,
							}}
						/>
					</motion.div>
				))}
			</div>
		</motion.div>
	)
}
