import {useCallback, useEffect, useRef, useState} from 'react'
import {demoSteps} from './demoConfig'

export const useDemoStepper = () => {
	const [currentStep, setCurrentStep] = useState(0)
	const [isPlaying, setIsPlaying] = useState(false)
	const timerRef = useRef<number | null>(null)

	const next = useCallback(() => {
		setCurrentStep((s) => Math.min(s + 1, demoSteps.length - 1))
	}, [])

	const prev = useCallback(() => {
		setCurrentStep((s) => Math.max(s - 1, 0))
	}, [])

	const goTo = useCallback((idx: number) => {
		setCurrentStep(() => Math.max(0, Math.min(idx, demoSteps.length - 1)))
	}, [])

	const play = useCallback(() => {
		if (isPlaying) return
		setIsPlaying(true)
		timerRef.current = window.setInterval(() => {
			setCurrentStep((prev) => {
				if (prev >= demoSteps.length - 1) {
					if (timerRef.current) window.clearInterval(timerRef.current)
					timerRef.current = null
					setIsPlaying(false)
					return prev
				}
				return prev + 1
			})
		}, 3000)
	}, [isPlaying])

	useEffect(
		() => () => {
			if (timerRef.current) window.clearInterval(timerRef.current)
		},
		[],
	)

	return {
		steps: demoSteps,
		currentStep,
		isPlaying,
		next,
		prev,
		goTo,
		play,
	}
}
