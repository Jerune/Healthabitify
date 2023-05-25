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
import createAveragesForNewPeriods from '../features/AveragesManagement/createAveragesForNewPeriods'

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
        dispatch(changeLoadingMessage('Loading user settings...'))
        const metricList = await getMetrics()
        dispatch(initMetrics(metricList))
    }

    async function initializeWearables() {
        dispatch(changeLoadingMessage('Getting wearables information...'))
        const wearablesList = await getWearables()
        dispatch(setDevices(wearablesList))
    }

    async function initializeServiceAPIs() {
        dispatch(changeLoadingMessage('Gathering new data from wearables'))
        const yesterdayString = getYesterdaysDateAsString()
        if (devices.fitbit.lastUpdated <= yesterdayString) {
            dispatch(changeLoadingMessage('Gathering Fitbit Data'))
            const fitbitDataFromAPI = await getApiData(
                'fitbit',
                devices.fitbit.token,
                devices.fitbit.lastUpdated
            )
            if (fitbitDataFromAPI !== 'error') {
                dispatch(changeLoadingMessage('Transforming Fitbit data'))
                const newFitbitDatapoints = await transformFitbitData(
                    fitbitDataFromAPI
                )
                newFitbitDatapoints.forEach((datapoint) => {
                    addDatapoints(datapoint)
                })
            }
        }
        if (devices.oura.lastUpdated <= yesterdayString) {
            dispatch(changeLoadingMessage('Gathering Oura Data'))
            const ouraDataFromAPI = await getApiData(
                'oura',
                devices.oura.token,
                devices.oura.lastUpdated
            )
            if (ouraDataFromAPI !== 'error') {
                dispatch(changeLoadingMessage('Transforming Oura data'))
                const newOuraDatapoints = await transformOuraData(
                    ouraDataFromAPI
                )
                addDatapoints(newOuraDatapoints)
            }
        }
        initializeWearables()
    }

    async function initializeAverages() {
        dispatch(changeLoadingMessage('Running data calculations'))
        // Get lastUpdated date with earliest date
        const earliestLastUpdated =
            devices.fitbit.lastUpdated < devices.oura.lastUpdated
                ? devices.fitbit.lastUpdated
                : devices.oura.lastUpdated
        // Returns weekNumber, month & year of last finished! period based on earliestLastUpdated date
        const datesToCheckFor =
            getDateTimeDataForPreviousPeriod(earliestLastUpdated)
        // Checks for new weeks, months, years finalised
        // const dates = { year: 2019, month: 12, weekNumber: 52 }
        // const newPeriods = await getListWithNewPeriods(dates)
        // console.log(newPeriods)
        // Creates new datapoints for the new periods and adds averages
        // if (newPeriods.length > 0) {
        //     dispatch(changeLoadingMessage('Getting results for latest weeks'))
        //     await createAveragesForNewPeriods(newPeriods, allMetrics)
        // }
        // Builds all averages to be used in the app up to current date
        dispatch(changeLoadingMessage('Calculating final results'))
        const averageStoreData = await buildAverages(datesToCheckFor)
        dispatch(initAverages(averageStoreData))
    }

    async function initApp() {
        dispatch(changeLoadingStatus(true))
        await initializeMetrics()
        await initializeWearables()
    }

    async function updateData() {
        dispatch(changeLoadingStatus(true))
        await initializeServiceAPIs()
        await initializeAverages()
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
            updateData()
        }
    }, [devices.fitbit.token, devices.oura.token])

    return null
}

export default AppStateInit
