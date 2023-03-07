import getTodaysDateAsString from '../../utils/getTodaysDateAsString'
import transformFitbitData from './transformFitbitData'

export default async function getFitbitData(
    token: string,
    lastUpdated: string
) {
    const todayString = await getTodaysDateAsString()
    const headers = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }
    const resources = ['activityCalories', 'steps', 'minutesSedentary', 'heart']
    const endpoints = resources.map((resource) => {
        return {
            name: resource,
            url: `https://api.fitbit.com/1/user/-/activities/${resource}/date/${lastUpdated}/${todayString}.json`,
        }
    })

    endpoints.map(async (endpoint) => {
        const response = await fetch(endpoint.url, headers)
        const responseData = await response.json()

        transformFitbitData(responseData)
    })
}
