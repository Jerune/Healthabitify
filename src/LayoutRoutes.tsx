import { Outlet } from 'react-router-dom'
import HeaderNav from './components/HeaderNav'
import AppStateInit from './components/InitializeApp'
import { useAppSelector } from './redux/reduxHooks'
import ManualDataGridContainer from './features/ManualDataGrid/ManualDataGridContainer'
import { ToastContainer } from 'react-toastify';


export default function LayoutRoutes() {
    const utils = useAppSelector((state) => state.utils)

    return (
        <>
            <AppStateInit />
            <ToastContainer 
                position="top-center"
                autoClose={5000}
            />
            <HeaderNav />
            {utils.manualDataGridOpen && <ManualDataGridContainer />}
            <Outlet />
        </>
    )
}
