import type {EntropyMetrics} from '../api'
import type {EntropySource} from '../types'

export const mapEntropyMetricsToSources = (
	metrics: EntropyMetrics,
): EntropySource[] => {
	return [
		{
			name: 'Wire Hum Analysis',
			type: 'physical',
			collected: Math.round(metrics.snr_db * 10),
			quality: Math.min(1, metrics.snr_db / 50),
		},
		{
			name: 'Lorenz Attractor',
			type: 'algorithmic',
			collected: Math.round(metrics.lyapunov_exponent * 1000),
			quality: Math.min(1, metrics.lyapunov_exponent),
		},
		{
			name: 'Spectral Analysis',
			type: 'hybrid',
			collected: Math.round(100 - metrics.spectral_deviation_percent),
			quality: Math.max(0, (100 - metrics.spectral_deviation_percent) / 100),
		},
	]
}
