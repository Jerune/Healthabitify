import { collection, query, where, getDocs } from 'firebase/firestore'
import kebabcaseToCamelcase from '../../../utils/kebabcaseToCamelcase'
import { db } from '../../firebase'
import { DataPoint, Metric } from '../../../types'

async function getManualDatapointsByDate(currentDateTime, metrics: Metric[]) {
    const { weekNumber, year } = currentDateTime

    const allDatapointsForPeriod = await Promise.all(
        metrics.map(async (metric: Metric) => {
            const metricName = kebabcaseToCamelcase(metric.id)
            const datapoints: Partial<DataPoint>[] = []
            const dbQuery = query(
                collection(db, 'data-points-manual'),
                where('metric', '==', metric.id),
                where('year', '==', year),
                where('weekNumber', '==', weekNumber)
            )

            const querySnapshot = await getDocs(dbQuery)
            const docDates: string[] = []
            querySnapshot.forEach((doc) => {
                const { id } = doc
                const { value, date } = doc.data()
                if (!docDates.includes(date)) {
                    docDates.push(date)
                    datapoints.push({ value, date, id })
                }
            })
            // Return all daily values for daily metrics
            return {
                [metricName]: datapoints,
                type: metric.dataType,
            }
        })
    )

    return allDatapointsForPeriod
}

export default getManualDatapointsByDate
