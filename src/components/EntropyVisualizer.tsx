import {motion} from 'framer-motion'
import type {EntropySource} from '../types'

interface Props {
	sources: EntropySource[]
	isCollecting: boolean
}

export const EntropyVisualizer = ({sources, isCollecting}: Props) => {
	const getSourceIcon = (type: string) => {
		switch (type) {
			case 'physical':
				return (
					<svg
						className='w-5 h-5'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M13 10V3L4 14h7v7l9-11h-7z'
						/>
					</svg>
				)
			case 'algorithmic':
				return (
					<svg
						className='w-5 h-5'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z'
						/>
					</svg>
				)
			default:
				return (
					<svg
						className='w-5 h-5'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
						/>
					</svg>
				)
		}
	}

	return (
		<div className='bg-primary-card/50 backdrop-blur-glass rounded-card p-card border border-primary-border shadow-glass'>
			<div className='flex items-center space-x-2 mb-6'>
				<svg
					className='w-6 h-6 text-accent-cyan'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4'
					/>
				</svg>
				<h3 className='text-xl font-semibold text-text-primary'>
					Сбор энтропии
				</h3>
			</div>

			<div className='space-y-4'>
				{sources.map((source, index) => (
					<motion.div
						key={source.name}
						initial={{opacity: 0, x: -20}}
						animate={{opacity: 1, x: 0}}
						transition={{delay: index * 0.1}}
						className='bg-primary-bg/40 rounded-xl p-4 border border-primary-border/50 hover:border-accent-cyan/30 transition-all duration-300'
					>
						<div className='flex items-center justify-between mb-3'>
							<div className='flex items-center space-x-3'>
								<div
									className={`w-3 h-3 rounded-full ${
										source.collected > 0
											? 'bg-accent-mint shadow-glow-mint'
											: 'bg-text-secondary/30'
									} ${
										isCollecting && source.collected === 0
											? 'animate-pulse'
											: ''
									}`}
								/>
								<span className='font-medium text-text-primary'>
									{source.name}
								</span>
								<div
									className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-medium ${
										source.type === 'physical'
											? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20'
											: source.type === 'hybrid'
											? 'bg-accent-mint/10 text-accent-mint border border-accent-mint/20'
											: 'bg-text-secondary/10 text-text-secondary border border-text-secondary/20'
									}`}
								>
									{getSourceIcon(source.type)}
									<span>{source.type}</span>
								</div>
							</div>
							<span className='text-sm text-text-secondary font-mono'>
								{source.collected} <span className='text-xs'>bytes</span>
							</span>
						</div>

						<div className='relative w-full bg-primary-bg/60 rounded-full h-3 overflow-hidden border border-primary-border/30'>
							<motion.div
								initial={{width: 0}}
								animate={{width: `${source.quality * 100}%`}}
								transition={{duration: 0.5, ease: 'easeOut'}}
								className='h-full bg-gradient-to-r from-accent-cyan to-accent-mint relative'
								style={{
									boxShadow:
										source.quality > 0
											? '0 0 10px rgba(0, 191, 255, 0.5)'
											: 'none',
								}}
							>
								<div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse' />
							</motion.div>
						</div>

						<div className='mt-2 flex items-center justify-between'>
							<span className='text-xs text-text-secondary'>Качество</span>
							<span className='text-sm text-accent-mint font-mono font-semibold'>
								{(source.quality * 100).toFixed(0)}%
							</span>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	)
}
