import { DataPoint, FitbitData, FitbitRawData } from '../../types'
import { getDateTimeDataForDatapoints } from '../../utils/getDateTimeData'
import matchServiceResourcesWithMetricNames from '../matchResources'

export default function transformFitbitData(fitbitData: FitbitRawData[]) {
    const source = 'fitbit'
    const datapointsToAdd = fitbitData.map((datapointsCollection) => {
        const resourceNameFromAPI = Object.keys(datapointsCollection)[0]
        const metric = matchServiceResourcesWithMetricNames(
            source,
            resourceNameFromAPI
        )

        const newDataPoints: DataPoint[] = datapointsCollection[
            resourceNameFromAPI
        ].map((datapoint: FitbitData) => {
            const date = datapoint.dateTime
            const { value } = datapoint
            const { month, weekNumber, year } =
                getDateTimeDataForDatapoints(date)
            return {
                userId: 'nbkxUOC66VVE7CbqhloaTQJKiRH3',
                value,
                date,
                source,
                metric,
                weekNumber,
                month,
                year,
            }
        })
        return newDataPoints
    })

    return datapointsToAdd
}
