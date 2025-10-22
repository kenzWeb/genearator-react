export function binaryToHex(binary: string): string {
	const cleaned = binary.replace(/\s/g, '')
	let hex = ''
	for (let i = 0; i < cleaned.length; i += 4) {
		const chunk = cleaned.slice(i, i + 4).padEnd(4, '0')
		hex += parseInt(chunk, 2).toString(16)
	}
	return hex
}

export function hexToBinary(hex: string): string {
	return hex
		.split('')
		.map((char) => parseInt(char, 16).toString(2).padStart(4, '0'))
		.join('')
}

export function readFileAsText(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = (e) => resolve(e.target?.result as string)
		reader.onerror = (e) => reject(e)
		reader.readAsText(file)
	})
}

export function downloadBlob(blob: Blob, filename: string): void {
	const url = URL.createObjectURL(blob)
	const a = document.createElement('a')
	a.href = url
	a.download = filename
	document.body.appendChild(a)
	a.click()
	document.body.removeChild(a)

	setTimeout(() => {
		URL.revokeObjectURL(url)
	}, 100)
}

export function downloadJSON(data: unknown, filename: string): void {
	const json = JSON.stringify(data, null, 2)
	const blob = new Blob([json], {type: 'application/json'})
	downloadBlob(blob, filename)
}
