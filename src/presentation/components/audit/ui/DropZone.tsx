import {m} from 'framer-motion'
import {useRef} from 'react'
import type {FileFormat} from '../hooks/useFileFormatDetector'
import {ActionButtons} from './ActionButtons'
import s from './DropZone.module.css'
import {FileInfo} from './FileInfo'
import {UploadIcon} from './UploadIcon'

interface DropZoneProps {
	file: File | null
	format: FileFormat
	preview: string
	isAnalyzing: boolean
	onFileChange: (file: File) => void
	onStartAnalysis: () => void
}

export const DropZone = ({
	file,
	format,
	preview,
	isAnalyzing,
	onFileChange,
	onStartAnalysis,
}: DropZoneProps) => {
	const inputRef = useRef<HTMLInputElement>(null)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0]
		if (selectedFile) {
			onFileChange(selectedFile)
		}
	}

	const handleSelectClick = () => {
		inputRef.current?.click()
	}

	return (
		<m.div
			className={s.drop}
			whileHover={!isAnalyzing ? {scale: 1.02} : {}}
			transition={{type: 'spring', stiffness: 300}}
		>
			<input
				ref={inputRef}
				type='file'
				accept='.txt,.bin'
				onChange={handleInputChange}
				className={s.hidden}
				id='file-upload'
				disabled={isAnalyzing}
			/>

			<div className={s.content}>
				<UploadIcon hasFile={!!file} />
				<FileInfo file={file} format={format} preview={preview} />
				<ActionButtons
					hasFile={!!file}
					isAnalyzing={isAnalyzing}
					onSelectClick={handleSelectClick}
					onStartAnalysis={onStartAnalysis}
				/>
			</div>
		</m.div>
	)
}
