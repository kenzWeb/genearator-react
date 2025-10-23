import {m} from 'framer-motion'
import {ArrowLeft} from 'lucide-react'
import {useNavigate} from 'react-router-dom'
import s from './RunDetailHeader.module.css'

export const RunDetailHeader = () => {
	const navigate = useNavigate()

	return (
		<m.div
			initial={{opacity: 0, y: -20}}
			animate={{opacity: 1, y: 0}}
			className={s.header}
		>
			<button onClick={() => navigate('/draw')} className={s.backButton}>
				<ArrowLeft size={20} />
				Назад
			</button>
			<h1 className={s.title}>Цифровой слепок тиража</h1>
			<p className={s.subtitle}>
				Полная информация о генерации для независимой верификации через NIST STS
				и Dieharder
			</p>
		</m.div>
	)
}
