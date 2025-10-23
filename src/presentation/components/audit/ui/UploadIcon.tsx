import {m} from 'framer-motion'
import {FileText, Upload} from 'lucide-react'
import s from './UploadIcon.module.css'

interface UploadIconProps {
	hasFile: boolean
}

export const UploadIcon = ({hasFile}: UploadIconProps) => {
	return (
		<m.div
			className={s.icon}
			style={{color: 'var(--cyan)'}}
			animate={{
				y: [0, -10, 0],
			}}
			transition={{
				duration: 2,
				repeat: Infinity,
				ease: 'easeInOut',
			}}
		>
			{hasFile ? <FileText size={48} /> : <Upload size={48} />}
		</m.div>
	)
}
