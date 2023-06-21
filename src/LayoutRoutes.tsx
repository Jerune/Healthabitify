import { Outlet } from 'react-router-dom'
import HeaderNav from './components/HeaderNav'
import AppStateInit from './components/InitializeApp'
import { useAppSelector } from './redux/reduxHooks'
import ManualDataGridContainer from './features/ManualDataGrid/ManualDataGridContainer'

export default function LayoutRoutes() {
    const manualDataGridOpen = useAppSelector(
        (state) => state.utils.manualDataGridOpen
    )

    return (
        <>
            <AppStateInit />
            <HeaderNav />
            {manualDataGridOpen && <ManualDataGridContainer />}
            <Outlet />
        </>
    )
}
