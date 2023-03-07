import addDatapoints from '../../firebase/firestore/data-points/addDatapoints'
import { DataPoint, FitbitData, FitbitRawData } from '../../types'
import getDateTimeDataForDatapoints from '../../utils/getDateTimeData'
import matchServiceResourcesWithMetricNames from '../matchResources'

export default function transformFitbitData(fitbitData: FitbitRawData): void {
    const source = 'fitbit'
    const resourceNameFromAPI = Object.keys(fitbitData)[0]
    const metric = matchServiceResourcesWithMetricNames(
        source,
        resourceNameFromAPI
    )

    const newDataPoints: DataPoint[] = fitbitData[resourceNameFromAPI].map(
        (datapoint: FitbitData) => {
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
        }
    )
    addDatapoints(newDataPoints)
}
