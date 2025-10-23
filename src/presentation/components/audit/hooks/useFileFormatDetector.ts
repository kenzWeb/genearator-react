import {useEffect, useState} from 'react'

export type FileFormat = 'binary' | 'hex' | 'unknown'

interface UseFileFormatDetectorReturn {
	format: FileFormat
	preview: string
}

export const useFileFormatDetector = (
	file: File | null,
): UseFileFormatDetectorReturn => {
	const [format, setFormat] = useState<FileFormat>('unknown')
	const [preview, setPreview] = useState<string>('')

	useEffect(() => {
		if (!file) {
			setFormat('unknown')
			setPreview('')
			return
		}

		const detectFormat = async () => {
			try {
				const text = await file.text()
				const cleaned = text.replace(/\s+/g, '')

				setPreview(cleaned.slice(0, 200))

				if (/^[01]+$/.test(cleaned)) {
					setFormat('binary')
				} else if (/^[0-9a-fA-F]+$/.test(cleaned)) {
					setFormat('hex')
				} else {
					setFormat('unknown')
				}
			} catch {
				setFormat('unknown')
				setPreview('')
			}
		}

		detectFormat()
	}, [file])

	return {format, preview}
}
