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
import buildAverages from '../features/AveragesManagement/buildAverages'
import { getDateTimeDataForPreviousPeriod } from '../utils/getDateTimeData'
import getListWithNewPeriods from '../features/AveragesManagement/getListWithNewPeriods'
import createAveragesForNewPeriods from '../features/AveragesManagement/createAveragesForNewPeriods'
import { FitbitRawData, OuraRawData } from '../types'
import { toast } from 'react-toastify'

function AppStateInit() {
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn)
    const devices = useAppSelector((state) => state.user.devices)
    const dispatch = useAppDispatch()
    const allMetrics = useAppSelector((state) => state.metrics)

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
        // Returns list of metrics or error message
        if (typeof metricList !== 'string') {
            dispatch(initMetrics(metricList))
        } else {
            toast.error(metricList)
        }
    }

    async function initializeWearables() {
        dispatch(changeLoadingMessage('Getting wearables information...'))
        const wearablesList = await getWearables()
        // Returns list of wearable data or error message
        if (typeof wearablesList !== 'string') {
            dispatch(setDevices(wearablesList))
        } else {
            toast.error(wearablesList)
        }
    }

    async function initializeServiceAPIs() {
        dispatch(changeLoadingMessage('Gathering new data from wearables'))
        const yesterdayString = getYesterdaysDateAsString()
        // Checks if there is any new dates with possible new data
        if (devices.fitbit.lastUpdated <= yesterdayString) {
            dispatch(changeLoadingMessage('Gathering Fitbit Data'))
            // Gets data for those dates from Fitbit API
            const fitbitDataFromAPI = (await getApiData(
                'fitbit',
                devices.fitbit.token,
                devices.fitbit.lastUpdated
            )) as FitbitRawData[]
            if (typeof fitbitDataFromAPI !== 'string') {
                dispatch(changeLoadingMessage('Transforming Fitbit data'))
                // Transforms Fitbit data to a readable format if new data is returned
                const newFitbitDatapoints = await transformFitbitData(
                    fitbitDataFromAPI
                )
                // Adds new datapoints to database
                if (newFitbitDatapoints.length > 0) {
                    const newDataPromises = newFitbitDatapoints.map(
                        async (datapoint) => {
                            const amountOfNewDatapoints = await addDatapoints(
                                datapoint
                            )
                            return amountOfNewDatapoints
                        }
                    )

                    // Calculates amount of added datapoints
                    const newDataCounts = await Promise.all(newDataPromises)
                    const totalAmountOfNewDatapoints = newDataCounts.reduce(
                        (sum, count) => sum + count,
                        0
                    )

                    // Sends update on added datapoints
                    toast.success(
                            `${totalAmountOfNewDatapoints} new Fitbit datapoints have been added`
                        )
                }
            } else if (fitbitDataFromAPI === 'error') {
                    toast.error(
                        'An error occured while getting the Fitbit Data, please try again later'
                    )
            }
        }
        if (devices.oura.lastUpdated <= yesterdayString) {
            dispatch(changeLoadingMessage('Gathering Oura Data'))

            const ouraDataFromAPI = (await getApiData(
                'oura',
                devices.oura.token,
                devices.oura.lastUpdated
            )) as OuraRawData

            if (typeof ouraDataFromAPI[0] !== 'string') {
                dispatch(changeLoadingMessage('Transforming Oura data'))
                const newOuraDatapoints = await transformOuraData(
                    ouraDataFromAPI
                )
                if (newOuraDatapoints.length > 0) {
                    const amountOfNewDatapoints = await addDatapoints(
                        newOuraDatapoints
                    )
                    
                        toast.success(
                            `${amountOfNewDatapoints} new Oura datapoints have been added`
                        )
                 
                }
            } else if (ouraDataFromAPI[0] === 'error') {
        
                    toast.error(
                        'An error occured while getting the Oura Data, please try again later'
                    )
            }
        }
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
        const newPeriods = await getListWithNewPeriods(datesToCheckFor)
        // Creates new datapoints for the new periods and adds averages
        if (newPeriods.length > 0) {
            dispatch(changeLoadingMessage('Getting results for latest weeks'))
            const amountOfNewAverages = await createAveragesForNewPeriods(
                newPeriods,
                allMetrics
            )
            // Showing results in Toast

                toast.success(
                    `${amountOfNewAverages} new averages have been calculated`
                )
        }
        // Builds all averages to be used in the app up to current date
        // Runs on 2 second timeout to make sure new averages have been added
        // To-Do: Find alternative for setTimeOut()
        dispatch(changeLoadingMessage('Calculating final results'))
        setTimeout(async () => {
            const averageStoreData = await buildAverages(datesToCheckFor)
            dispatch(initAverages(averageStoreData))
        }, 2000)
    }

    async function manualAdjustments() {
        // Function that can be used to perform separate manual adjustments
    }

    async function initApp() {
        dispatch(changeLoadingStatus(true))
        await initializeMetrics()
        await initializeWearables()
        await manualAdjustments()
    }

    async function updateData() {
        dispatch(changeLoadingStatus(true))
        await initializeServiceAPIs()
        await initializeWearables()
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
        if (devices.fitbit.lastUpdated && devices.oura.lastUpdated) {
            updateData()
        }
    }, [devices.fitbit.lastUpdated, devices.oura.lastUpdated])

    return null
}

export default AppStateInit
