import {AnimatePresence, motion} from 'framer-motion'
import {Check, Eye, Lock} from 'lucide-react'
import {useDemoStepper} from '../features/demo/useDemoStepper'
import s from './DemoPage.module.css'

export const DemoPage = () => {
	const {steps, currentStep, isPlaying, next, prev, goTo, play} =
		useDemoStepper()

	return (
		<div className={s.page}>
			<motion.div
				initial={{opacity: 0, y: -20}}
				animate={{opacity: 1, y: 0}}
				className={s.center}
			>
				<h2 className={s.title}>Демонстрация работы системы</h2>
				<p className={s.subtitle}>
					Пошаговая визуализация принципов работы RandomTrust: от сбора энтропии
					до статистической верификации результатов
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
									onClick={() => goTo(idx)}
									className={`${s.dot} ${
										idx === currentStep ? s.dotActive : ''
									}`}
								/>
							))}
						</div>
					</div>
					<div className={s.btns}>
						<button
							onClick={prev}
							disabled={currentStep === 0}
							className={`${s.btn} ${currentStep === 0 ? s.disabled : ''}`}
						>
							← Назад
						</button>
						<button
							onClick={play}
							disabled={isPlaying}
							className={`${s.btn} ${s.primary} ${isPlaying ? s.disabled : ''}`}
						>
							{isPlaying ? 'Воспроизведение...' : '▶ Авто'}
						</button>
						<button
							onClick={next}
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
							Нестандартные источники энтропии + алгоритм ChaCha20
						</p>
					</div>
					<div className={s.benefit}>
						<div className={s.benefitIcon} style={{color: 'var(--text)'}}>
							<Check size={24} />
						</div>
						<h4 className={s.benefitTitle}>Проверяемость</h4>
						<p className={s.benefitText}>
							Экспорт 1M+ битов для независимого аудита в NIST STS/Dieharder
						</p>
					</div>
					<div className={s.benefit}>
						<div className={s.benefitIcon} style={{color: 'var(--text)'}}>
							<Eye size={24} />
						</div>
						<h4 className={s.benefitTitle}>Прозрачность</h4>
						<p className={s.benefitText}>
							Визуализация метрик энтропии и статистических тестов в реальном
							времени
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
