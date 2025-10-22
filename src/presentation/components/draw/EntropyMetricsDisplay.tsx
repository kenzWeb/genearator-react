import type {EntropyMetrics} from '../../../core/domain/models'
import s from './EntropyMetricsDisplay.module.css'

interface EntropyMetricsDisplayProps {
	metrics: EntropyMetrics
	testsPassed: boolean
}

export const EntropyMetricsDisplay = ({
	metrics,
	testsPassed,
}: EntropyMetricsDisplayProps) => {
	return (
		<div className={s.metaGrid}>
			<div>
				<div className={s.metaLabel}>SNR (dB):</div>
				<div className={s.mono}>{metrics.snr_db.toFixed(2)}</div>
			</div>
			<div>
				<div className={s.metaLabel}>Lyapunov:</div>
				<div className={s.mono}>{metrics.lyapunov_exponent.toFixed(4)}</div>
			</div>
			<div>
				<div className={s.metaLabel}>Spectral Deviation:</div>
				<div className={s.mono}>
					{metrics.spectral_deviation_percent.toFixed(2)}%
				</div>
			</div>
			<div>
				<div className={s.metaLabel}>Тесты пройдены:</div>
				<div
					className={s.mono}
					style={{
						fontWeight: 700,
						color: testsPassed ? 'var(--mint)' : 'var(--error)',
					}}
				>
					{testsPassed ? '✓ Все тесты' : '✗ Есть ошибки'}
				</div>
			</div>
		</div>
	)
}
