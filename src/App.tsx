import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { OAuthPopup } from '@tasoskakour/react-use-oauth2'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import DataPage from './pages/DataPage'
import NotFound from './pages/NotFound'
import Settings from './pages/Settings'
import Labs from './pages/Labs'
import AppStateInit from './components/InitializeApp'
import LayoutRoutes from './LayoutRoutes'

function App() {
    return (
        <Router>
            <AppStateInit />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="callback" element={<OAuthPopup />} />
                <Route element={<LayoutRoutes />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="data/:category" element={<DataPage />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="labs" element={<Labs />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
