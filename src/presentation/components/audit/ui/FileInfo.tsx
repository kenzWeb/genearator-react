import type {FileFormat} from '../hooks/useFileFormatDetector'
import s from './FileInfo.module.css'
import {FilePreview} from './FilePreview'
import {FormatBadge} from './FormatBadge'

interface FileInfoProps {
	file: File | null
	format: FileFormat
	preview: string
}

export const FileInfo = ({file, format, preview}: FileInfoProps) => {
	return (
		<div className={s.textContent}>
			<div className={s.fileInfo}>
				<p className={s.fileTitle}>{file ? file.name : 'Файл не выбран'}</p>
				{file && <FormatBadge format={format} />}
			</div>
			<p className={s.fileHint}>
				{file
					? `Размер: ${(file.size / 1024).toFixed(2)} KB`
					: 'Поддерживаются текстовые файлы с последовательностью 0 и 1'}
			</p>
			{file && <FilePreview preview={preview} />}
		</div>
	)
}
