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
import getFitbitData from '../hooks/getFitbitData'

function AppStateInit() {
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn)
    const fitbitToken = useAppSelector(
        (state) => state.user.devices.fitbit.token
    )
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [loadingMessage, setLoadingMessage] = useState('')

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

    async function initializeMetrics() {
        const metricList = await getMetrics()
        dispatch(initMetrics(metricList))
    }

    async function initializeWearables() {
        const wearablesList = await getWearables()
        dispatch(setDeviceTokens(wearablesList))
    }

    async function updateWearablesData() {
        const fitbitData = await getFitbitData(
            'https://api.fitbit.com/1/user/-/activities/date/2023-03-03.json',
            fitbitToken
        )
        console.log(fitbitData)
    }

    function initApp() {
        setIsLoading(true)
        setLoadingMessage('Getting user metrics...')
        initializeMetrics()
        setLoadingMessage('Getting wearables information...')
        initializeWearables()
        setLoadingMessage('Getting fitbit data')
        updateWearablesData()
        setIsLoading(false)
    }

    useEffect(() => {
        if (!isLoggedIn) {
            CheckIfUserIsAuthenticated()
        }
        if (isLoggedIn) {
            initApp()
        }
    }, [isLoggedIn])

    if (isLoading) {
        return (
            <div className="w-full h-screen flex flex-col justify-center items-center gap-6 bg-white">
                <Loading size={50} />
                <h3>{loadingMessage}</h3>
            </div>
        )
    }
    return null
}

export default AppStateInit
