import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth } from '../firebase/firebase'
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks'
import { localSignIn, setDevices } from '../redux/reducers/usersReducer'
import { initMetrics } from '../redux/reducers/metricsReducer'
import getMetrics from '../firebase/firestore/metrics/getMetrics'
import Loading from './Loading'
import getWearables from '../firebase/firestore/wearables/getWearables'
import getFitbitData from '../services/fitbitAPI/getFitbitData'
import transformFitbitData from '../services/fitbitAPI/transformFitbitData'
import addDatapoints from '../firebase/firestore/data-points/addDatapoints'
import { getYesterdaysDateAsString } from '../utils/getDatesAsString'

function AppStateInit() {
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn)
    const devices = useAppSelector((state) => state.user.devices)
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
        dispatch(setDevices(wearablesList))
    }

    async function initializeServiceAPIs() {
        const yesterdayString = getYesterdaysDateAsString()
        if (devices.fitbit.lastUpdated <= yesterdayString) {
            const fitbitDataFromAPI = await getFitbitData(
                devices.fitbit.token,
                devices.fitbit.lastUpdated
            )
            if (fitbitDataFromAPI) {
                const newFitbitDatapoints = await transformFitbitData(
                    fitbitDataFromAPI
                )
                newFitbitDatapoints.forEach((datapoint) => {
                    addDatapoints(datapoint)
                })
            }
        }
    }

    function initApp() {
        setIsLoading(true)
        setLoadingMessage('Getting user metrics...')
        initializeMetrics()
        setLoadingMessage('Getting wearables information...')
        initializeWearables()
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

    useEffect(() => {
        if (devices.fitbit.token) {
            setIsLoading(true)
            setLoadingMessage('Getting Fitbit data...')
            initializeServiceAPIs()
            initializeWearables()
            setIsLoading(false)
        }
    }, [devices.fitbit.token])

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
