import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth } from '../services/firebase'
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks'
import { localSignIn, setDeviceTokens } from '../redux/reducers/usersReducer'
import { initMetrics } from '../redux/reducers/metricsReducer'
import getMetrics from '../services/getMetrics'
import Loading from './Loading'
import getWearables from '../services/getWearables'

function AppState() {
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector((state) => state.users.isLoggedIn)
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState(false)

    function CheckIfUserIsAuthenticated() {
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
    }

    async function initializeWearables() {
        const wearablesList = await getWearables()
        dispatch(setDeviceTokens(wearablesList))
    }

    async function initializeMetrics() {
        const metricList = await getMetrics()
        dispatch(initMetrics(metricList))
    }

    function initApp() {
        setIsLoading(true)
        CheckIfUserIsAuthenticated()
        initializeMetrics()
        initializeWearables()
        setIsLoading(false)
    }

    useEffect(() => {
        if (isLoggedIn) {
            initApp()
        }
    }, [isLoggedIn])

    if (isLoading) {
        return (
            <div className="w-full h-screen flex flex-col justify-center items-center gap-6 bg-white">
                <Loading size={50} />
            </div>
        )
    }
    return null
}

export default AppState
