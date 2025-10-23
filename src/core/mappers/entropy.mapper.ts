import type {EntropyMetrics, EntropySource} from '../../core/domain/models'

export function mapEntropyMetricsToSources(
	metrics: EntropyMetrics,
): EntropySource[] {
	const snrNormalized = Math.min(Math.max(metrics.snr_db / 50, 0), 1)

	const lyapunovNormalized = Math.min(
		Math.max(metrics.lyapunov_exponent / 3, 0),
		1,
	)

	const spectralNormalized = Math.min(
		Math.max(1 - metrics.spectral_deviation_percent / 100, 0),
		1,
	)

	return [
		{
			name: 'Wire Hum',
			type: 'physical',
			collected: Math.round(snrNormalized * 100),
			quality: snrNormalized,
		},
		{
			name: 'Lorenz Attractor',
			type: 'algorithmic',
			collected: Math.round(lyapunovNormalized * 100),
			quality: lyapunovNormalized,
		},
		{
			name: 'Spectral Analysis',
			type: 'hybrid',
			collected: Math.round(spectralNormalized * 100),
			quality: spectralNormalized,
		},
	]
}
