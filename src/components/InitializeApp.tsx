import { onAuthStateChanged } from 'firebase/auth'
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth } from '../firebase/firebase'
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks'
import { localSignIn, setDevices } from '../redux/reducers/usersReducer'
import { initMetrics } from '../redux/reducers/metricsReducer'
import getMetrics from '../firebase/firestore/metrics/getMetrics'
import Loading from './Loading'
import getWearables from '../firebase/firestore/wearables/getWearables'
import transformFitbitData from '../services/fitbitAPI/transformFitbitData'
import addDatapoints from '../firebase/firestore/data-points/addDatapoints'
import { getYesterdaysDateAsString } from '../utils/getDatesAsString'
import getApiData from '../services/getApiData'
import transformOuraData from '../services/ouraAPI/transformOuraData'
import { OuraRawData } from '../types'

function AppStateInit() {
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
                    return user
                }
                return <Navigate to="/" />
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
            const fitbitDataFromAPI = await getApiData(
                'fitbit',
                devices.fitbit.token,
                devices.fitbit.lastUpdated
            )
            if (fitbitDataFromAPI !== 'error') {
                const newFitbitDatapoints = await transformFitbitData(
                    fitbitDataFromAPI
                )
                newFitbitDatapoints.forEach((datapoint) => {
                    addDatapoints(datapoint)
                })
            }
        }
        if (devices.oura.lastUpdated <= yesterdayString) {
            const ouraDataFromAPI = await getApiData(
                'oura',
                devices.oura.token,
                devices.oura.lastUpdated
            )
            if (ouraDataFromAPI !== 'error') {
                const newOuraDatapoints = await transformOuraData(
                    ouraDataFromAPI
                )
                addDatapoints(newOuraDatapoints)
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
