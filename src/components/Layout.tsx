import {motion} from 'framer-motion'
import {NavLink, Outlet} from 'react-router-dom'

export const Layout = () => {
	return (
		<div className='min-h-screen'>
			<nav className='bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm border-b border-purple-500/20'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex items-center justify-between h-16'>
						<motion.div
							initial={{opacity: 0, x: -20}}
							animate={{opacity: 1, x: 0}}
							className='flex items-center space-x-2'
						>
							<div className='w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center'>
								<span className='text-2xl'>🎲</span>
							</div>
							<h1 className='text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>
								RandomTrust
							</h1>
						</motion.div>

						<div className='flex space-x-1'>
							<NavLink
								to='/draw'
								className={({isActive}) =>
									`px-4 py-2 rounded-lg transition-all duration-200 ${
										isActive
											? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
											: 'text-gray-300 hover:bg-purple-500/10 hover:text-purple-300'
									}`
								}
							>
								Тираж
							</NavLink>
							<NavLink
								to='/audit'
								className={({isActive}) =>
									`px-4 py-2 rounded-lg transition-all duration-200 ${
										isActive
											? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
											: 'text-gray-300 hover:bg-purple-500/10 hover:text-purple-300'
									}`
								}
							>
								Аудит
							</NavLink>
							<NavLink
								to='/demo'
								className={({isActive}) =>
									`px-4 py-2 rounded-lg transition-all duration-200 ${
										isActive
											? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
											: 'text-gray-300 hover:bg-purple-500/10 hover:text-purple-300'
									}`
								}
							>
								Демо
							</NavLink>
						</div>
					</div>
				</div>
			</nav>

			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<Outlet />
			</main>
		</div>
	)
}
