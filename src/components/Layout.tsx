import {m} from 'framer-motion'
import {NavLink, Outlet} from 'react-router-dom'
import s from './Layout.module.css'

export const Layout = () => {
	return (
		<div className={s.app}>
			<nav className={s.header}>
				<div className={s.container}>
					<div className={s.bar}>
						<m.div
							initial={{opacity: 0, x: -20}}
							animate={{opacity: 1, x: 0}}
							className={s.brand}
						>
							<div className={s.logo}>
								<svg
									width='22'
									height='22'
									viewBox='0 0 24 24'
									fill='none'
									stroke='#0D1117'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
									/>
								</svg>
							</div>
							<div>
								<div className={s.title}>RandomTrust</div>
								<div className={s.subtitle}>Transparent RNG System</div>
							</div>
						</m.div>

						<div className={s.nav}>
							<NavLink
								to='/draw'
								className={({isActive}) =>
									isActive ? `${s.navLink} ${s.active}` : s.navLink
								}
							>
								Тираж
							</NavLink>
							<NavLink
								to='/audit'
								className={({isActive}) =>
									isActive ? `${s.navLink} ${s.active}` : s.navLink
								}
							>
								Аудит
							</NavLink>
							<NavLink
								to='/demo'
								className={({isActive}) =>
									isActive ? `${s.navLink} ${s.active}` : s.navLink
								}
							>
								Демо
							</NavLink>
						</div>
					</div>
				</div>
			</nav>

			<main className={s.container} style={{paddingTop: 24, paddingBottom: 24}}>
				<Outlet />
			</main>
		</div>
	)
}
