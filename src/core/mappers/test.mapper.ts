import type {StatisticalTest, TestResults} from '../../core/domain/models'

export interface TestOutcomeView {
	name: string
	passed: boolean
	p_value: number
	description: string
}

export function mapTestOutcomesToResults(
	testResults?: TestResults,
): TestOutcomeView[] {
	if (!testResults) return []

	const tests: StatisticalTest[] = [
		testResults.frequencyTest,
		testResults.runsTest,
		testResults.chiSquareTest,
		testResults.serialCorrelationTest,
	]

	return tests.map((test) => ({
		name: test.name,
		passed: test.result === 'passed',
		p_value: test.pValue,
		description: test.description,
	}))
}
