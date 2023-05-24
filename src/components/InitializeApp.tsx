import { onAuthStateChanged } from 'firebase/auth'
import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { auth } from '../firebase/firebase'
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks'
import { localSignIn, setDevices } from '../redux/reducers/usersReducer'
import {
    changeLoadingMessage,
    changeLoadingStatus,
} from '../redux/reducers/utilsReducer'
import { initMetrics } from '../redux/reducers/metricsReducer'
import { initAverages } from '../redux/reducers/averagesReducer'
import getMetrics from '../firebase/firestore/metrics/getMetrics'
import getWearables from '../firebase/firestore/wearables/getWearables'
import transformFitbitData from '../services/fitbitAPI/transformFitbitData'
import addDatapoints from '../firebase/firestore/data-points/addDatapoints'
import { getYesterdaysDateAsString } from '../utils/getDatesAsString'
import getApiData from '../services/getApiData'
import transformOuraData from '../services/ouraAPI/transformOuraData'
import getDatapointsForPeriod from '../firebase/firestore/data-points/getDatapointsForPeriod'
import addAverages from '../firebase/firestore/averages/addAverages'
import calculateAveragesForPeriod from '../features/AveragesManagement/calculateAveragesForPeriod'
import buildAverages from '../features/AveragesManagement/buildAverages'
import { getDateTimeDataForPreviousPeriod } from '../utils/getDateTimeData'
import getSheetData from '../services/googleSheetsAPI/getSheetData'
import averageExistsInDatabase from '../firebase/firestore/averages/averageExistsInDatabase'
import getListWithNewPeriods from '../features/AveragesManagement/getListWithNewPeriods'

function AppStateInit() {
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn)
    const devices = useAppSelector((state) => state.user.devices)
    const dispatch = useAppDispatch()
    const allMetrics = useAppSelector((state) => state.metrics)
    const allAverages = useAppSelector((state) => state.averages)
    const currentDateTime = useAppSelector(
        (state) => state.utils.currentDateTime
    )

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
        dispatch(changeLoadingMessage('Getting user metrics...'))
        const metricList = await getMetrics()
        dispatch(initMetrics(metricList))
    }

    async function initializeWearables() {
        dispatch(changeLoadingMessage('Getting wearables information...'))
        const wearablesList = await getWearables()
        dispatch(setDevices(wearablesList))
    }

    async function initializeAverages() {
        dispatch(changeLoadingMessage('Running data calculations...'))
        // Get lastUpdated date with earliest date
        const earliestLastUpdated =
            devices.fitbit.lastUpdated < devices.oura.lastUpdated
                ? devices.fitbit.lastUpdated
                : devices.oura.lastUpdated
        // Returns weekNumber, month & year of last finished! period based on earliestLastUpdated date
        const datesToCheckFor =
            getDateTimeDataForPreviousPeriod(earliestLastUpdated)
        // Checks for new weeks, months, years finalised and get data for those
        const newPeriods = await getListWithNewPeriods(datesToCheckFor)
        console.log(newPeriods)
        // To-Do -- Transform to own function
        // if (newPeriods.length > 0) {
        //     newPeriods.map(async (newPeriod) => {
        //         const datapoints = await getDatapointsForPeriod(
        //             allMetrics,
        //             newPeriod
        //         )
        //         if (datapoints.data.length > 0) {
        //             const averages = await calculateAveragesForPeriod(
        //                 datapoints
        //             )
        //             addAverages(averages)
        //         }
        //     })
        // }
        const averageStoreData = await buildAverages(datesToCheckFor)
        dispatch(initAverages(averageStoreData))
    }

    async function initializeServiceAPIs() {
        dispatch(changeLoadingMessage('Getting latest data from wearables...'))
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

    useEffect(() => {
        if (!isLoggedIn) {
            CheckIfUserIsAuthenticated()
        }
        if (isLoggedIn) {
            initApp()
        }
    }, [isLoggedIn])

    return null
}

export default AppStateInit
