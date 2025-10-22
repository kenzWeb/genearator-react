import {motion} from 'framer-motion'
import s from './TestInterpretation.module.css'

export const TestInterpretation = () => {
	return (
		<motion.div
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			className={s.resultCard}
		>
			<h3 className={s.resultTitle}>Интерпретация результатов</h3>
			<div className={s.explain}>
				<p>
					<strong className={s.accent}>Frequency Test:</strong> Проверяет баланс
					между 0 и 1. Последовательность должна содержать примерно равное
					количество нулей и единиц.
				</p>
				<p>
					<strong className={s.accent}>Runs Test:</strong> Анализирует
					количество серий (последовательных одинаковых битов). Слишком много
					или слишком мало серий указывает на неслучайность.
				</p>
				<p>
					<strong className={s.accent}>Chi-Square Test:</strong> Проверяет
					равномерность распределения битовых паттернов. Выявляет аномалии в
					распределении.
				</p>
				<p>
					<strong className={s.accent}>Serial Correlation:</strong> Проверяет
					корреляцию между последовательными битами. Высокая корреляция
					указывает на предсказуемость.
				</p>
			</div>
		</motion.div>
	)
}
