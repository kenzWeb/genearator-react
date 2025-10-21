import {Cog, Lock, Sparkles} from 'lucide-react'
import base from '../../../pages/DemoPage.module.css'
import cs from './styles/ProcessingStep.module.css'

export const ProcessingStep = () => (
	<div className={cs.card}>
		<div className={cs.grid}>
			<div className={cs.row}>
				<div className={`${cs.icon} ${cs.iconCyan}`}>
					<Cog size={24} />
				</div>
				<div>
					<h4 className={base.benefitTitle}>XOR Mixing</h4>
					<p className={base.benefitText}>Комбинирование источников энтропии</p>
				</div>
			</div>
			<div className={cs.row}>
				<div className={`${cs.icon} ${cs.iconMint}`}>
					<Lock size={24} />
				</div>
				<div>
					<h4 className={base.benefitTitle}>SHA-256 Hashing</h4>
					<p className={base.benefitText}>Создание криптографического хеша</p>
				</div>
			</div>
			<div className={cs.row}>
				<div className={`${cs.icon} ${cs.iconOutline}`}>
					<Sparkles size={24} />
				</div>
				<div>
					<h4 className={base.benefitTitle}>Финальная генерация</h4>
					<p className={base.benefitText}>Преобразование в случайные числа</p>
				</div>
			</div>
		</div>
	</div>
)
