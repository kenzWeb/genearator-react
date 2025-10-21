import {motion} from 'framer-motion'
import {entropyTypeBadgeClass} from '../domain/selectors/entropy'
import {iconForEntropyType} from '../domain/utils/icons'
import type {EntropySource} from '../types'
import s from './EntropyVisualizer.module.css'

interface Props {
	sources: EntropySource[]
	isCollecting: boolean
}

export const EntropyVisualizer = ({sources, isCollecting}: Props) => {
	const getSourceIcon = iconForEntropyType

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
								<div className={entropyTypeBadgeClass(source.type, s)}>
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
