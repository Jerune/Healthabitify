import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import HeaderNav from './components/HeaderNav'
import Connection from './pages/Connection'
import Dashboard from './pages/Dashboard'
import DataPage from './pages/DataPage'
import NotFound from './pages/NotFound'
import Settings from './pages/Settings'

function App() {
    return (
        <>
            <HeaderNav />
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="data" element={<DataPage />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="login" element={<Connection />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
            <Footer />
        </>
    )
}

export default App
