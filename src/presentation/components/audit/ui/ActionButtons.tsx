import {m} from 'framer-motion'
import {Play, Upload} from 'lucide-react'
import s from './ActionButtons.module.css'

interface ActionButtonsProps {
	hasFile: boolean
	isAnalyzing: boolean
	onSelectClick: () => void
	onStartAnalysis: () => void
}

export const ActionButtons = ({
	hasFile,
	isAnalyzing,
	onSelectClick,
	onStartAnalysis,
}: ActionButtonsProps) => {
	return (
		<div className={s.actions}>
			<m.button
				className={s.selectBtn}
				onClick={onSelectClick}
				disabled={isAnalyzing}
				whileHover={{scale: 1.05}}
				whileTap={{scale: 0.95}}
			>
				<Upload size={18} />
				Выбрать файл
			</m.button>

			{hasFile && (
				<m.button
					className={s.startBtn}
					onClick={onStartAnalysis}
					disabled={isAnalyzing}
					whileHover={{scale: 1.05}}
					whileTap={{scale: 0.95}}
					initial={{opacity: 0, x: -20}}
					animate={{opacity: 1, x: 0}}
					transition={{type: 'spring', stiffness: 300}}
				>
					<Play size={18} />
					{isAnalyzing ? 'Анализ...' : 'Начать анализ'}
				</m.button>
			)}
		</div>
	)
}
