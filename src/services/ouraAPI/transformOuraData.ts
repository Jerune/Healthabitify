import { getDateTimeDataForDatapoints } from '../../utils/getDateTimeData'
import matchServiceResourcesWithMetricNames from '../matchResources'

export default async function transformOuraData(ouraData) {
    const source = 'oura'
    const organisedData = ouraData.map((resource) => resource.data)

    const datapointsToAdd = organisedData.map((dailySummary, index) => {
        const isLongSleepData = dailySummary[index].type === 'long_sleep'
        if (isLongSleepData) {
            const newDataPoints = []
            Object.keys(dailySummary[index]).forEach((key) => {
                const metric = matchServiceResourcesWithMetricNames(source, key)
                const value = dailySummary[index][key]
                if (metric !== 'unknown') {
                    const date = dailySummary[index].day
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
                    newDataPoints.push(newDatapoint)
                }
            })
            return newDataPoints
        }
    })
    return datapointsToAdd[0]
}
