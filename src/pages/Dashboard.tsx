import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import HeaderNav from '../components/HeaderNav'
import MainContent from '../components/MainContent'
import { localSignIn } from '../redux/reducers/usersReducer'
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks'
import { auth } from '../services/firebase'
import TimeSelectionModule from '../components/TimeSelectionModule'
import Tabs from '../data/tabs'
import DashBoardContainer from '../features/Dashboard/DashBoardContainer'
import DashBoardMetricBlock from '../features/Dashboard/DashBoardMetricBlock'
import dashboardItems from '../data/dashboardItemsMock'
import getMetrics from '../services/getMetrics'
import { initMetrics } from '../redux/reducers/metricsReducer'

function Dashboard() {
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector((state) => state.users.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        async function initApp() {
            if (!isLoggedIn) {
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        dispatch(
                            localSignIn({
                                email: user.email,
                                userId: user.uid,
                            })
                        )
                    } else {
                        navigate('/')
                    }
                })
                const metricList = await getMetrics()
                dispatch(initMetrics(metricList))
            }
        }
        initApp()
    }, [isLoggedIn])

    const dashboardBlocks = dashboardItems.map((item) => (
        <DashBoardMetricBlock metric={item} key={item.name} />
    ))

    return (
        <>
            <HeaderNav />
            <TimeSelectionModule tabs={Tabs} />
            <MainContent>
                <DashBoardContainer>{dashboardBlocks}</DashBoardContainer>
            </MainContent>
        </>
    )
}

export default Dashboard
