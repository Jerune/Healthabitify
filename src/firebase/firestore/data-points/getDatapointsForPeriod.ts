import { collection, query, where, getDocs } from 'firebase/firestore'
import { DataPoint, Metric, Period } from '../../../types'
import kebabcaseToCamelcase from '../../../utils/kebabcaseToCamelcase'
import { db } from '../../firebase'

export default async function getDatapointsForPeriod(
    allMetrics: Metric[],
    period: Period
) {
    const dateTitle = period.month
        ? `Y${period.year}-M${period.month}`
        : `Y${period.year}-W${period.week}`
    const allDatapointsForPeriod = await Promise.all(
        allMetrics.map(async (metric) => {
            const metricName = kebabcaseToCamelcase(metric.id)
            const datapoints: Partial<DataPoint>[] = []
            const hasValidSource = metric.source !== 'auto'
            if (hasValidSource) {
                const metricRef = collection(db, `data-points-${metric.source}`)
                const dbQuery = query(
                    metricRef,
                    where('metric', '==', metric.id),
                    where('year', '==', period.year),
                    period.month
                        ? where('month', '==', period.month)
                        : where('week', '==', period.week)
                )
                const querySnapshot = await getDocs(dbQuery)
                querySnapshot.forEach((doc) => {
                    const { value } = doc.data()
                    datapoints.push({
                        value,
                    })
                })
            }

            return {
                [metricName]: datapoints,
            }
        })
    )

    return {
        period: dateTitle,
        data: [...allDatapointsForPeriod],
    }
}