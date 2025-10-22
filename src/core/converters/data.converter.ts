import {RNG_CONSTANTS} from '../../config/constants'

export function parseNumbersFromHex(
	hex: string,
	count: number,
	max: number = 50,
): number[] {
	const numbers: number[] = []
	const chunkLength = RNG_CONSTANTS.HEX_CHUNK_LENGTH

	for (let i = 0; i < count && i * chunkLength < hex.length; i++) {
		const chunk = hex.slice(i * chunkLength, (i + 1) * chunkLength)
		const num = parseInt(chunk, 16)
		numbers.push((num % max) + 1)
	}

	return numbers
}

export function hexToUint8Array(hex: string): Uint8Array {
	const bytes = new Uint8Array(hex.length / 2)
	for (let i = 0; i < hex.length; i += 2) {
		bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16)
	}
	return bytes
}

export function uint8ArrayToHex(bytes: Uint8Array): string {
	return Array.from(bytes)
		.map((byte) => byte.toString(16).padStart(2, '0'))
		.join('')
}

export function generateBinaryString(length: number): string {
	const bits = new Array(length)
	for (let i = 0; i < length; i++) {
		bits[i] = Math.random() < 0.5 ? '0' : '1'
	}
	return bits.join('')
}

export function binaryStringToUint8Array(binary: string): Uint8Array {
	const bytes = new Uint8Array(Math.ceil(binary.length / 8))
	for (let i = 0; i < bytes.length; i++) {
		const chunk = binary.slice(i * 8, (i + 1) * 8).padEnd(8, '0')
		bytes[i] = parseInt(chunk, 2)
	}
	return bytes
}
