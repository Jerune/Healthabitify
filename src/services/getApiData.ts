import { Endpoint, EndpointsDates } from '../types'
import calculateDifferenceWithToday from '../utils/compareDates'
import {
    getDayBeforeAsString,
    getYesterdaysDateAsString,
} from '../utils/getDatesAsString'
import createMonthlyFetch from './createMonthlyFetch'
import getLastSyncTime from './fitbitAPI/getLastSyncTime'
import getSourceData from './getSourceData'

export default async function getApiData(
    source: string,
    token: string,
    lastUpdated: string
) {
    if (source !== 'oura' && source !== 'fitbit') {
        return 'error'
    }

    // Dates
    // dayBeforeLastUpdated to be used for Oura API as starts with day after start_date value
    let endDateAsString = getYesterdaysDateAsString()
    const dayBeforeLastUpdated = getDayBeforeAsString(lastUpdated)

    // FITBIT: Check when fitbit app is updated last
    // return error when last sync is same as last updated (no update needed)
    if (source === 'fitbit') {
        const fitbitLastSynchedDate = await getLastSyncTime(token)
        let fitbitDayBeforeLastSynchedDate = dayBeforeLastUpdated
        if (
            fitbitLastSynchedDate === lastUpdated ||
            fitbitLastSynchedDate === 'error'
        ) {
            return 'error'
        }
        fitbitDayBeforeLastSynchedDate = getDayBeforeAsString(
            fitbitLastSynchedDate
        )

        // Set enddate to day before last sync date if last sync date is in the past
        // Otherwise Fitbit will return empty data that will be saved in the db
        // as well as set lastUpdated to current date (so no update when data is synced)
        if (fitbitDayBeforeLastSynchedDate < endDateAsString) {
            endDateAsString = fitbitDayBeforeLastSynchedDate
        }
    }

    // API related Data
    const { baseUrl, resources } = getSourceData(source)
    const headers = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }
    const endpointsList: Endpoint[] = []

    function getEndpoints({ start, end }: EndpointsDates) {
        const endpoints = resources.map((resource) => {
            const url =
                source === 'oura'
                    ? `/v2/usercollection/${resource}?start_date=${start}&end_date=${end}`
                    : `${baseUrl}/${resource}/date/${start}/${end}.json`
            return {
                url,
            }
        })

        endpointsList.push(...endpoints)
    }

    const differenceBetweenDatesInDays =
        calculateDifferenceWithToday(lastUpdated)

    // Verify if we need to break up API calls in monthly dates
    if (differenceBetweenDatesInDays && differenceBetweenDatesInDays > 30) {
        const fetchDates = createMonthlyFetch(lastUpdated, source)
        fetchDates.forEach((fetchDate) => {
            getEndpoints(fetchDate)
        })
        // Or if the last fetch date is less than 30 days apart
    } else {
        const dates = {
            start: source === 'fitbit' ? lastUpdated : dayBeforeLastUpdated,
            end: endDateAsString,
        }
        getEndpoints(dates)
    }

    const allData = await Promise.all(
        endpointsList.map(async (endpoint) => {
            try {
                const response = await fetch(endpoint.url, headers)
                const responseData = await response.json()
                return responseData
            } catch (error) {
                return error
            }
        })
    )

    return allData
}
