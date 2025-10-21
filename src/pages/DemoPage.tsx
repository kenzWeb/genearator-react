import {AnimatePresence, motion} from 'framer-motion'
import {Check, Cog, Eye, Lock, Sparkles} from 'lucide-react'
import {useState} from 'react'
import {EntropyVisualizer} from '../components/EntropyVisualizer'
import type {EntropySource} from '../types'
import s from './DemoPage.module.css'

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
				<div className={s.card}>
					<div style={{display: 'grid', gap: 12}}>
						<div style={{display: 'flex', alignItems: 'center', gap: 12}}>
							<div
								style={{
									width: 48,
									height: 48,
									borderRadius: 12,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									background:
										'color-mix(in oklab, var(--cyan) 15%, transparent)',
									color: 'var(--cyan)',
								}}
							>
								<Cog size={24} />
							</div>
							<div>
								<h4 className={s.benefitTitle}>XOR Mixing</h4>
								<p className={s.benefitText}>
									Комбинирование источников энтропии
								</p>
							</div>
						</div>
						<div style={{display: 'flex', alignItems: 'center', gap: 12}}>
							<div
								style={{
									width: 48,
									height: 48,
									borderRadius: 12,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									background:
										'color-mix(in oklab, var(--mint) 15%, transparent)',
									color: 'var(--mint)',
								}}
							>
								<Lock size={24} />
							</div>
							<div>
								<h4 className={s.benefitTitle}>SHA-256 Hashing</h4>
								<p className={s.benefitText}>
									Создание криптографического хеша
								</p>
							</div>
						</div>
						<div style={{display: 'flex', alignItems: 'center', gap: 12}}>
							<div
								style={{
									width: 48,
									height: 48,
									borderRadius: 12,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									background: 'color-mix(in oklab, var(--bg) 40%, black 60%)',
									border:
										'1px solid color-mix(in oklab, var(--cyan) 20%, var(--border))',
									color: 'var(--cyan)',
								}}
							>
								<Sparkles size={24} />
							</div>
							<div>
								<h4 className={s.benefitTitle}>Финальная генерация</h4>
								<p className={s.benefitText}>
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
				<div className={s.card}>
					<div
						style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12}}
					>
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
								style={{
									background: 'color-mix(in oklab, var(--bg) 70%, black 30%)',
									border:
										'1px solid color-mix(in oklab, var(--cyan) 10%, var(--border))',
									borderRadius: 12,
									padding: 12,
								}}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										marginBottom: 8,
									}}
								>
									<span style={{fontWeight: 600, color: 'var(--text)'}}>
										{test}
									</span>
									<span style={{color: 'var(--mint)', display: 'flex'}}>
										<Check size={18} />
									</span>
								</div>
								<div
									style={{
										width: '100%',
										height: 8,
										borderRadius: 999,
										overflow: 'hidden',
										background: 'color-mix(in oklab, var(--bg) 70%, black 30%)',
										border:
											'1px solid color-mix(in oklab, var(--border) 70%, transparent)',
									}}
								>
									<motion.div
										initial={{width: 0}}
										animate={{width: '100%'}}
										transition={{delay: idx * 0.1 + 0.3, duration: 0.5}}
										style={{height: '100%', background: 'var(--cyan)'}}
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
				<div className={s.card} style={{textAlign: 'center'}}>
					<h3 className={s.stepTitle}>Результат генерации</h3>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							gap: 12,
							marginBottom: 16,
						}}
					>
						{[42, 17, 89, 33, 56, 91].map((num, idx) => (
							<motion.div
								key={idx}
								initial={{opacity: 0, scale: 0}}
								animate={{opacity: 1, scale: 1}}
								transition={{delay: idx * 0.1}}
								style={{
									width: 64,
									height: 64,
									background: 'var(--cyan)',
									color: '#0d1117',
									borderRadius: 12,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontSize: 24,
									fontWeight: 800,
									boxShadow: '0 0 20px rgba(0,191,255,.25)',
								}}
							>
								{num}
							</motion.div>
						))}
					</div>
					<div
						style={{
							background: 'color-mix(in oklab, var(--bg) 70%, black 30%)',
							border:
								'1px solid color-mix(in oklab, var(--cyan) 10%, var(--border))',
							borderRadius: 12,
							padding: 12,
							textAlign: 'left',
						}}
					>
						<p style={{color: 'var(--muted)', marginBottom: 6}}>
							SHA-256 Hash:
						</p>
						<p
							style={{
								fontFamily:
									'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
								fontSize: 12,
								color: 'var(--cyan)',
								wordBreak: 'break-all',
							}}
						>
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
		<div className={s.page}>
			<motion.div
				initial={{opacity: 0, y: -20}}
				animate={{opacity: 1, y: 0}}
				className={s.center}
			>
				<h2 className={s.title}>Демонстрация работы системы</h2>
				<p className={s.subtitle}>
					Пошаговая визуализация процесса генерации случайных чисел
				</p>
			</motion.div>

			<div className={s.card}>
				<div className={s.controls}>
					<div className={s.stepIndex}>
						<span>
							{currentStep + 1} / {steps.length}
						</span>
						<div className={s.dots}>
							{steps.map((_, idx) => (
								<button
									key={idx}
									onClick={() => setCurrentStep(idx)}
									className={`${s.dot} ${
										idx === currentStep ? s.dotActive : ''
									}`}
								/>
							))}
						</div>
					</div>
					<div className={s.btns}>
						<button
							onClick={handlePrev}
							disabled={currentStep === 0}
							className={`${s.btn} ${currentStep === 0 ? s.disabled : ''}`}
						>
							← Назад
						</button>
						<button
							onClick={handleAutoPlay}
							disabled={isPlaying}
							className={`${s.btn} ${s.primary} ${isPlaying ? s.disabled : ''}`}
						>
							{isPlaying ? 'Воспроизведение...' : '▶ Авто'}
						</button>
						<button
							onClick={handleNext}
							disabled={currentStep === steps.length - 1}
							className={`${s.btn} ${
								currentStep === steps.length - 1 ? s.disabled : ''
							}`}
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
						<h3 className={s.stepTitle}>{steps[currentStep].title}</h3>
						<p className={s.stepText}>{steps[currentStep].description}</p>
						{steps[currentStep].component}
					</motion.div>
				</AnimatePresence>
			</div>

			<div className={s.benefits}>
				<h3 className={s.benefitsTitle}>Ключевые преимущества</h3>
				<div className={s.benefitGrid}>
					<div className={s.benefit}>
						<div className={s.benefitIcon} style={{color: 'var(--text)'}}>
							<Lock size={24} />
						</div>
						<h4 className={s.benefitTitle}>Криптографическая стойкость</h4>
						<p className={s.benefitText}>
							Использование множественных источников энтропии и SHA-256
						</p>
					</div>
					<div className={s.benefit}>
						<div className={s.benefitIcon} style={{color: 'var(--text)'}}>
							<Check size={24} />
						</div>
						<h4 className={s.benefitTitle}>Проверяемость</h4>
						<p className={s.benefitText}>
							Каждый тираж может быть независимо верифицирован
						</p>
					</div>
					<div className={s.benefit}>
						<div className={s.benefitIcon} style={{color: 'var(--text)'}}>
							<Eye size={24} />
						</div>
						<h4 className={s.benefitTitle}>Прозрачность</h4>
						<p className={s.benefitText}>
							Полная визуализация процесса генерации
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
