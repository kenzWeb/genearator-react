import type {RandomSequence} from '../types'

export class VerificationService {
	async createHash(data: string): Promise<string> {
		const encoder = new TextEncoder()
		const dataBuffer = encoder.encode(data)
		const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer)
		const hashArray = Array.from(new Uint8Array(hashBuffer))
		return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
	}

	async createSequenceHash(sequence: RandomSequence): Promise<string> {
		const data = JSON.stringify({
			id: sequence.id,
			timestamp: sequence.timestamp,
			numbers: sequence.numbers,
			binaryData: sequence.binaryData,
		})
		return this.createHash(data)
	}

	async verifySequence(sequence: RandomSequence): Promise<boolean> {
		const calculatedHash = await this.createSequenceHash(sequence)
		return calculatedHash === sequence.hash
	}

	exportToBinaryFile(binaryData: number[]): Blob {
		const content = binaryData.join('')
		return new Blob([content], {type: 'text/plain'})
	}

	exportToTextFile(sequence: RandomSequence): Blob {
		const content = JSON.stringify(sequence, null, 2)
		return new Blob([content], {type: 'application/json'})
	}

	async parseBinaryFile(file: File): Promise<number[]> {
		const text = await file.text()
		const binary: number[] = []

		for (const char of text.trim()) {
			if (char === '0' || char === '1') {
				binary.push(parseInt(char))
			}
		}

		return binary
	}

	generateLargeBinarySequence(
		rng: {generateBinarySequence: (length: number) => number[]},
		length: number = 1000000,
	): number[] {
		return rng.generateBinarySequence(length)
	}

	downloadFile(blob: Blob, filename: string): void {
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = filename
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
		URL.revokeObjectURL(url)
	}
}
