import { getYesterdaysDateAsString } from '../utils/getDatesAsString'
import getSourceData from './getSourceData'

export default async function getApiData(
    source: string,
    token: string,
    lastUpdated: string
) {
    if (source !== 'oura' && source !== 'fitbit') {
        return 'error'
    }

    const yesterdayString = getYesterdaysDateAsString()
    const { baseUrl, resources } = getSourceData(source)

    const headers = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }

    const endpoints = resources.map((resource) => {
        const url =
            source === 'oura'
                ? `/v2/usercollection/${resource}?start_date=${lastUpdated}&end_date=${yesterdayString}`
                : `${baseUrl}/${resource}/date/${lastUpdated}/${yesterdayString}.json`
        return {
            url,
        }
    })

    const allData = await Promise.all(
        endpoints.map(async (endpoint) => {
            const response = await fetch(endpoint.url, headers)
            const responseData = await response.json()

            return responseData
        })
    )

    return allData
}
