import {Suspense, lazy} from 'react'
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

function App() {
	return (
		<BrowserRouter>
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
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
