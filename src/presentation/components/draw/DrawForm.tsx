import {motion} from 'framer-motion'
import s from './DrawForm.module.css'

interface DrawFormProps {
	numbersCount: number
	isGenerating: boolean
	onNumbersCountChange: (count: number) => void
	onGenerate: () => void
}

export const DrawForm = ({
	numbersCount,
	isGenerating,
	onNumbersCountChange,
	onGenerate,
}: DrawFormProps) => {
	return (
		<motion.div
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			transition={{delay: 0.2}}
			className={s.card}
		>
			<div className={s.grid}>
				<div>
					<label className={s.label}>Количество чисел</label>
					<div className={s.inputRow}>
						<input
							type='number'
							min='1'
							max='1000000'
							value={numbersCount}
							onChange={(e) =>
								onNumbersCountChange(parseInt(e.target.value) || 1)
							}
							className={s.input}
							disabled={isGenerating}
						/>
						<div className={s.spinners}>
							<button
								type='button'
								className={s.spinUp}
								onClick={() =>
									onNumbersCountChange(Math.min(1000000, numbersCount + 1))
								}
								disabled={isGenerating || numbersCount >= 1000000}
								aria-label='Увеличить'
							>
								<svg
									width='12'
									height='12'
									viewBox='0 0 12 12'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path d='M6 3L9 6L3 6L6 3Z' fill='currentColor' />
								</svg>
							</button>
							<button
								type='button'
								className={s.spinDown}
								onClick={() =>
									onNumbersCountChange(Math.max(1, numbersCount - 1))
								}
								disabled={isGenerating || numbersCount <= 1}
								aria-label='Уменьшить'
							>
								<svg
									width='12'
									height='12'
									viewBox='0 0 12 12'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path d='M6 9L3 6L9 6L6 9Z' fill='currentColor' />
								</svg>
							</button>
						</div>
					</div>
				</div>

				<div className={s.actions}>
					<button
						onClick={onGenerate}
						disabled={isGenerating}
						className={`${s.btn} ${s.primary} ${
							isGenerating ? s.disabled : ''
						}`}
					>
						{isGenerating ? 'Генерация...' : 'Сгенерировать'}
					</button>
				</div>
			</div>
		</motion.div>
	)
}
