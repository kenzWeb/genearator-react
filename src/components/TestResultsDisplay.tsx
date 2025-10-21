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
		<div className='bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20'>
			<div className='flex items-center justify-between mb-6'>
				<h3 className='text-xl font-semibold text-purple-300'>
					Статистические тесты
				</h3>
				<div
					className={`px-4 py-2 rounded-lg font-semibold ${
						results.overall === 'passed'
							? 'bg-green-500/20 text-green-400 border border-green-500/40'
							: 'bg-red-500/20 text-red-400 border border-red-500/40'
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
						className='bg-black/20 rounded-lg p-4'
					>
						<div className='flex items-center justify-between mb-2'>
							<h4 className='font-medium text-gray-200'>{test.name}</h4>
							<span
								className={`text-sm px-2 py-1 rounded ${
									test.result === 'passed'
										? 'bg-green-500/20 text-green-400'
										: 'bg-red-500/20 text-red-400'
								}`}
							>
								{test.result === 'passed' ? 'Passed' : 'Failed'}
							</span>
						</div>

						<p className='text-sm text-gray-400 mb-3'>{test.description}</p>

						<div className='flex items-center justify-between text-sm'>
							<span className='text-gray-400'>P-Value:</span>
							<span className='font-mono text-purple-300'>
								{test.pValue.toFixed(4)}
							</span>
						</div>

						<div className='flex items-center justify-between text-sm mt-1'>
							<span className='text-gray-400'>Порог:</span>
							<span className='font-mono text-gray-300'>{test.threshold}</span>
						</div>
					</motion.div>
				))}
			</div>

			<div className='bg-black/20 rounded-lg p-4'>
				<h4 className='text-sm font-medium text-gray-300 mb-4'>
					Сравнение P-Values
				</h4>
				<ResponsiveContainer width='100%' height={200}>
					<BarChart data={chartData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#444' />
						<XAxis dataKey='name' stroke='#888' style={{fontSize: '12px'}} />
						<YAxis stroke='#888' style={{fontSize: '12px'}} />
						<Tooltip
							contentStyle={{
								backgroundColor: '#1a1a2e',
								border: '1px solid #444',
								borderRadius: '8px',
							}}
							labelStyle={{color: '#fff'}}
						/>
						<Bar dataKey='pValue' fill='#8b5cf6' />
						<Bar dataKey='threshold' fill='#ef4444' />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}
