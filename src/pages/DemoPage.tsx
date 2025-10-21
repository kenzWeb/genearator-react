import {AnimatePresence, motion} from 'framer-motion'
import {useState} from 'react'
import {EntropyVisualizer} from '../components/EntropyVisualizer'
import type {EntropySource} from '../types'

export const DemoPage = () => {
	const [currentStep, setCurrentStep] = useState(0)
	const [isPlaying, setIsPlaying] = useState(false)

	const demoSources: EntropySource[] = [
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

	const steps = [
		{
			title: 'Шаг 1: Сбор энтропии',
			description:
				'Система собирает энтропию из множественных источников: движения мыши, временные флуктуации, криптографически стойкие генераторы и симуляция атмосферного шума.',
			component: (
				<EntropyVisualizer sources={demoSources} isCollecting={true} />
			),
		},
		{
			title: 'Шаг 2: Обработка данных',
			description:
				'Собранная энтропия смешивается и обрабатывается через криптографические функции для создания финальной последовательности.',
			component: (
				<div className='bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20'>
					<div className='space-y-4'>
						<div className='flex items-center space-x-4'>
							<div className='w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center'>
								⚙️
							</div>
							<div>
								<h4 className='font-semibold text-purple-300'>XOR Mixing</h4>
								<p className='text-sm text-gray-400'>
									Комбинирование источников энтропии
								</p>
							</div>
						</div>
						<div className='flex items-center space-x-4'>
							<div className='w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center'>
								🔐
							</div>
							<div>
								<h4 className='font-semibold text-blue-300'>SHA-256 Hashing</h4>
								<p className='text-sm text-gray-400'>
									Создание криптографического хеша
								</p>
							</div>
						</div>
						<div className='flex items-center space-x-4'>
							<div className='w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center'>
								✨
							</div>
							<div>
								<h4 className='font-semibold text-green-300'>
									Финальная генерация
								</h4>
								<p className='text-sm text-gray-400'>
									Преобразование в случайные числа
								</p>
							</div>
						</div>
					</div>
				</div>
			),
		},
		{
			title: 'Шаг 3: Статистические тесты',
			description:
				'Сгенерированная последовательность проходит набор статистических тестов для подтверждения качества случайности.',
			component: (
				<div className='bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20'>
					<div className='grid grid-cols-2 gap-4'>
						{[
							'Frequency Test',
							'Runs Test',
							'Chi-Square Test',
							'Serial Correlation',
						].map((test, idx) => (
							<motion.div
								key={test}
								initial={{opacity: 0, scale: 0.8}}
								animate={{opacity: 1, scale: 1}}
								transition={{delay: idx * 0.1}}
								className='bg-black/20 rounded-lg p-4'
							>
								<div className='flex items-center justify-between mb-2'>
									<span className='font-medium text-gray-200'>{test}</span>
									<span className='text-green-400'>✓</span>
								</div>
								<div className='w-full bg-gray-700/50 rounded-full h-2 overflow-hidden'>
									<motion.div
										initial={{width: 0}}
										animate={{width: '100%'}}
										transition={{delay: idx * 0.1 + 0.3, duration: 0.5}}
										className='h-full bg-green-500'
									/>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			),
		},
		{
			title: 'Шаг 4: Верификация и результат',
			description:
				'Создается цифровой слепок (hash) тиража для последующей верификации. Результат готов к использованию.',
			component: (
				<div className='bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20 text-center'>
					<h3 className='text-2xl font-semibold mb-6 text-purple-300'>
						Результат генерации
					</h3>
					<div className='flex justify-center gap-4 mb-6'>
						{[42, 17, 89, 33, 56, 91].map((num, idx) => (
							<motion.div
								key={idx}
								initial={{opacity: 0, scale: 0}}
								animate={{opacity: 1, scale: 1}}
								transition={{delay: idx * 0.1}}
								className='w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg'
							>
								{num}
							</motion.div>
						))}
					</div>
					<div className='bg-black/20 rounded-lg p-4 text-left text-sm'>
						<p className='text-gray-400 mb-2'>SHA-256 Hash:</p>
						<p className='font-mono text-xs text-purple-300 break-all'>
							a7f2c4e8d9b1f3a6c5e8d2b9f1a3c6e8d9b2f4a7c5e8d1b3f6a9c2e5d8b1f4a7
						</p>
					</div>
				</div>
			),
		},
	]

	const handleNext = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1)
		}
	}

	const handlePrev = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1)
		}
	}

	const handleAutoPlay = () => {
		setIsPlaying(true)
		const interval = setInterval(() => {
			setCurrentStep((prev) => {
				if (prev >= steps.length - 1) {
					setIsPlaying(false)
					clearInterval(interval)
					return prev
				}
				return prev + 1
			})
		}, 3000)
	}

	return (
		<div className='space-y-6'>
			<motion.div
				initial={{opacity: 0, y: -20}}
				animate={{opacity: 1, y: 0}}
				className='text-center'
			>
				<h2 className='text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>
					Демонстрация работы системы
				</h2>
				<p className='text-gray-400 max-w-2xl mx-auto'>
					Пошаговая визуализация процесса генерации случайных чисел
				</p>
			</motion.div>

			<div className='bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20'>
				<div className='flex items-center justify-between mb-6'>
					<div className='flex items-center space-x-4'>
						<span className='text-2xl font-bold text-purple-400'>
							{currentStep + 1} / {steps.length}
						</span>
						<div className='flex space-x-2'>
							{steps.map((_, idx) => (
								<button
									key={idx}
									onClick={() => setCurrentStep(idx)}
									className={`w-3 h-3 rounded-full transition-all ${
										idx === currentStep
											? 'bg-purple-500 w-8'
											: 'bg-gray-600 hover:bg-gray-500'
									}`}
								/>
							))}
						</div>
					</div>

					<div className='flex space-x-2'>
						<button
							onClick={handlePrev}
							disabled={currentStep === 0}
							className='px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
						>
							← Назад
						</button>
						<button
							onClick={handleAutoPlay}
							disabled={isPlaying}
							className='px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
						>
							{isPlaying ? 'Воспроизведение...' : '▶ Авто'}
						</button>
						<button
							onClick={handleNext}
							disabled={currentStep === steps.length - 1}
							className='px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
						>
							Далее →
						</button>
					</div>
				</div>

				<AnimatePresence mode='wait'>
					<motion.div
						key={currentStep}
						initial={{opacity: 0, x: 20}}
						animate={{opacity: 1, x: 0}}
						exit={{opacity: 0, x: -20}}
						transition={{duration: 0.3}}
					>
						<h3 className='text-2xl font-semibold mb-4 text-purple-300'>
							{steps[currentStep].title}
						</h3>
						<p className='text-gray-300 mb-6'>
							{steps[currentStep].description}
						</p>
						{steps[currentStep].component}
					</motion.div>
				</AnimatePresence>
			</div>

			<div className='bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20'>
				<h3 className='text-xl font-semibold mb-4 text-purple-300'>
					Ключевые преимущества
				</h3>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					<div className='bg-black/20 rounded-lg p-4'>
						<div className='text-3xl mb-2'>🔒</div>
						<h4 className='font-semibold text-purple-300 mb-2'>
							Криптографическая стойкость
						</h4>
						<p className='text-sm text-gray-400'>
							Использование множественных источников энтропии и SHA-256
						</p>
					</div>
					<div className='bg-black/20 rounded-lg p-4'>
						<div className='text-3xl mb-2'>✅</div>
						<h4 className='font-semibold text-green-300 mb-2'>Проверяемость</h4>
						<p className='text-sm text-gray-400'>
							Каждый тираж может быть независимо верифицирован
						</p>
					</div>
					<div className='bg-black/20 rounded-lg p-4'>
						<div className='text-3xl mb-2'>👁️</div>
						<h4 className='font-semibold text-blue-300 mb-2'>Прозрачность</h4>
						<p className='text-sm text-gray-400'>
							Полная визуализация процесса генерации
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
