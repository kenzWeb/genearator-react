import type {TestResults} from '../../types'

export const getTestsList = (results: TestResults) => [
	results.frequencyTest,
	results.runsTest,
	results.chiSquareTest,
	results.serialCorrelationTest,
]

export const getChartData = (results: TestResults) =>
	getTestsList(results).map((t) => ({
		name: t.name,
		pValue: t.pValue,
		threshold: t.threshold,
	}))
