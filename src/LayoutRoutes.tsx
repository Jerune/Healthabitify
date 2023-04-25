import { Outlet } from 'react-router-dom'
import HeaderNav from './components/HeaderNav'
import AppStateInit from './components/InitializeApp'

export default function LayoutRoutes() {
    return (
        <>
            <AppStateInit />
            <HeaderNav />
            <Outlet />
        </>
    )
}
