import {LazyMotion} from 'framer-motion'
import {Suspense, lazy} from 'react'
import {Toaster} from 'react-hot-toast'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import {Layout} from './components/Layout'

const DrawPage = lazy(() =>
	import('./pages/DrawPage').then((m) => ({default: m.DrawPage})),
)
const AuditPage = lazy(() =>
	import('./pages/AuditPage').then((m) => ({default: m.AuditPage})),
)
const DemoPage = lazy(() =>
	import('./pages/DemoPage').then((m) => ({default: m.DemoPage})),
)
const RunDetailPage = lazy(() =>
	import('./pages/RunDetailPage').then((m) => ({default: m.RunDetailPage})),
)

const loadFeatures = () =>
	import('./lib/motion-features').then((res) => res.default)

function App() {
	return (
		<LazyMotion features={loadFeatures} strict>
			<BrowserRouter>
				<Toaster
					position='top-right'
					toastOptions={{
						duration: 4000,
						style: {
							background: 'var(--card-bg)',
							color: 'var(--text)',
							border: '1px solid var(--border)',
						},
						success: {
							iconTheme: {
								primary: 'var(--success)',
								secondary: 'var(--card-bg)',
							},
						},
					}}
				/>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route index element={<Navigate to='/draw' replace />} />
						<Route
							path='draw'
							element={
								<Suspense fallback={null}>
									<DrawPage />
								</Suspense>
							}
						/>
						<Route
							path='audit'
							element={
								<Suspense fallback={null}>
									<AuditPage />
								</Suspense>
							}
						/>
						<Route
							path='demo'
							element={
								<Suspense fallback={null}>
									<DemoPage />
								</Suspense>
							}
						/>
						<Route
							path='run/:runId'
							element={
								<Suspense fallback={null}>
									<RunDetailPage />
								</Suspense>
							}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</LazyMotion>
	)
}

export default App
