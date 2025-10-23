import {m} from 'framer-motion'
import {FileText, Play, Upload} from 'lucide-react'
import {useEffect, useRef, useState} from 'react'
import s from './FileUploader.module.css'

interface FileUploaderProps {
	isAnalyzing: boolean
	onFileSelect: (file: File) => void
}

export const FileUploader = ({
	isAnalyzing,
	onFileSelect,
}: FileUploaderProps) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [fileFormat, setFileFormat] = useState<'binary' | 'hex' | 'unknown'>(
		'unknown',
	)
	const [filePreview, setFilePreview] = useState<string>('')
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (!selectedFile) {
			setFileFormat('unknown')
			setFilePreview('')
			return
		}

		const detectFormat = async () => {
			try {
				const text = await selectedFile.text()
				const cleaned = text.replace(/\s+/g, '')

				setFilePreview(cleaned.slice(0, 200))

				if (/^[01]+$/.test(cleaned)) {
					setFileFormat('binary')
				} else if (/^[0-9a-fA-F]+$/.test(cleaned)) {
					setFileFormat('hex')
				} else {
					setFileFormat('unknown')
				}
			} catch {
				setFileFormat('unknown')
				setFilePreview('')
			}
		}

		detectFormat()
	}, [selectedFile])

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setSelectedFile(file)
		}
	}

	const handleStartAnalysis = () => {
		if (selectedFile) {
			onFileSelect(selectedFile)
		}
	}

	const handleSelectClick = () => {
		inputRef.current?.click()
	}

	const getFormatBadge = () => {
		if (!selectedFile) return null

		const formatLabels = {
			binary: {text: 'Binary (0/1)', color: 'var(--mint)'},
			hex: {text: 'HEX Format', color: 'var(--cyan)'},
			unknown: {text: 'Неизвестный формат', color: '#ff4444'},
		}

		const format = formatLabels[fileFormat]

		return (
			<m.span
				className={s.formatBadge}
				style={{borderColor: format.color, color: format.color}}
				initial={{opacity: 0, scale: 0.8}}
				animate={{opacity: 1, scale: 1}}
				transition={{delay: 0.2}}
			>
				{format.text}
			</m.span>
		)
	}

	return (
		<m.div
			initial={{opacity: 0, scale: 0.98}}
			animate={{opacity: 1, scale: 1}}
			transition={{delay: 0.2}}
			className={s.card}
		>
			<div className={s.inner}>
				<m.div
					className={s.drop}
					whileHover={!isAnalyzing ? {scale: 1.02} : {}}
					transition={{type: 'spring', stiffness: 300}}
				>
					<input
						ref={inputRef}
						type='file'
						accept='.txt,.bin'
						onChange={handleFileChange}
						className={s.hidden}
						id='file-upload'
						disabled={isAnalyzing}
					/>

					<div className={s.dropContent}>
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
							{selectedFile ? <FileText size={48} /> : <Upload size={48} />}
						</m.div>

						<div className={s.textContent}>
							<div className={s.fileInfo}>
								<p className={s.fileTitle}>
									{selectedFile ? selectedFile.name : 'Файл не выбран'}
								</p>
								{getFormatBadge()}
							</div>
							<p className={s.fileHint}>
								{selectedFile
									? `Размер: ${(selectedFile.size / 1024).toFixed(2)} KB`
									: 'Поддерживаются текстовые файлы с последовательностью 0 и 1'}
							</p>
							{filePreview && (
								<m.div
									className={s.preview}
									initial={{opacity: 0, height: 0}}
									animate={{opacity: 1, height: 'auto'}}
									transition={{delay: 0.3}}
								>
									<p className={s.previewLabel}>Первые 200 символов:</p>
									<code className={s.previewCode}>{filePreview}...</code>
								</m.div>
							)}
						</div>

						<div className={s.actions}>
							<m.button
								className={s.selectBtn}
								onClick={handleSelectClick}
								disabled={isAnalyzing}
								whileHover={{scale: 1.05}}
								whileTap={{scale: 0.95}}
							>
								<Upload size={18} />
								Выбрать файл
							</m.button>

							{selectedFile && (
								<m.button
									className={s.startBtn}
									onClick={handleStartAnalysis}
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
					</div>
				</m.div>

				<m.div
					className={s.info}
					initial={{opacity: 0, x: 20}}
					animate={{opacity: 1, x: 0}}
					transition={{delay: 0.4}}
				>
					<h4 className={s.infoTitle}>Формат файла:</h4>
					<div className={s.infoList}>
						<m.p
							initial={{opacity: 0, x: -10}}
							animate={{opacity: 1, x: 0}}
							transition={{delay: 0.5}}
						>
							• Текстовый файл (.txt)
						</m.p>
						<m.p
							initial={{opacity: 0, x: -10}}
							animate={{opacity: 1, x: 0}}
							transition={{delay: 0.6}}
						>
							• Binary: 01101001... или HEX: A3F2E8...
						</m.p>
						<m.p
							initial={{opacity: 0, x: -10}}
							animate={{opacity: 1, x: 0}}
							transition={{delay: 0.7}}
						>
							• Минимум 100 битов (25 HEX символов)
						</m.p>
						<m.p
							initial={{opacity: 0, x: -10}}
							animate={{opacity: 1, x: 0}}
							transition={{delay: 0.8}}
						>
							• Экспортированные файлы поддерживаются
						</m.p>
					</div>
				</m.div>
			</div>
		</m.div>
	)
}
