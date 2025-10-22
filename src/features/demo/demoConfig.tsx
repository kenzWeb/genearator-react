import {EntropyVisualizer} from '../../components/EntropyVisualizer'
import type {EntropySource} from '../../types'
import {ProcessingStep} from './components/ProcessingStep'
import {ResultStep} from './components/ResultStep'
import {StatsTestsStep} from './components/StatsTestsStep'

export const demoSources: EntropySource[] = [
	{
		name: 'Wire Hum Analysis',
		type: 'physical',
		collected: 340,
		quality: 0.89,
	},
	{
		name: 'Lorenz Attractor',
		type: 'algorithmic',
		collected: 912,
		quality: 0.91,
	},
	{
		name: 'Spectral Analysis',
		type: 'hybrid',
		collected: 97,
		quality: 0.97,
	},
]

export const demoSteps = [
	{
		title: 'Шаг 1: Сбор энтропии из нестандартных источников',
		description:
			'RandomTrust Backend собирает энтропию из физических и хаотических систем: анализ электрических помех в силовых линиях (Wire Hum ~60 Гц), траектории аттрактора Лоренца (хаотическая система), спектральный анализ сигналов для обнаружения паттернов.',
		component: <EntropyVisualizer sources={demoSources} isCollecting={true} />,
	},
	{
		title: 'Шаг 2: Обработка через ChaCha20',
		description:
			'Собранная энтропия обрабатывается через криптографический алгоритм ChaCha20 Stream Cipher (RFC 8439). Это обеспечивает криптографическую стойкость финальной последовательности и исключает возможность предсказания результатов.',
		component: <ProcessingStep />,
	},
	{
		title: 'Шаг 3: Статистические тесты (NIST-совместимые)',
		description:
			'Сгенерированная последовательность автоматически проходит комплекс статистических тестов: Frequency Test (баланс 0/1), Runs Test (серии битов), Chi-Square Test (равномерность распределения). Критерий прохождения: p-value ≥ 0.01.',
		component: <StatsTestsStep />,
	},
	{
		title: 'Шаг 4: Верификация и экспорт',
		description:
			'Создается уникальный Run ID с метриками энтропии (SNR, Lyapunov, Spectral Deviation) для послетиражной проверки. Результат может быть экспортирован в формате JSON или как 1M+ битов для независимого аудита в NIST STS/Dieharder/TestU01.',
		component: <ResultStep />,
	},
]
