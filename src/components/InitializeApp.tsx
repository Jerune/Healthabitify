import { onAuthStateChanged } from 'firebase/auth'
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth } from '../firebase/firebase'
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks'
import { localSignIn, setDevices } from '../redux/reducers/usersReducer'
import { changeLoadingStatus } from '../redux/reducers/utilsReducer'
import { initMetrics } from '../redux/reducers/metricsReducer'
import { initAverages } from '../redux/reducers/averagesReducer'
import getMetrics from '../firebase/firestore/metrics/getMetrics'
import Loading from './Loading'
import getWearables from '../firebase/firestore/wearables/getWearables'
import transformFitbitData from '../services/fitbitAPI/transformFitbitData'
import addDatapoints from '../firebase/firestore/data-points/addDatapoints'
import { getYesterdaysDateAsString } from '../utils/getDatesAsString'
import getApiData from '../services/getApiData'
import transformOuraData from '../services/ouraAPI/transformOuraData'
import getDatapointsForPeriod from '../firebase/firestore/data-points/getDatapointsForPeriod'
import addAverages from '../firebase/firestore/averages/addAverages'
import calculateAveragesForPeriod from '../features/DataGrid/calculateAveragesForPeriod'
import buildAverages from '../features/InitializeApp/buildAverages'

function AppStateInit() {
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn)
    const devices = useAppSelector((state) => state.user.devices)
    const isLoading = useAppSelector((state) => state.utils.isLoading)
    const allMetrics = useAppSelector((state) => state.metrics)
    const allAverages = useAppSelector((state) => state.averages)
    const currentDateTime = useAppSelector(
        (state) => state.utils.currentDateTime
    )
    const dispatch = useAppDispatch()
    const [loadingMessage, setLoadingMessage] = useState('')

    async function CheckIfUserIsAuthenticated() {
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

    // To-Do --> Still needs to be setup with an automatic check for the
    // dates that have passed so new data can be retrieved and turned into averages
    async function initializeAverages() {
        // To-Do --> Check for new weeks, months, years finalised and get data for those
        // const data = await getDatapointsForPeriod(allMetrics, {
        //     year: 2023,
        // })
        // const averages = await calculateAveragesForPeriod(data)
        // addAverages(averages)

        // Get lastUpdated date with earliest date
        const earliestLastUpdated =
            devices.fitbit.lastUpdated < devices.oura.lastUpdated
                ? devices.fitbit.lastUpdated
                : devices.oura.lastUpdated
        const averageStoreData = await buildAverages(earliestLastUpdated)
        dispatch(initAverages(averageStoreData))
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
        initializeWearables()
    }

    function initApp() {
        dispatch(changeLoadingStatus(true))
        setLoadingMessage('Getting user metrics...')
        initializeMetrics()
        setLoadingMessage('Getting wearables information...')
        initializeWearables()
        dispatch(changeLoadingStatus(false))
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
        if (devices.fitbit.token && devices.oura.token) {
            dispatch(changeLoadingStatus(true))
            setLoadingMessage('Getting latest data from wearables...')
            initializeServiceAPIs()
            setLoadingMessage('Running data calculations...')
            initializeAverages()
        }
    }, [devices.fitbit.token])

    useEffect(() => {
        const currentYear = currentDateTime.year
        if (allAverages[`Y${currentYear}`]) {
            dispatch(changeLoadingStatus(false))
        }
    }, [allAverages])

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
