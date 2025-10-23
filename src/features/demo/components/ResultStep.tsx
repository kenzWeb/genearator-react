import {m} from 'framer-motion'
import {Download, FileJson, Sparkles} from 'lucide-react'
import styles from './styles/ResultStep.module.css'

const demoExportData = {
	runId: '903d8a3c-bb20-45e0-944c-7f8e1a2b3c4d',
	timestamp: '2025-10-23T10:30:45.123Z',
	numbers: [42, 17, 89, 33, 56, 91],
	entropyMetrics: {
		snr_db: 34.56,
		lyapunov_exponent: 0.9123,
		spectral_deviation_percent: 2.45,
	},
	testResults: [
		{
			name: 'frequency',
			passed: true,
			statistic: 1.234,
			threshold: 3.84,
		},
		{
			name: 'runs',
			passed: true,
			statistic: 0.987,
			threshold: 3.84,
		},
		{
			name: 'chi_square',
			passed: true,
			statistic: 12.345,
			threshold: 15.51,
		},
		{
			name: 'serial_correlation',
			passed: true,
			statistic: 0.234,
		},
	],
}

const downloadJSON = () => {
	const blob = new Blob([JSON.stringify(demoExportData, null, 2)], {
		type: 'application/json',
	})
	const url = URL.createObjectURL(blob)
	const a = document.createElement('a')
	a.href = url
	a.download = `demo-draw-${demoExportData.runId.slice(0, 8)}.json`
	document.body.appendChild(a)
	a.click()
	document.body.removeChild(a)
	URL.revokeObjectURL(url)
}

const downloadBinary = () => {
	const binaryData = Array.from({length: 1000000}, () =>
		Math.random() > 0.5 ? '1' : '0',
	).join('')
	const blob = new Blob([binaryData], {type: 'text/plain'})
	const url = URL.createObjectURL(blob)
	const a = document.createElement('a')
	a.href = url
	a.download = `demo-sequence-${demoExportData.runId.slice(0, 8)}.txt`
	document.body.appendChild(a)
	a.click()
	document.body.removeChild(a)
	URL.revokeObjectURL(url)
}

export const ResultStep = () => (
	<div className={styles.card}>
		<m.div
			initial={{opacity: 0, y: -20}}
			animate={{opacity: 1, y: 0}}
			transition={{duration: 0.6}}
			className={styles.titleWrapper}
		>
			<Sparkles className={styles.titleIcon} size={24} />
			<h3 className={styles.title}>Результат генерации (6 чисел)</h3>
		</m.div>

		<div className={styles.numbers}>
			{[42, 17, 89, 33, 56, 91].map((num, idx) => (
				<m.div
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
				</m.div>
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
				<m.div
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
				</m.div>
			))}
		</div>

		<m.div
			initial={{opacity: 0, y: 20}}
			animate={{opacity: 1, y: 0}}
			transition={{delay: 1.5}}
			className={styles.exportSection}
		>
			<h4 className={styles.exportTitle}>Возможности экспорта:</h4>
			<div className={styles.exportButtons}>
				<m.button
					whileHover={{scale: 1.05, y: -5}}
					whileTap={{scale: 0.95}}
					className={styles.exportBtn}
					onClick={downloadJSON}
					type='button'
				>
					<FileJson size={20} />
					<div>
						<div className={styles.exportBtnTitle}>JSON (полный отчёт)</div>
						<div className={styles.exportBtnDesc}>
							Числа, метрики, результаты тестов
						</div>
					</div>
				</m.button>
				<m.button
					whileHover={{scale: 1.05, y: -5}}
					whileTap={{scale: 0.95}}
					className={styles.exportBtn}
					onClick={downloadBinary}
					type='button'
				>
					<Download size={20} />
					<div>
						<div className={styles.exportBtnTitle}>1M битов (TXT)</div>
						<div className={styles.exportBtnDesc}>
							Для проверки в NIST STS/Dieharder
						</div>
					</div>
				</m.button>
			</div>
		</m.div>

		<m.div
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			transition={{delay: 1.8}}
			className={styles.apiNote}
		>
			<strong>API Endpoint:</strong> GET /api/rng/runs/{'<run_id>'}
			/export?min_bits=1000000
		</m.div>
	</div>
)
