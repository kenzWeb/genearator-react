import {motion} from 'framer-motion'
import {Upload} from 'lucide-react'
import s from './FileUploader.module.css'

interface FileUploaderProps {
	fileName: string
	isAnalyzing: boolean
	onFileSelect: (file: File) => void
}

export const FileUploader = ({
	fileName,
	isAnalyzing,
	onFileSelect,
}: FileUploaderProps) => {
	return (
		<motion.div
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			transition={{delay: 0.2}}
			className={s.card}
		>
			<div className={s.inner}>
				<div className={s.drop}>
					<input
						type='file'
						accept='.txt'
						onChange={(e) => {
							const file = e.target.files?.[0]
							if (file) onFileSelect(file)
						}}
						className={s.hidden}
						id='file-upload'
						disabled={isAnalyzing}
					/>
					<label htmlFor='file-upload' className={s.label}>
						<div className={s.icon} style={{color: 'var(--cyan)'}}>
							<Upload size={28} />
						</div>
						<div>
							<p className={s.fileTitle}>{fileName || 'Выберите файл'}</p>
							<p className={s.fileHint}>
								Поддерживаются текстовые файлы с последовательностью 0 и 1
							</p>
						</div>
						{!isAnalyzing ? (
							<button className={s.uploadBtn}>Загрузить файл</button>
						) : (
							<div className={s.uploadDisabled}>Анализ...</div>
						)}
					</label>
				</div>

				<div className={s.info}>
					<h4 className={s.infoTitle}>Формат файла:</h4>
					<div className={s.infoList}>
						<p>• Текстовый файл (.txt)</p>
						<p>• Содержит последовательность из 0 и 1</p>
						<p>• Минимум 100 битов</p>
						<p>• Пример: 01101001101010...</p>
					</div>
				</div>
			</div>
		</motion.div>
	)
}
