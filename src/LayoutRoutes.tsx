import { Outlet } from 'react-router-dom'
import HeaderNav from './components/HeaderNav'
import AppStateInit from './components/InitializeApp'
import { useAppSelector } from './redux/reduxHooks'
import ManualDataGridContainer from './features/ManualDataGrid/ManualDataGridContainer'
import UpdateMessage from './components/UpdateMessage'

export default function LayoutRoutes() {
    const utils = useAppSelector((state) => state.utils)

    return (
        <>
            <AppStateInit />
            <UpdateMessage />
            <HeaderNav />
            {utils.manualDataGridOpen && <ManualDataGridContainer />}
            <Outlet />
        </>
    )
}
