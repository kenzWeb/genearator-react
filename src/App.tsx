import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import {Layout} from './components/Layout'
import {AuditPage} from './pages/AuditPage'
import {DemoPage} from './pages/DemoPage'
import {DrawPage} from './pages/DrawPage'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Navigate to='/draw' replace />} />
					<Route path='draw' element={<DrawPage />} />
					<Route path='audit' element={<AuditPage />} />
					<Route path='demo' element={<DemoPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
