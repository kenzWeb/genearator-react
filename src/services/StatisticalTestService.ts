import {TEST_NAMES, TEST_THRESHOLD} from '../domain/constants/tests'
import type {StatisticalTest, TestResults} from '../types'

export class StatisticalTestService {
	frequencyTest(binaryData: number[]): StatisticalTest {
		const n = binaryData.length
		const ones = binaryData.filter((b) => b === 1).length
		const zeros = n - ones

		const statistic = Math.abs(ones - zeros) / Math.sqrt(n)
		const pValue = this.erfcc(statistic / Math.sqrt(2))

		return {
			name: TEST_NAMES.frequency,
			result: pValue >= TEST_THRESHOLD ? 'passed' : 'failed',
			pValue,
			threshold: TEST_THRESHOLD,
			description:
				'Tests if the number of ones and zeros are approximately equal',
		}
	}

	runsTest(binaryData: number[]): StatisticalTest {
		const n = binaryData.length
		const ones = binaryData.filter((b) => b === 1).length
		const proportion = ones / n

		if (Math.abs(proportion - 0.5) >= 2 / Math.sqrt(n)) {
			return {
				name: TEST_NAMES.runs,
				result: 'failed',
				pValue: 0,
				threshold: TEST_THRESHOLD,
				description:
					'Tests the number of runs (consecutive sequences of same bit)',
			}
		}

		let runs = 1
		for (let i = 1; i < n; i++) {
			if (binaryData[i] !== binaryData[i - 1]) {
				runs++
			}
		}

		const expectedRuns = 2 * n * proportion * (1 - proportion)
		const variance =
			2 *
			n *
			proportion *
			(1 - proportion) *
			(2 * n * proportion * (1 - proportion) - n)
		const statistic = Math.abs(runs - expectedRuns) / Math.sqrt(variance)
		const pValue = this.erfcc(statistic / Math.sqrt(2))

		return {
			name: TEST_NAMES.runs,
			result: pValue >= TEST_THRESHOLD ? 'passed' : 'failed',
			pValue,
			threshold: TEST_THRESHOLD,
			description:
				'Tests the number of runs (consecutive sequences of same bit)',
		}
	}

	chiSquareTest(binaryData: number[]): StatisticalTest {
		const blockSize = 8
		const numBlocks = Math.floor(binaryData.length / blockSize)
		const observed = new Array(256).fill(0)

		for (let i = 0; i < numBlocks; i++) {
			let value = 0
			for (let j = 0; j < blockSize; j++) {
				value = (value << 1) | binaryData[i * blockSize + j]
			}
			observed[value]++
		}

		const expected = numBlocks / 256
		let chiSquare = 0

		for (let i = 0; i < 256; i++) {
			chiSquare += Math.pow(observed[i] - expected, 2) / expected
		}

		const degreesOfFreedom = 255
		const pValue = this.chiSquarePValue(chiSquare, degreesOfFreedom)

		return {
			name: TEST_NAMES.chiSquare,
			result: pValue >= TEST_THRESHOLD ? 'passed' : 'failed',
			pValue,
			threshold: TEST_THRESHOLD,
			description: 'Tests the distribution of bit patterns',
		}
	}

	serialCorrelationTest(binaryData: number[]): StatisticalTest {
		const n = binaryData.length
		let sum = 0

		for (let i = 0; i < n - 1; i++) {
			sum += binaryData[i] * binaryData[i + 1]
		}

		const ones = binaryData.filter((b) => b === 1).length
		const proportion = ones / n

		const expected = n * proportion * proportion
		const variance = n * proportion * (1 - proportion) * (1 - 2 * proportion)
		const statistic = Math.abs(sum - expected) / Math.sqrt(Math.abs(variance))
		const pValue = this.erfcc(statistic / Math.sqrt(2))

		return {
			name: TEST_NAMES.serialCorrelation,
			result: pValue >= TEST_THRESHOLD ? 'passed' : 'failed',
			pValue,
			threshold: TEST_THRESHOLD,
			description: 'Tests for correlation between consecutive bits',
		}
	}

	runAllTests(binaryData: number[]): TestResults {
		const frequencyTest = this.frequencyTest(binaryData)
		const runsTest = this.runsTest(binaryData)
		const chiSquareTest = this.chiSquareTest(binaryData)
		const serialCorrelationTest = this.serialCorrelationTest(binaryData)

		const allPassed = [
			frequencyTest,
			runsTest,
			chiSquareTest,
			serialCorrelationTest,
		].every((test) => test.result === 'passed')

		return {
			frequencyTest,
			runsTest,
			chiSquareTest,
			serialCorrelationTest,
			overall: allPassed ? 'passed' : 'failed',
		}
	}

	private erfcc(x: number): number {
		const z = Math.abs(x)
		const t = 1 / (1 + z / 2)
		const r =
			t *
			Math.exp(
				-z * z -
					1.26551223 +
					t *
						(1.00002368 +
							t *
								(0.37409196 +
									t *
										(0.09678418 +
											t *
												(-0.18628806 +
													t *
														(0.27886807 +
															t *
																(-1.13520398 +
																	t *
																		(1.48851587 +
																			t * (-0.82215223 + t * 0.17087277)))))))),
			)
		return x >= 0 ? r : 2 - r
	}

	private chiSquarePValue(chiSquare: number, df: number): number {
		const gamma = this.gammaIncomplete(df / 2, chiSquare / 2)
		return 1 - gamma
	}

	private gammaIncomplete(s: number, z: number): number {
		if (z < 0) return 0
		if (z === 0) return 0

		let sum = 0
		let term = 1 / s

		for (let i = 0; i < 100; i++) {
			sum += term
			term *= z / (s + i + 1)
			if (Math.abs(term) < 1e-10) break
		}

		return (sum * Math.exp(-z) * Math.pow(z, s)) / this.gamma(s)
	}

	private gamma(z: number): number {
		if (z < 0.5) {
			return Math.PI / (Math.sin(Math.PI * z) * this.gamma(1 - z))
		}

		z -= 1
		const g = 7
		const coefficients = [
			0.99999999999980993, 676.5203681218851, -1259.1392167224028,
			771.32342877765313, -176.61502916214059, 12.507343278686905,
			-0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
		]

		let x = coefficients[0]
		for (let i = 1; i < g + 2; i++) {
			x += coefficients[i] / (z + i)
		}

		const t = z + g + 0.5
		return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x
	}
}
