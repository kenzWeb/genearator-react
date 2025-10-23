import {COMPETITION_REQUIREMENTS} from '../../config/app.config'
import {RNG_CONSTANTS} from '../../config/constants'
import {
	downloadBlob,
	downloadJSON,
	parseNumbersFromHex,
} from '../../core/converters'
import type {EntropyMetrics, TestResults} from '../../core/domain/models'
import {mapOutcomesToTestResults} from '../../core/mappers'
import {analysisService, rngService} from '../../lib/api'

interface DrawSession {
	runId: string
	numbers: number[]
	timestamp: string
	entropyMetrics: EntropyMetrics
	testResults?: TestResults
	rawData?: string
}

export function useDrawGeneration() {
	const generateNumbers = async (count: number): Promise<DrawSession> => {
		const minBytesForExport = RNG_CONSTANTS.MIN_BYTES_FOR_EXPORT
		const bytesNeeded = Math.max(
			count * RNG_CONSTANTS.NUMBER_SIZE_BYTES,
			minBytesForExport,
		)

		const response = await rngService.generate(
			{
				length: bytesNeeded,
				parameters: {
					duration_ms: 250,
					noise_amplitude: 0.7,
					spike_density: 0.05,
				},
			},
			'hex',
		)

		const numbers = await parseNumbersFromHex(response.data as string, count)

		const analysisResult = await analysisService.analyzeRun(response.run_id, {
			tests: ['frequency', 'runs', 'chi_square'],
		})

		const metrics = response.entropy_metrics
		const testResults = mapOutcomesToTestResults(analysisResult.outcomes)

		return {
			runId: response.run_id,
			numbers,
			timestamp: new Date().toISOString(),
			entropyMetrics: {
				snr: metrics.snr_db,
				lyapunov: metrics.lyapunov_exponent,
				spectralDeviation: metrics.spectral_deviation_percent,
				snr_db: metrics.snr_db,
				lyapunov_exponent: metrics.lyapunov_exponent,
				spectral_deviation_percent: metrics.spectral_deviation_percent,
			},
			testResults,
			rawData: response.data as string,
		}
	}

	return {generateNumbers}
}

export function useDrawExport(session: DrawSession | null) {
	const exportJSON = () => {
		if (!session) return

		downloadJSON(
			{
				run_id: session.runId,
				numbers: session.numbers,
				timestamp: session.timestamp,
				entropy_metrics: session.entropyMetrics,
				test_results: session.testResults,
			},
			`random-draw-${session.runId}.json`,
		)
	}

	const exportBinary = async () => {
		if (!session) return

		const blob = await rngService.exportRun(
			session.runId,
			COMPETITION_REQUIREMENTS.MIN_BITS_FOR_VALIDATION,
		)

		downloadBlob(blob, `random-bits-${session.runId}.txt`)
	}

	return {exportJSON, exportBinary}
}
