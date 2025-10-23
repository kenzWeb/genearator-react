import {motion} from 'framer-motion'
import {Activity, Waves, Zap} from 'lucide-react'
import type {EntropyMetrics, EntropySource} from '../../../core/domain/models'
import {LorenzAttractor} from '../visualizations/LorenzAttractor'
import s from './EntropyCollection.module.css'

interface EntropyCollectionProps {
	sources: EntropySource[]
	isCollecting: boolean
	metrics?: EntropyMetrics
}

export const EntropyCollection = ({
	sources,
	isCollecting,
	metrics,
}: EntropyCollectionProps) => {
	const getIcon = (type: string) => {
		switch (type) {
			case 'physical':
				return <Zap size={24} />
			case 'algorithmic':
				return <Activity size={24} />
			case 'hybrid':
				return <Waves size={24} />
			default:
				return <Activity size={24} />
		}
	}

	const getIconColor = (type: string) => {
		switch (type) {
			case 'physical':
				return '#00ffff'
			case 'algorithmic':
				return '#00ffaa'
			case 'hybrid':
				return '#ff00ff'
			default:
				return '#00ffff'
		}
	}

	return (
		<motion.div
			initial={{opacity: 0, y: 20}}
			animate={{opacity: 1, y: 0}}
			className={s.container}
		>
			<div className={s.header}>
				<h3 className={s.title}>Сбор энтропии</h3>
				{isCollecting && <div className={s.pulse} />}
			</div>

			<div className={s.visualization}>
				<LorenzAttractor
					isActive={true}
					lyapunov={metrics?.lyapunov_exponent}
					snr={metrics?.snr_db}
					spectralDeviation={metrics?.spectral_deviation_percent}
				/>
			</div>

			<div className={s.description}>
				<p>
					<strong>Визуализация аттрактора Лоренца</strong> — хаотической
					динамической системы, демонстрирующей чувствительность к начальным
					условиям. Траектория частиц в 3D-пространстве управляется
					дифференциальными уравнениями Лоренца, где параметры σ, ρ, β
					определяют хаотическое поведение. В данной реализации параметры
					динамически привязаны к метрикам энтропии (SNR, Lyapunov exponent,
					Spectral Deviation), создавая уникальную визуализацию для каждого
					тиража.
				</p>
			</div>

			<div className={s.sources}>
				{sources.map((source, idx) => (
					<motion.div
						key={source.name}
						initial={{opacity: 0, x: -20}}
						animate={{opacity: 1, x: 0}}
						transition={{delay: idx * 0.1}}
						className={s.source}
					>
						<div className={s.sourceHeader}>
							<div
								className={s.icon}
								style={{color: getIconColor(source.type)}}
							>
								{getIcon(source.type)}
							</div>
							<div className={s.sourceInfo}>
								<div className={s.sourceName}>{source.name}</div>
								<div className={s.sourceType}>{source.type}</div>
							</div>
						</div>

						<div className={s.progress}>
							<motion.div
								className={s.progressBar}
								initial={{width: 0}}
								animate={{width: `${source.collected}%`}}
								transition={{duration: 0.5, delay: idx * 0.1}}
								style={{
									background: `linear-gradient(90deg, ${getIconColor(
										source.type,
									)}33, ${getIconColor(source.type)})`,
								}}
							/>
						</div>

						<div className={s.stats}>
							<span className={s.collected}>{source.collected} bytes</span>
							<span
								className={s.quality}
								style={{
									color:
										source.quality > 0.7
											? '#00ffaa'
											: source.quality > 0.4
											? '#ffaa00'
											: '#ff4444',
								}}
							>
								Качество {Math.round(source.quality * 100)}%
							</span>
						</div>
					</motion.div>
				))}
			</div>
		</motion.div>
	)
}
