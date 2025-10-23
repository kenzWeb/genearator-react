import {motion} from 'framer-motion'
import {AlertCircle, BarChart3, Shuffle, TrendingUp} from 'lucide-react'
import s from './TestInterpretation.module.css'

export const TestInterpretation = () => {
	const interpretations = [
		{
			icon: <BarChart3 size={24} />,
			title: 'Frequency Test',
			description:
				'Проверяет баланс между 0 и 1. Последовательность должна содержать примерно равное количество нулей и единиц.',
			delay: 0.1,
		},
		{
			icon: <Shuffle size={24} />,
			title: 'Runs Test',
			description:
				'Анализирует количество серий (последовательных одинаковых битов). Слишком много или слишком мало серий указывает на неслучайность.',
			delay: 0.2,
		},
		{
			icon: <TrendingUp size={24} />,
			title: 'Chi-Square Test',
			description:
				'Проверяет равномерность распределения битовых паттернов. Выявляет аномалии в распределении.',
			delay: 0.3,
		},
		{
			icon: <AlertCircle size={24} />,
			title: 'Serial Correlation',
			description:
				'Проверяет корреляцию между последовательными битами. Высокая корреляция указывает на предсказуемость.',
			delay: 0.4,
		},
	]

	return (
		<div className={s.resultCard}>
			<motion.h3
				className={s.resultTitle}
				initial={{opacity: 0, y: -10}}
				animate={{opacity: 1, y: 0}}
			>
				Интерпретация результатов
			</motion.h3>
			<div className={s.explain}>
				{interpretations.map((item) => (
					<motion.div
						key={item.title}
						className={s.explanationItem}
						initial={{opacity: 0, x: -20}}
						animate={{opacity: 1, x: 0}}
						transition={{delay: item.delay}}
						whileHover={{x: 10, transition: {duration: 0.2}}}
					>
						<motion.div
							className={s.iconWrapper}
							whileHover={{rotate: 360, transition: {duration: 0.6}}}
						>
							{item.icon}
						</motion.div>
						<div className={s.textContent}>
							<strong className={s.accent}>{item.title}:</strong>{' '}
							{item.description}
						</div>
					</motion.div>
				))}
			</div>
		</div>
	)
}
