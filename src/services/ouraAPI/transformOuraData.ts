import { getDateTimeDataForDatapoints } from '../../utils/getDateTimeData'
import matchServiceResourcesWithMetricNames from '../matchResources'

export default async function transformOuraData(ouraRawData) {
    const datapointsToAdd = []
    const source = 'oura'
    const longSleepData = ouraRawData[0].data.filter(
        (resource) => resource.type === 'long_sleep'
    )

    await longSleepData.forEach((dailySummary) => {
        Object.keys(dailySummary).forEach((key) => {
            const metric = matchServiceResourcesWithMetricNames(source, key)
            const value = dailySummary[key]
            if (metric !== 'unknown') {
                const date = dailySummary.day
                const { month, weekNumber, year } =
                    getDateTimeDataForDatapoints(date)

                const newDatapoint = {
                    userId: 'nbkxUOC66VVE7CbqhloaTQJKiRH3',
                    value,
                    date,
                    source,
                    metric,
                    weekNumber,
                    month,
                    year,
                }
                datapointsToAdd.push(newDatapoint)
            }
        })
    })
    return datapointsToAdd
}
