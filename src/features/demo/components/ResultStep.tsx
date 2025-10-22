import {motion} from 'framer-motion'
import {Download, FileJson, Sparkles} from 'lucide-react'
import styles from './styles/ResultStep.module.css'

export const ResultStep = () => (
	<div className={styles.card}>
		<motion.div
			initial={{opacity: 0, y: -20}}
			animate={{opacity: 1, y: 0}}
			transition={{duration: 0.6}}
			className={styles.titleWrapper}
		>
			<Sparkles className={styles.titleIcon} size={24} />
			<h3 className={styles.title}>Результат генерации (6 чисел)</h3>
		</motion.div>

		<div className={styles.numbers}>
			{[42, 17, 89, 33, 56, 91].map((num, idx) => (
				<motion.div
					key={idx}
					initial={{opacity: 0, scale: 0, rotateY: 180}}
					animate={{opacity: 1, scale: 1, rotateY: 0}}
					transition={{
						delay: idx * 0.15,
						duration: 0.6,
						type: 'spring',
						stiffness: 200,
					}}
					whileHover={{
						scale: 1.1,
						rotateZ: 5,
						transition: {duration: 0.2},
					}}
					className={styles.num}
				>
					{num}
				</motion.div>
			))}
		</div>

		<div className={styles.metricsGrid}>
			{[
				{label: 'Run ID:', value: '903d8a3c-bb20-45e0-944c...'},
				{label: 'Timestamp:', value: '2025-10-23T10:30:45.123Z'},
				{label: 'SNR (dB):', value: '34.56'},
				{label: 'Lyapunov Exp:', value: '0.9123'},
				{label: 'Spectral Dev:', value: '2.45%'},
				{label: 'Тесты:', value: '✓ Все пройдены', success: true},
			].map((metric, idx) => (
				<motion.div
					key={metric.label}
					initial={{opacity: 0, x: -20}}
					animate={{opacity: 1, x: 0}}
					transition={{delay: 0.9 + idx * 0.1}}
					whileHover={{scale: 1.05, transition: {duration: 0.2}}}
					className={styles.metricItem}
				>
					<span className={styles.metricLabel}>{metric.label}</span>
					<span
						className={
							metric.success ? styles.metricValueSuccess : styles.metricValue
						}
					>
						{metric.value}
					</span>
				</motion.div>
			))}
		</div>

		<motion.div
			initial={{opacity: 0, y: 20}}
			animate={{opacity: 1, y: 0}}
			transition={{delay: 1.5}}
			className={styles.exportSection}
		>
			<h4 className={styles.exportTitle}>Возможности экспорта:</h4>
			<div className={styles.exportButtons}>
				<motion.div
					whileHover={{scale: 1.05, y: -5}}
					whileTap={{scale: 0.95}}
					className={styles.exportBtn}
				>
					<FileJson size={20} />
					<div>
						<div className={styles.exportBtnTitle}>JSON (полный отчёт)</div>
						<div className={styles.exportBtnDesc}>
							Числа, метрики, результаты тестов
						</div>
					</div>
				</motion.div>
				<motion.div
					whileHover={{scale: 1.05, y: -5}}
					whileTap={{scale: 0.95}}
					className={styles.exportBtn}
				>
					<Download size={20} />
					<div>
						<div className={styles.exportBtnTitle}>1M битов (TXT)</div>
						<div className={styles.exportBtnDesc}>
							Для проверки в NIST STS/Dieharder
						</div>
					</div>
				</motion.div>
			</div>
		</motion.div>

		<motion.div
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			transition={{delay: 1.8}}
			className={styles.apiNote}
		>
			<strong>API Endpoint:</strong> GET /api/rng/runs/{'<run_id>'}
			/export?min_bits=1000000
		</motion.div>
	</div>
)
