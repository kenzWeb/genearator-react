import {m} from 'framer-motion'
import s from './FormatInstructions.module.css'

const INSTRUCTIONS = [
	'Текстовый файл (.txt)',
	'Binary: 01101001... или HEX: A3F2E8...',
	'Минимум 100 битов (25 HEX символов)',
	'Экспортированные файлы поддерживаются',
] as const

export const FormatInstructions = () => {
	return (
		<m.div
			className={s.info}
			initial={{opacity: 0, x: 20}}
			animate={{opacity: 1, x: 0}}
			transition={{delay: 0.4}}
		>
			<h4 className={s.title}>Формат файла:</h4>
			<div className={s.list}>
				{INSTRUCTIONS.map((instruction, index) => (
					<m.p
						key={index}
						initial={{opacity: 0, x: -10}}
						animate={{opacity: 1, x: 0}}
						transition={{delay: 0.5 + index * 0.1}}
					>
						• {instruction}
					</m.p>
				))}
			</div>
		</m.div>
	)
}
