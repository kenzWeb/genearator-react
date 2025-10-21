import {motion} from 'framer-motion'
import type {EntropySource} from '../types'

interface Props {
	sources: EntropySource[]
	isCollecting: boolean
}

export const EntropyVisualizer = ({sources, isCollecting}: Props) => {
	return (
		<div className='bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20'>
			<h3 className='text-xl font-semibold mb-4 text-purple-300'>
				Сбор энтропии
			</h3>

			<div className='space-y-4'>
				{sources.map((source, index) => (
					<motion.div
						key={source.name}
						initial={{opacity: 0, x: -20}}
						animate={{opacity: 1, x: 0}}
						transition={{delay: index * 0.1}}
						className='bg-black/20 rounded-lg p-4'
					>
						<div className='flex items-center justify-between mb-2'>
							<div className='flex items-center space-x-3'>
								<div
									className={`w-3 h-3 rounded-full ${
										source.collected > 0 ? 'bg-green-500' : 'bg-gray-500'
									} ${
										isCollecting && source.collected === 0
											? 'animate-pulse'
											: ''
									}`}
								/>
								<span className='font-medium text-gray-200'>{source.name}</span>
								<span className='text-xs px-2 py-1 rounded bg-purple-500/20 text-purple-300'>
									{source.type}
								</span>
							</div>
							<span className='text-sm text-gray-400'>
								{source.collected} bytes
							</span>
						</div>

						<div className='w-full bg-gray-700/50 rounded-full h-2 overflow-hidden'>
							<motion.div
								initial={{width: 0}}
								animate={{width: `${source.quality * 100}%`}}
								transition={{duration: 0.5}}
								className='h-full bg-gradient-to-r from-purple-500 to-blue-500'
							/>
						</div>

						<div className='mt-2 text-xs text-gray-400 text-right'>
							Качество: {(source.quality * 100).toFixed(0)}%
						</div>
					</motion.div>
				))}
			</div>
		</div>
	)
}
