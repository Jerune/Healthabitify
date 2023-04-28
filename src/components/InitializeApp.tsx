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
import calculateAveragesForPeriod from '../features/InitializeApp/calculateAveragesForPeriod'
import buildAverages from '../features/InitializeApp/buildAverages'
import { getDateTimeDataForPreviousPeriod } from '../utils/getDateTimeData'

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
        setLoadingMessage('Getting user metrics...')
        const metricList = await getMetrics()
        dispatch(initMetrics(metricList))
    }

    async function initializeWearables() {
        setLoadingMessage('Getting wearables information...')
        const wearablesList = await getWearables()
        dispatch(setDevices(wearablesList))
    }

    async function initializeAverages() {
        setLoadingMessage('Running data calculations...')
        // Get lastUpdated date with earliest date
        const earliestLastUpdated =
            devices.fitbit.lastUpdated < devices.oura.lastUpdated
                ? devices.fitbit.lastUpdated
                : devices.oura.lastUpdated
        // Returns weekNumber, month & year of last finished! period based on earliestLastUpdated date
        const datesToCheckFor =
            getDateTimeDataForPreviousPeriod(earliestLastUpdated)
        // To-Do --> Check for new weeks, months, years finalised and get data for those
        // const data = await getDatapointsForPeriod(allMetrics, {
        //     year: 2023,
        //     week: 16,
        // })
        // const averages = await calculateAveragesForPeriod(data)
        // addAverages(averages)
        const averageStoreData = await buildAverages(datesToCheckFor)
        dispatch(initAverages(averageStoreData))
    }

    async function initializeServiceAPIs() {
        setLoadingMessage('Getting latest data from wearables...')
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

    async function initApp() {
        dispatch(changeLoadingStatus(true))
        await initializeMetrics()
        await initializeWearables()
    }

    useEffect(() => {
        if (devices.fitbit.token && devices.oura.token) {
            initializeServiceAPIs()
            initializeAverages()
        }
    }, [devices.fitbit.token])

    // Keeps loader true until all averages have been calculated
    useEffect(() => {
        const currentYear = currentDateTime.year
        if (allAverages[`Y${currentYear}`]) {
            dispatch(changeLoadingStatus(false))
        }
    }, [allAverages])

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
