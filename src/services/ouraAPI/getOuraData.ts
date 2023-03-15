import { getYesterdaysDateAsString } from '../../utils/getDatesAsString'

export default async function getOuraData(token: string, lastUpdated: string) {
    const yesterdayString = getYesterdaysDateAsString()
    const headers = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer MIC4BJAXQWM5HIEGJDIO6SCBJNAZTI5V`,
        },
    }
    const resources = ['daily_sleep']
    const endpoints = resources.map((resource) => {
        return {
            name: resource,
            // Change before going live to Oura link
            url: `/v2/usercollection/${resource}?start_date=${lastUpdated}&end_date=${yesterdayString}`,
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
