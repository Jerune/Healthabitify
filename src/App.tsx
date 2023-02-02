import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import DataPage from './pages/DataPage'
import NotFound from './pages/NotFound'
import Settings from './pages/Settings'
import Labs from './pages/Labs'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="data/:category" element={<DataPage />} />
                <Route path="settings" element={<Settings />} />
                <Route path="labs" element={<Labs />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default App
