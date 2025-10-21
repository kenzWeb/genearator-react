import {useCallback} from 'react'
import type {HybridRNG} from '../../services/HybridRNG'
import type {VerificationService} from '../../services/VerificationService'
import type {DrawSession} from '../../types'

type Deps = {
	generateDraw: (count?: number) => Promise<DrawSession>
	currentSession: DrawSession | null
	verificationService: VerificationService
	rng: HybridRNG
	isGenerating: boolean
}

export const useDrawActions = ({
	generateDraw,
	currentSession,
	verificationService,
	rng,
	isGenerating,
}: Deps) => {
	const handleGenerate = useCallback(
		async (count: number) => {
			await generateDraw(count)
		},
		[generateDraw],
	)

	const handleExport = useCallback(() => {
		if (!currentSession) return
		const blob = verificationService.exportToTextFile(currentSession.sequence)
		verificationService.downloadFile(blob, `draw-${currentSession.id}.json`)
	}, [currentSession, verificationService])

	const handleExportBinary = useCallback(() => {
		const binary = verificationService.generateLargeBinarySequence(rng, 1000000)
		const blob = verificationService.exportToBinaryFile(binary)
		verificationService.downloadFile(blob, `binary-sequence-${Date.now()}.txt`)
	}, [rng, verificationService])

	return {
		isGenerating,
		currentSession,
		handleGenerate,
		handleExport,
		handleExportBinary,
	}
}
