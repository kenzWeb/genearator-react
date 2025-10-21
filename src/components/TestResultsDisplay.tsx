import {motion} from 'framer-motion'
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import type {TestResults} from '../types'

interface Props {
	results: TestResults
}

export const TestResultsDisplay = ({results}: Props) => {
	const tests = [
		results.frequencyTest,
		results.runsTest,
		results.chiSquareTest,
		results.serialCorrelationTest,
	]

	const chartData = tests.map((test) => ({
		name: test.name.replace(' Test', ''),
		pValue: test.pValue,
		threshold: test.threshold,
	}))

	return (
		<div className='bg-primary-card/80 backdrop-blur-md rounded-card p-6 border border-accent-cyan/20 shadow-glow'>
			<div className='flex items-center justify-between mb-6 flex-wrap gap-4'>
				<h3 className='text-xl font-semibold text-accent-cyan'>
					Статистические тесты
				</h3>
				<div
					className={`px-4 py-2 rounded-lg font-semibold ${
						results.overall === 'passed'
							? 'bg-accent-mint/20 text-accent-mint border border-accent-mint/40'
							: 'bg-error/20 text-error border border-error/40'
					}`}
				>
					{results.overall === 'passed' ? '✓ Пройдено' : '✗ Не пройдено'}
				</div>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
				{tests.map((test, index) => (
					<motion.div
						key={test.name}
						initial={{opacity: 0, y: 20}}
						animate={{opacity: 1, y: 0}}
						transition={{delay: index * 0.1}}
						className='bg-primary-bg/40 rounded-lg p-4 border border-accent-cyan/10'
					>
						<div className='flex items-center justify-between mb-2'>
							<h4 className='font-medium text-text-primary'>{test.name}</h4>
							<span
								className={`text-sm px-2 py-1 rounded ${
									test.result === 'passed'
										? 'bg-accent-mint/20 text-accent-mint'
										: 'bg-error/20 text-error'
								}`}
							>
								{test.result === 'passed' ? 'Passed' : 'Failed'}
							</span>
						</div>

						<p className='text-sm text-text-secondary mb-3'>
							{test.description}
						</p>

						<div className='flex items-center justify-between text-sm'>
							<span className='text-text-secondary'>P-Value:</span>
							<span className='font-mono text-accent-cyan'>
								{test.pValue.toFixed(4)}
							</span>
						</div>

						<div className='flex items-center justify-between text-sm mt-1'>
							<span className='text-text-secondary'>Порог:</span>
							<span className='font-mono text-text-primary'>
								{test.threshold}
							</span>
						</div>
					</motion.div>
				))}
			</div>

			<div className='bg-primary-bg/40 rounded-lg p-4 border border-accent-cyan/10'>
				<h4 className='text-sm font-medium text-text-primary mb-4'>
					Сравнение P-Values
				</h4>
				<ResponsiveContainer width='100%' height={200}>
					<BarChart data={chartData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#30363d' />
						<XAxis dataKey='name' stroke='#9BA7B4' style={{fontSize: '12px'}} />
						<YAxis stroke='#9BA7B4' style={{fontSize: '12px'}} />
						<Tooltip
							contentStyle={{
								backgroundColor: '#161B22',
								border: '1px solid #00BFFF33',
								borderRadius: '0.75rem',
							}}
							labelStyle={{color: '#E6EDF3'}}
						/>
						<Bar dataKey='pValue' fill='#00BFFF' />
						<Bar dataKey='threshold' fill='#FF4D4D' />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}
