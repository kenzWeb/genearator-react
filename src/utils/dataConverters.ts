export const binaryToHex = (binary: string): string => {
	const cleaned = binary.replace(/\s/g, '')
	let hex = ''
	for (let i = 0; i < cleaned.length; i += 4) {
		const chunk = cleaned.slice(i, i + 4).padEnd(4, '0')
		hex += parseInt(chunk, 2).toString(16)
	}
	return hex
}

export const hexToBinary = (hex: string): string => {
	return hex
		.split('')
		.map((char) => parseInt(char, 16).toString(2).padStart(4, '0'))
		.join('')
}

export const parseNumbersFromHex = (
	hex: string,
	count: number,
	max: number = 50,
): number[] => {
	const numbers: number[] = []
	for (let i = 0; i < count; i++) {
		const chunk = hex.slice(i * 8, (i + 1) * 8)
		const num = (parseInt(chunk, 16) % max) + 1
		numbers.push(num)
	}
	return numbers
}

export const readFileAsText = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = (e) => resolve(e.target?.result as string)
		reader.onerror = (e) => reject(e)
		reader.readAsText(file)
	})
}

export const downloadBlob = (blob: Blob, filename: string): void => {
	const url = URL.createObjectURL(blob)
	const a = document.createElement('a')
	a.href = url
	a.download = filename
	document.body.appendChild(a) // Добавляем элемент в DOM
	a.click()
	document.body.removeChild(a) // Удаляем после клика

	// Задержка перед очисткой URL для надёжности
	setTimeout(() => {
		URL.revokeObjectURL(url)
	}, 100)
}

export const downloadJSON = (data: unknown, filename: string): void => {
	const blob = new Blob([JSON.stringify(data, null, 2)], {
		type: 'application/json',
	})
	downloadBlob(blob, filename)
}
