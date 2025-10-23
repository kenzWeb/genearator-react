import type {EntropyMetrics} from '../../core/domain/models'
import type {RNGRunDetail} from '../../lib/api/services/rng.service'

export const mapRunToEntropyMetrics = (
	run: RNGRunDetail,
): EntropyMetrics | undefined => {
	if (!run.entropy_metrics) return undefined

	return {
		snr: run.entropy_metrics.snr,
		lyapunov: run.entropy_metrics.lyapunov,
		spectralDeviation: run.entropy_metrics.spectral_deviation,
		snr_db: run.entropy_metrics.snr,
		lyapunov_exponent: run.entropy_metrics.lyapunov,
		spectral_deviation_percent: run.entropy_metrics.spectral_deviation,
	}
}
