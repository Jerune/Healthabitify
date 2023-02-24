import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import DataPage from './pages/DataPage'
import NotFound from './pages/NotFound'
import Settings from './pages/Settings'
import Labs from './pages/Labs'
import HeaderNav from './components/HeaderNav'
import AppState from './components/AppStateInit'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
            <HeaderNav />
            <AppState />
            <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="data/:category" element={<DataPage />} />
                <Route path="settings" element={<Settings />} />
                <Route path="labs" element={<Labs />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default App
