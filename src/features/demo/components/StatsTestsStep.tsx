import {m} from 'framer-motion'
import {Check, XCircle} from 'lucide-react'
import styles from './styles/StatsTestsStep.module.css'

const demoTests = [
	{
		name: 'Frequency Test',
		passed: true,
		pValue: 0.543,
		description: 'Баланс 0 и 1 в последовательности',
	},
	{
		name: 'Runs Test',
		passed: true,
		pValue: 0.678,
		description: 'Анализ серий одинаковых битов',
	},
	{
		name: 'Chi-Square Test',
		passed: true,
		pValue: 0.432,
		description: 'Равномерность распределения паттернов',
	},
	{
		name: 'Serial Correlation',
		passed: true,
		pValue: 0.85,
		description: 'Проверка корреляции между битами',
	},
]

export const StatsTestsStep = () => (
	<div className={styles.card}>
		<div className={styles.header}>
			<h4
				style={{
					fontSize: 18,
					fontWeight: 700,
					color: 'var(--cyan)',
					marginBottom: 8,
				}}
			>
				POST /api/analysis/runs/{'<run_id>'}
			</h4>
			<p style={{fontSize: 13, color: 'var(--muted)', marginBottom: 16}}>
				Автоматический запуск статистических тестов. Критерий: p-value ≥ 0.01
			</p>
		</div>
		<div className={styles.grid}>
			{demoTests.map((test, idx) => (
				<m.div
					key={test.name}
					initial={{opacity: 0, scale: 0.8}}
					animate={{opacity: 1, scale: 1}}
					transition={{delay: idx * 0.15}}
					className={styles.tile}
				>
					<div className={styles.row}>
						<div>
							<span className={styles.title}>{test.name}</span>
							<p className={styles.description}>{test.description}</p>
						</div>
						<span className={test.passed ? styles.ok : styles.fail}>
							{test.passed ? <Check size={18} /> : <XCircle size={18} />}
						</span>
					</div>
					<div className={styles.meta}>
						<span className={styles.label}>p-value:</span>
						<span className={styles.value}>{test.pValue.toFixed(3)}</span>
					</div>
					<div className={styles.bar}>
						<m.div
							initial={{width: 0}}
							animate={{width: `${test.pValue * 100}%`}}
							transition={{delay: idx * 0.15 + 0.3, duration: 0.5}}
							className={test.passed ? styles.fill : styles.fillError}
						/>
					</div>
				</m.div>
			))}
		</div>
	</div>
)
