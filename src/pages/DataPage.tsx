import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useParams, useNavigate } from 'react-router-dom'
import HeaderNav from '../components/HeaderNav'
import MainContent from '../components/MainContent'
import { localSignIn } from '../redux/reducers/usersReducer'
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks'
import { auth } from '../services/firebase'
import getMetrics from '../services/getMetrics'
import { initMetrics } from '../redux/reducers/metricsReducer'

function DataPage() {
    const { category } = useParams()
    const title: string = category || 'Title'
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

    return (
        <>
            <HeaderNav />
            <MainContent>
                <h1>{title.charAt(0).toUpperCase() + title.slice(1)}</h1>
                <section>Data Tables</section>
            </MainContent>
        </>
    )
}

export default DataPage
