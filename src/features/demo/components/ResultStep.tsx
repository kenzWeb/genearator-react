import {motion} from 'framer-motion'
import styles from './styles/ResultStep.module.css'

export const ResultStep = () => (
	<div className={styles.card}>
		<h3 className={styles.title}>Результат генерации</h3>
		<div className={styles.numbers}>
			{[42, 17, 89, 33, 56, 91].map((num, idx) => (
				<motion.div
					key={idx}
					initial={{opacity: 0, scale: 0}}
					animate={{opacity: 1, scale: 1}}
					transition={{delay: idx * 0.1}}
					className={styles.num}
				>
					{num}
				</motion.div>
			))}
		</div>
		<div className={styles.hashBox}>
			<p className={styles.hashLabel}>SHA-256 Hash:</p>
			<p className={styles.hashValue}>
				a7f2c4e8d9b1f3a6c5e8d2b9f1a3c6e8d9b2f4a7c5e8d1b3f6a9c2e5d8b1f4a7
			</p>
		</div>
	</div>
)
