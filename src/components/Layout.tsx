import {motion} from 'framer-motion'
import {NavLink, Outlet} from 'react-router-dom'

export const Layout = () => {
	return (
		<div className='min-h-screen bg-primary-bg'>
			<nav className='bg-primary-card/50 backdrop-blur-md border-b border-primary-border'>
				<div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex items-center justify-between h-14'>
						<motion.div
							initial={{opacity: 0, x: -20}}
							animate={{opacity: 1, x: 0}}
							className='flex items-center space-x-3'
						>
							<div className='w-10 h-10 bg-accent-cyan rounded-xl flex items-center justify-center shadow-glow'>
								<svg
									className='w-6 h-6 text-primary-bg'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
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
								<h1 className='text-xl font-bold text-text-primary tracking-tight'>
									RandomTrust
								</h1>
								<p className='text-xs text-text-secondary'>
									Transparent RNG System
								</p>
							</div>
						</motion.div>

						<div className='flex gap-2'>
							<NavLink
								to='/draw'
								className={({isActive}) =>
									`px-4 py-2 rounded-xl transition-all duration-200 font-medium ${
										isActive
											? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/40 shadow-glow'
											: 'text-text-secondary hover:bg-primary-card hover:text-text-primary border border-transparent'
									}`
								}
							>
								Тираж
							</NavLink>
							<NavLink
								to='/audit'
								className={({isActive}) =>
									`px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
										isActive
											? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/40 shadow-glow'
											: 'text-text-secondary hover:bg-primary-card hover:text-text-primary border border-transparent'
									}`
								}
							>
								Аудит
							</NavLink>
							<NavLink
								to='/demo'
								className={({isActive}) =>
									`px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
										isActive
											? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/40 shadow-glow'
											: 'text-text-secondary hover:bg-primary-card hover:text-text-primary border border-transparent'
									}`
								}
							>
								Демо
							</NavLink>
						</div>
					</div>
				</div>
			</nav>

			<main className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<Outlet />
			</main>
		</div>
	)
}
