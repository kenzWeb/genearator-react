import {Cog, Lock, Mic, Radio, Sparkles, Zap} from 'lucide-react'
import base from '../../../pages/DemoPage.module.css'
import {LorenzAttractor} from '../../../presentation/components/visualizations'
import cs from './styles/ProcessingStep.module.css'

export const ProcessingStep = () => (
	<div className={cs.card}>
		<div className={cs.lorenzSection}>
			<LorenzAttractor
				isActive={true}
				lyapunov={2.8}
				snr={32}
				spectralDeviation={45}
			/>
		</div>

		<div className={cs.audioSection}>
			<div className={cs.audioHeader}>
				<div className={cs.recordingIndicator}>
					<div className={cs.recordingDot}></div>
					<span>Запись энтропии</span>
				</div>
				<div className={cs.audioIcon}>
					<Mic size={20} />
				</div>
			</div>
			<div className={cs.waveform}>
				{[...Array(40)].map((_, i) => (
					<div
						key={i}
						className={cs.bar}
						style={{
							animationDelay: `${i * 0.05}s`,
							height: `${Math.random() * 60 + 20}%`,
						}}
					/>
				))}
			</div>
			<div className={cs.frequencyBadge}>
				<Radio size={14} />
				<span>~60 Hz Wire Hum</span>
			</div>
		</div>

		<div className={cs.grid}>
			<div className={cs.row}>
				<div className={`${cs.icon} ${cs.iconCyan} ${cs.iconPulse}`}>
					<Zap size={24} />
				</div>
				<div className={cs.stepContent}>
					<h4 className={base.benefitTitle}>POST /api/entropy/mix</h4>
					<p className={base.benefitText}>
						Сбор энтропии: Wire Hum (~60 Гц), Lorenz Attractor, Spectral
						Analysis
					</p>
					<div className={cs.progressBar}>
						<div className={cs.progressFill}></div>
					</div>
				</div>
			</div>

			<div className={cs.row}>
				<div className={`${cs.icon} ${cs.iconMint} ${cs.iconRotate}`}>
					<Lock size={24} />
				</div>
				<div className={cs.stepContent}>
					<h4 className={base.benefitTitle}>ChaCha20 Stream Cipher</h4>
					<p className={base.benefitText}>
						Криптографическая обработка seed через алгоритм ChaCha20 (RFC 8439)
					</p>
					<div className={cs.progressBar}>
						<div
							className={cs.progressFill}
							style={{animationDelay: '0.3s'}}
						></div>
					</div>
				</div>
			</div>

			<div className={cs.row}>
				<div className={`${cs.icon} ${cs.iconOutline} ${cs.iconSpin}`}>
					<Cog size={24} />
				</div>
				<div className={cs.stepContent}>
					<h4 className={base.benefitTitle}>POST /api/rng/generate</h4>
					<p className={base.benefitText}>
						Генерация 125,000 байт (1M битов) в HEX формате
					</p>
					<div className={cs.progressBar}>
						<div
							className={cs.progressFill}
							style={{animationDelay: '0.6s'}}
						></div>
					</div>
				</div>
			</div>

			<div className={cs.row}>
				<div className={`${cs.icon} ${cs.iconCyan} ${cs.iconSparkle}`}>
					<Sparkles size={24} />
				</div>
				<div className={cs.stepContent}>
					<h4 className={base.benefitTitle}>Метрики энтропии</h4>
					<p className={base.benefitText}>
						SNR: 34.5 dB, Lyapunov: 0.91, Spectral Deviation: 2.8%
					</p>
					<div className={cs.metricsGrid}>
						<div className={cs.metric}>
							<span className={cs.metricValue}>34.5 dB</span>
							<span className={cs.metricLabel}>SNR</span>
						</div>
						<div className={cs.metric}>
							<span className={cs.metricValue}>0.91</span>
							<span className={cs.metricLabel}>Lyapunov</span>
						</div>
						<div className={cs.metric}>
							<span className={cs.metricValue}>2.8%</span>
							<span className={cs.metricLabel}>Spectral</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
)
