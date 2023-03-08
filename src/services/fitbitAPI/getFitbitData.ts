import { getYesterdaysDateAsString } from '../../utils/getDatesAsString'

export default async function getFitbitData(
    token: string,
    lastUpdated: string
) {
    const yesterdayString = getYesterdaysDateAsString()
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
            url: `https://api.fitbit.com/1/user/-/activities/${resource}/date/${lastUpdated}/${yesterdayString}.json`,
        }
    })

    const allFitbitData = await Promise.all(
        endpoints.map(async (endpoint) => {
            const response = await fetch(endpoint.url, headers)
            const responseData = await response.json()

            return responseData
        })
    )

    return allFitbitData
}
