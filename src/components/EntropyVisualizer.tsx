import {motion} from 'framer-motion'
import type {EntropySource} from '../types'
import s from './EntropyVisualizer.module.css'

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
						width={18}
						height={18}
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
						width={18}
						height={18}
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
						width={18}
						height={18}
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
		<div className={s.card}>
			<div className={s.head}>
				<svg
					className={s.headIcon}
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
				<h3 className={s.headTitle}>Сбор энтропии</h3>
			</div>

			<div className={s.list}>
				{sources.map((source, index) => (
					<motion.div
						key={source.name}
						initial={{opacity: 0, x: -20}}
						animate={{opacity: 1, x: 0}}
						transition={{delay: index * 0.1}}
						className={s.item}
					>
						<div className={s.row}>
							<div className={s.left}>
								<div
									className={`${s.dot} ${
										source.collected > 0 ? s.dotActive : ''
									} ${isCollecting && source.collected === 0 ? s.pulse : ''}`}
								/>
								<span className={s.name}>{source.name}</span>
								<div
									className={`${s.badge} ${
										source.type === 'physical'
											? s.physical
											: source.type === 'hybrid'
											? s.hybrid
											: s.algorithmic
									}`}
								>
									{getSourceIcon(source.type)}
									<span>{source.type}</span>
								</div>
							</div>
							<span className={s.bytes}>
								{source.collected} <span style={{fontSize: 11}}>bytes</span>
							</span>
						</div>

						<div className={s.progress}>
							<motion.div
								initial={{width: 0}}
								animate={{width: `${source.quality * 100}%`}}
								transition={{duration: 0.5, ease: 'easeOut'}}
								className={s.bar}
							>
								<div className={s.shine} />
							</motion.div>
						</div>

						<div className={s.foot}>
							<span className={s.label}>Качество</span>
							<span className={s.value}>
								{(source.quality * 100).toFixed(0)}%
							</span>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	)
}
