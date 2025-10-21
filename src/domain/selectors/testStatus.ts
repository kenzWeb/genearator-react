import type {TestResults} from '../../types'

export const overallBadgeClass = (
	s: TestResults['overall'],
	styles: Record<string, string>,
) =>
	`${styles.badge} ${
		s === 'passed' ? styles.ok : s === 'failed' ? styles.bad : ''
	}`
