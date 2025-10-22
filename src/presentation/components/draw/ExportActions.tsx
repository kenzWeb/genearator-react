import {motion} from 'framer-motion'
import s from './ExportActions.module.css'

interface ExportActionsProps {
	onExportJSON: () => void
	onExportBinary: () => void
}

export const ExportActions = ({
	onExportJSON,
	onExportBinary,
}: ExportActionsProps) => {
	return (
		<motion.div
			initial={{opacity: 0, y: 10}}
			animate={{opacity: 1, y: 0}}
			className={s.actions}
		>
			<button onClick={onExportJSON} className={`${s.btn} ${s.success}`}>
				Экспорт JSON
			</button>
			<button onClick={onExportBinary} className={`${s.btn} ${s.outline}`}>
				Экспорт 1M битов
			</button>
		</motion.div>
	)
}
