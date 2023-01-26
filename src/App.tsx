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
        <Router>
            <HeaderNav />
            <main className="mx-[5%]">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="data/:category" element={<DataPage />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="login" element={<Connection />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    )
}

export default App
