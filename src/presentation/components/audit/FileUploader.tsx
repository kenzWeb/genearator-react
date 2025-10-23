import {m} from 'framer-motion'
import {useState} from 'react'
import s from './FileUploader.module.css'
import {useFileFormatDetector} from './hooks/useFileFormatDetector'
import {DropZone} from './ui/DropZone'
import {FormatInstructions} from './ui/FormatInstructions'

interface FileUploaderProps {
	isAnalyzing: boolean
	onFileSelect: (file: File) => void
}

/**
 * Компонент загрузки файла для аудита
 * Декомпозирован на подкомпоненты: DropZone, FileInfo, ActionButtons, FormatInstructions
 */
export const FileUploader = ({
	isAnalyzing,
	onFileSelect,
}: FileUploaderProps) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const {format, preview} = useFileFormatDetector(selectedFile)

	const handleFileChange = (file: File) => {
		setSelectedFile(file)
	}

	const handleStartAnalysis = () => {
		if (selectedFile) {
			onFileSelect(selectedFile)
		}
	}

	return (
		<m.div
			initial={{opacity: 0, scale: 0.98}}
			animate={{opacity: 1, scale: 1}}
			transition={{delay: 0.2}}
			className={s.card}
		>
			<div className={s.inner}>
				<DropZone
					file={selectedFile}
					format={format}
					preview={preview}
					isAnalyzing={isAnalyzing}
					onFileChange={handleFileChange}
					onStartAnalysis={handleStartAnalysis}
				/>
				<FormatInstructions />
			</div>
		</m.div>
	)
}
