import {EntropyVisualizer} from '../../components/EntropyVisualizer'
import type {EntropySource} from '../../types'
import {ProcessingStep} from './components/ProcessingStep'
import {ResultStep} from './components/ResultStep'
import {StatsTestsStep} from './components/StatsTestsStep'

export const demoSources: EntropySource[] = [
	{name: 'Mouse Movement', type: 'physical', collected: 50, quality: 0.92},
	{
		name: 'Timestamp Jitter',
		type: 'algorithmic',
		collected: 100,
		quality: 0.95,
	},
	{name: 'Web Crypto API', type: 'hybrid', collected: 256, quality: 1.0},
	{
		name: 'Atmospheric Noise Simulation',
		type: 'algorithmic',
		collected: 200,
		quality: 0.85,
	},
]

export const demoSteps = [
	{
		title: 'Шаг 1: Сбор энтропии',
		description:
			'Система собирает энтропию из множественных источников: движения мыши, временные флуктуации, криптографически стойкие генераторы и симуляция атмосферного шума.',
		component: <EntropyVisualizer sources={demoSources} isCollecting={true} />,
	},
	{
		title: 'Шаг 2: Обработка данных',
		description:
			'Собранная энтропия смешивается и обрабатывается через криптографические функции для создания финальной последовательности.',
		component: <ProcessingStep />,
	},
	{
		title: 'Шаг 3: Статистические тесты',
		description:
			'Сгенерированная последовательность проходит набор статистических тестов для подтверждения качества случайности.',
		component: <StatsTestsStep />,
	},
	{
		title: 'Шаг 4: Верификация и результат',
		description:
			'Создается цифровой слепок (hash) тиража для последующей верификации. Результат готов к использованию.',
		component: <ResultStep />,
	},
]
