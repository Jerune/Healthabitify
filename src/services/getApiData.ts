import calculateDifferenceWithToday from '../utils/compareDates'
import {
    getDayBeforeAsString,
    getYesterdaysDateAsString,
} from '../utils/getDatesAsString'
import createMonthlyFetch from './createMonthlyFetch'
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
    const yesterdayString = getYesterdaysDateAsString()
    const dayBeforeLastUpdated = getDayBeforeAsString(lastUpdated)

    // API related Data
    const { baseUrl, resources } = getSourceData(source)
    const headers = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }
    const endpointsList = []

    function getEndpoints({ start, end }) {
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

    // Verify if we need to break up API in monthly dates
    if (differenceBetweenDatesInDays && differenceBetweenDatesInDays > 30) {
        const fetchDates = createMonthlyFetch(lastUpdated, source)
        fetchDates.forEach((fetchDate) => {
            getEndpoints(fetchDate)
        })
    } else {
        const dates = {
            start: source === 'fitbit' ? lastUpdated : dayBeforeLastUpdated,
            end: yesterdayString,
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
                console.log(error)
                return error
            }
        })
    )

    return allData
}
