import type {TestOutcomeView} from '../api'
import type {StatisticalTest, TestResults} from '../types'

export const mapTestOutcomesToResults = (
	outcomes: TestOutcomeView[],
): TestResults => {
	const defaultTest: StatisticalTest = {
		name: 'Unknown',
		result: 'pending',
		pValue: 0,
		threshold: 0,
		description: '',
	}

	const getTest = (index: number): StatisticalTest => {
		const outcome = outcomes[index]
		if (!outcome) return defaultTest

		return {
			name: outcome.name,
			result: outcome.passed ? 'passed' : 'failed',
			pValue: outcome.statistic,
			threshold: outcome.threshold || 0,
			description: getTestDescription(outcome.name),
		}
	}

	return {
		frequencyTest: getTest(0),
		runsTest: getTest(1),
		chiSquareTest: getTest(2),
		serialCorrelationTest: {
			name: 'Serial Correlation',
			result: 'pending',
			pValue: 0,
			threshold: 0,
			description: 'Тест корреляции',
		},
		overall: outcomes.every((t) => t.passed) ? 'passed' : 'failed',
	}
}

const getTestDescription = (testName: string): string => {
	const descriptions: Record<string, string> = {
		frequency: 'Тест частотности',
		runs: 'Тест серий',
		chi_square: 'Тест хи-квадрат',
		'Chi-Square Test': 'Тест хи-квадрат',
		'Frequency Test': 'Тест частотности',
		'Runs Test': 'Тест серий',
	}

	return descriptions[testName] || testName
}
