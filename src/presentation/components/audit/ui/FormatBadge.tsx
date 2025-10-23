import {m} from 'framer-motion'
import type {FileFormat} from '../hooks/useFileFormatDetector'
import s from './FormatBadge.module.css'

interface FormatBadgeProps {
	format: FileFormat
}

const FORMAT_LABELS: Record<FileFormat, {text: string; color: string}> = {
	binary: {text: 'Binary (0/1)', color: 'var(--mint)'},
	hex: {text: 'HEX Format', color: 'var(--cyan)'},
	unknown: {text: 'Неизвестный формат', color: '#ff4444'},
}

export const FormatBadge = ({format}: FormatBadgeProps) => {
	const {text, color} = FORMAT_LABELS[format]

	return (
		<m.span
			className={s.badge}
			style={{borderColor: color, color}}
			initial={{opacity: 0, scale: 0.8}}
			animate={{opacity: 1, scale: 1}}
			transition={{delay: 0.2}}
		>
			{text}
		</m.span>
	)
}
