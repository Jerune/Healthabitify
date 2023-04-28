import { Outlet } from 'react-router-dom'
import HeaderNav from './components/HeaderNav'

export default function LayoutRoutes() {
    return (
        <>
            <HeaderNav />
            <Outlet />
        </>
    )
}
