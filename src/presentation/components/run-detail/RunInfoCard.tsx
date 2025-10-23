import {m} from 'framer-motion'
import {Calendar, Clock, Download, Hash} from 'lucide-react'
import s from './RunInfoCard.module.css'

interface RunInfoCardProps {
	runId: string
	createdAt: string
	dataSize: number | null
	onExport: () => void
}

export const RunInfoCard = ({
	runId,
	createdAt,
	dataSize,
	onExport,
}: RunInfoCardProps) => {
	return (
		<m.div
			initial={{opacity: 0, scale: 0.98}}
			animate={{opacity: 1, scale: 1}}
			className={s.card}
		>
			<div className={s.infoGrid}>
				<div className={s.infoItem}>
					<Hash className={s.icon} />
					<div>
						<div className={s.label}>Run ID</div>
						<div className={s.value}>{runId}</div>
					</div>
				</div>
				<div className={s.infoItem}>
					<Calendar className={s.icon} />
					<div>
						<div className={s.label}>Дата создания</div>
						<div className={s.value}>
							{new Date(createdAt).toLocaleDateString('ru-RU')}
						</div>
					</div>
				</div>
				<div className={s.infoItem}>
					<Clock className={s.icon} />
					<div>
						<div className={s.label}>Время</div>
						<div className={s.value}>
							{new Date(createdAt).toLocaleTimeString('ru-RU')}
						</div>
					</div>
				</div>
				<div className={s.infoItem}>
					<Download className={s.icon} />
					<div>
						<div className={s.label}>Размер данных</div>
						<div className={s.value}>
							{dataSize ? `${dataSize} символов` : 'Данные недоступны'}
						</div>
					</div>
				</div>
			</div>

			<button onClick={onExport} className={s.exportBtn}>
				<Download size={18} />
				Скачать полные данные (1M+ бит)
			</button>
		</m.div>
	)
}
