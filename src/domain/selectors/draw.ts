import type {VisualizationState} from '../../types'

export const getProgressLabel = (
	stage: VisualizationState['stage'],
): string => {
	switch (stage) {
		case 'collecting':
			return 'Сбор энтропии...'
		case 'processing':
			return 'Обработка данных...'
		case 'testing':
			return 'Запуск тестов...'
		case 'complete':
			return 'Завершено'
		case 'idle':
		default:
			return ''
	}
}

export const getVerificationLabel = (verified: boolean): string =>
	verified ? '✓ Подтверждено' : '✗ Ошибка'

export const formatMs = (ms: number): string => `${ms}ms`
