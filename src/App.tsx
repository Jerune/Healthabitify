import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HeaderNav from './components/HeaderNav'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import DataPage from './pages/DataPage'
import NotFound from './pages/NotFound'
import Settings from './pages/Settings'
import Labs from './pages/Labs'

function App() {
    return (
        <Router>
            <HeaderNav />
            <main className="grow w-full py-6 px-9">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="data/:category" element={<DataPage />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="labs" element={<Labs />} />
                    <Route path="login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </Router>
    )
}

export default App
