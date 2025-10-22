import type {EntropyMetrics, EntropySource} from '../../core/domain/models'

export function mapEntropyMetricsToSources(
	metrics: EntropyMetrics,
): EntropySource[] {
	return [
		{
			name: 'Wire Hum',
			type: 'physical',
			collected: Math.round((metrics.snr_db / 50) * 100),
			quality: metrics.snr_db / 50,
		},
		{
			name: 'Lorenz Attractor',
			type: 'algorithmic',
			collected: Math.round(metrics.lyapunov_exponent * 100),
			quality: metrics.lyapunov_exponent,
		},
		{
			name: 'Spectral Analysis',
			type: 'hybrid',
			collected: Math.round(
				(1 - metrics.spectral_deviation_percent / 10) * 100,
			),
			quality: 1 - metrics.spectral_deviation_percent / 10,
		},
	]
}
