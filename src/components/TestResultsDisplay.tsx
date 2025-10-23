import {m} from 'framer-motion'
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import {formatPValue, overallLabel, resultLabel} from '../domain/formatters'
import {getChartData, getTestsList} from '../domain/selectors/testResults'
import {overallBadgeClass} from '../domain/selectors/testStatus'
import type {TestResults} from '../types'
import s from './TestResultsDisplay.module.css'

interface Props {
	results: TestResults
}

export const TestResultsDisplay = ({results}: Props) => {
	const tests = getTestsList(results)
	const chartData = getChartData(results)

	return (
		<div className={s.card}>
			<div className={s.head}>
				<h3 className={s.title}>Статистические тесты</h3>
				<div className={overallBadgeClass(results.overall, s)}>
					{overallLabel(results.overall)}
				</div>
			</div>

			<div className={s.grid}>
				{tests.map((test, index) => (
					<m.div
						key={test.name}
						initial={{opacity: 0, y: 20}}
						animate={{opacity: 1, y: 0}}
						transition={{delay: index * 0.1}}
						className={s.tile}
					>
						<div className={s.tileHead}>
							<h4 className={s.tileTitle}>{test.name}</h4>
							<span
								className={`${s.tileState} ${
									test.result === 'passed' ? s.pass : s.fail
								}`}
							>
								{resultLabel(test.result)}
							</span>
						</div>

						<p className={s.tileDesc}>{test.description}</p>

						<div className={s.row}>
							<span className={s.muted}>P-Value:</span>
							<span className={`${s.mono} ${s.value}`}>
								{formatPValue(test.pValue)}
							</span>
						</div>

						<div className={s.row} style={{marginTop: 4}}>
							<span className={s.muted}>Порог:</span>
							<span className={`${s.mono} ${s.threshold}`}>
								{test.threshold}
							</span>
						</div>
					</m.div>
				))}
			</div>

			<div className={s.chartCard}>
				<h4 className={s.chartTitle}>Сравнение P-Values</h4>
				<ResponsiveContainer width='100%' height={200}>
					<BarChart data={chartData}>
						<defs>
							<filter
								id='glowBlue'
								x='-50%'
								y='-50%'
								width='200%'
								height='200%'
							>
								<feGaussianBlur stdDeviation='2.5' result='coloredBlur' />
								<feMerge>
									<feMergeNode in='coloredBlur' />
									<feMergeNode in='SourceGraphic' />
								</feMerge>
							</filter>
							<filter id='glowRed' x='-50%' y='-50%' width='200%' height='200%'>
								<feGaussianBlur stdDeviation='2.0' result='coloredBlur' />
								<feMerge>
									<feMergeNode in='coloredBlur' />
									<feMergeNode in='SourceGraphic' />
								</feMerge>
							</filter>
						</defs>
						<CartesianGrid strokeDasharray='3 3' stroke='#30363d' />
						<XAxis dataKey='name' stroke='#9BA7B4' style={{fontSize: '12px'}} />
						<YAxis stroke='#9BA7B4' style={{fontSize: '12px'}} />
						<Tooltip
							contentStyle={{
								backgroundColor: '#0D1117',
								border: '1px solid #00BFFF33',
								borderRadius: '12px',
							}}
							labelStyle={{color: '#E6EDF3'}}
						/>
						<Bar dataKey='pValue' fill='#00BFFF' filter='url(#glowBlue)' />
						<Bar dataKey='threshold' fill='#FF4D4D' filter='url(#glowRed)' />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}
