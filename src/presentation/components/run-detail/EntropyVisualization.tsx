import {m} from 'framer-motion'
import type {EntropyMetrics} from '../../../core/domain/models'
import {EntropyMetricsDisplay} from '../draw'
import {LorenzAttractor} from '../visualizations'
import s from './EntropyVisualization.module.css'

interface EntropyVisualizationProps {
	metrics?: EntropyMetrics
	testsPassed: boolean
}

export const EntropyVisualization = ({
	metrics,
	testsPassed,
}: EntropyVisualizationProps) => {
	return (
		<m.div
			initial={{opacity: 0, y: 20}}
			animate={{opacity: 1, y: 0}}
			transition={{delay: 0.1}}
			className={s.card}
		>
			<h3 className={s.title}>Визуализация источников энтропии</h3>

			<div className={s.description}>
				<p className={s.descText}>
					<strong className={s.highlight}>Аттрактор Лоренца</strong> — это
					математическая модель хаотической динамической системы,
					демонстрирующая сверхчувствительность к начальным условиям (эффект
					бабочки).
				</p>
				<p className={s.descText}>
					Анимация в реальном времени визуализирует{' '}
					<strong className={s.highlight}>
						сбор энтропии из физических источников
					</strong>
					: анализ электрических помех (Wire Hum), хаотическая траектория
					Лоренца, спектральный анализ сигналов.
				</p>
				<p className={s.descText}>
					Параметры системы (σ, ρ, β) динамически адаптируются под{' '}
					<strong className={s.highlight}>реальные метрики качества</strong>:
					SNR (отношение сигнал/шум), показатель Ляпунова (степень хаоса),
					спектральное отклонение.
				</p>
			</div>

			<div className={s.lorenzContainer}>
				<LorenzAttractor
					isActive={true}
					lyapunov={metrics?.lyapunov_exponent}
					snr={metrics?.snr_db}
					spectralDeviation={metrics?.spectral_deviation_percent}
				/>
			</div>

			<EntropyMetricsDisplay metrics={metrics} testsPassed={testsPassed} />
		</m.div>
	)
}
