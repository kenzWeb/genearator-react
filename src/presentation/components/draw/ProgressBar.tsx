import {motion} from 'framer-motion'
import s from './ProgressBar.module.css'

interface ProgressBarProps {
	stage: 'idle' | 'generating' | 'analyzing'
	progress: number
}

export const ProgressBar = ({stage, progress}: ProgressBarProps) => {
	if (stage === 'idle') return null

	return (
		<div className={s.progressWrap}>
			<div className={s.progressHead}>
				<span>{stage === 'generating' ? 'Генерация...' : 'Анализ...'}</span>
				<span style={{color: 'var(--cyan)', fontWeight: 600}}>{progress}%</span>
			</div>
			<div className={s.progress}>
				<motion.div
					initial={{width: 0}}
					animate={{width: `${progress}%`}}
					className={s.bar}
				/>
			</div>
		</div>
	)
}
