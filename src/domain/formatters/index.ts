import type {StatisticalTest} from '../../types'

export const formatPValue = (n: number): string => n.toFixed(4)

export const formatTimestamp = (ts: number): string =>
	new Date(ts).toLocaleString()

export const resultLabel = (result: StatisticalTest['result']): string => {
	switch (result) {
		case 'passed':
			return 'Пройден'
		case 'failed':
			return 'Провален'
		default:
			return 'В процессе'
	}
}

export const overallLabel = (
	status: 'passed' | 'failed' | 'pending',
): string => {
	switch (status) {
		case 'passed':
			return '✓ Пройдено'
		case 'failed':
			return '✗ Не пройдено'
		default:
			return 'В процессе'
	}
}
