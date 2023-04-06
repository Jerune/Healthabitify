import { collection, query, where, getDocs } from 'firebase/firestore'
import { Average, DataPoint, Metric, Period } from '../../../types'
import kebabcaseToCamelcase from '../../../utils/kebabcaseToCamelcase'
import { db } from '../../firebase'

export default async function getDatapointsForPeriod(
    allMetrics: Metric[],
    period: Period
) {
    const dateTitle = period.month
        ? `Y${period.year}-M${period.month}`
        : `Y${period.year}-W${period.week}`

    const metricsWithoutAutoSource = allMetrics.filter(
        (metric) => metric.source !== 'auto'
    )

    const allDatapointsForPeriod: Average[] = await Promise.all(
        metricsWithoutAutoSource.map(async (metric) => {
            const metricName = kebabcaseToCamelcase(metric.id)
            const datapoints: Partial<DataPoint>[] = []
            const collectionName = `data-points-${metric.source}`
            const dbQuery = query(
                collection(db, collectionName),
                where('metric', '==', metric.id),
                where('year', '==', period.year),
                period.month
                    ? where('month', '==', period.month)
                    : where('weekNumber', '==', period.week)
            )
            const querySnapshot = await getDocs(dbQuery)
            querySnapshot.forEach((doc) => {
                const { value } = doc.data()
                datapoints.push(value)
            })
            // Return only last value of the week for weekly metrics
            if (metric.frequency === 'weekly') {
                const lastValue = datapoints.slice(-1)
                return {
                    [metricName]: lastValue,
                    type: metric.dataType,
                }
            }
            // Return all daily values for daily metrics
            return {
                [metricName]: datapoints,
                type: metric.dataType,
            }
        })
    )
    return {
        period: dateTitle,
        data: allDatapointsForPeriod,
    }
}
