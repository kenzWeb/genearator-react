import {motion} from 'framer-motion'
import {Check} from 'lucide-react'
import styles from './styles/StatsTestsStep.module.css'

export const StatsTestsStep = () => (
	<div className={styles.card}>
		<div className={styles.grid}>
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
					className={styles.tile}
				>
					<div className={styles.row}>
						<span className={styles.title}>{test}</span>
						<span className={styles.ok}>
							<Check size={18} />
						</span>
					</div>
					<div className={styles.bar}>
						<motion.div
							initial={{width: 0}}
							animate={{width: '100%'}}
							transition={{delay: idx * 0.1 + 0.3, duration: 0.5}}
							className={styles.fill}
						/>
					</div>
				</motion.div>
			))}
		</div>
	</div>
)
