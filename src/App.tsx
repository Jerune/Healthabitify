import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { OAuthPopup } from '@tasoskakour/react-use-oauth2'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import DataPage from './pages/DataPage'
import NotFound from './pages/NotFound'
import Settings from './pages/Settings'
import Labs from './pages/Labs'
import HeaderNav from './components/HeaderNav'
import AppStateInit from './components/InitializeApp'

function App() {
    return (
        <Router>
            <AppStateInit />
            <HeaderNav />
            <Routes>
                <Route path="callback" element={<OAuthPopup />} />
                <Route path="/" element={<Login />} />
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
