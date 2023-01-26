import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Connection from './pages/Connection'
import Dashboard from './pages/Dashboard'
import DataPage from './pages/DataPage'
import NotFound from './pages/NotFound'
import Settings from './pages/Settings'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="data" element={<DataPage />} />
                <Route path="settings" element={<Settings />} />
                <Route path="login" element={<Connection />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default App
