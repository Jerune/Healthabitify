import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import HeaderNav from '../components/HeaderNav'
import MainContent from '../components/MainContent'
import { localSignIn } from '../redux/reducers/usersReducer'
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks'
import { auth } from '../services/firebase'
import TabsList from '../components/TabsList'
import Tabs from '../data/tabs'
import DashBoardContainer from '../features/Dashboard/DashBoardContainer'
import DashBoardMetricBlock from '../features/Dashboard/DashBoardMetricBlock'
import dashboardItems from '../data/dashboardItems'

function Dashboard() {
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
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
        }
    }, [isLoggedIn])

    const dashboardBlocks = dashboardItems.map((item) => (
        <DashBoardMetricBlock metric={item} key={item.name} />
    ))

    return (
        <>
            <HeaderNav />
            <MainContent>
                <TabsList tabs={Tabs} />
                <DashBoardContainer>{dashboardBlocks}</DashBoardContainer>
            </MainContent>
        </>
    )
}

export default Dashboard
