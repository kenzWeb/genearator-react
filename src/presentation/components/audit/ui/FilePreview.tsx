import {m} from 'framer-motion'
import s from './FilePreview.module.css'

interface FilePreviewProps {
	preview: string
}

export const FilePreview = ({preview}: FilePreviewProps) => {
	if (!preview) return null

	return (
		<m.div
			className={s.preview}
			initial={{opacity: 0, height: 0}}
			animate={{opacity: 1, height: 'auto'}}
			transition={{delay: 0.3}}
		>
			<p className={s.label}>Первые 200 символов:</p>
			<code className={s.code}>{preview}...</code>
		</m.div>
	)
}
