import { collection, query, where, getDocs } from 'firebase/firestore'
import { DataPoint, Metric } from '../../../types'
import { db } from '../../firebase'

export default async function getDatapointsSelection(
    activeMetrics: Metric[],
    userId: string
) {
    const allDatapoints = await Promise.all(
        activeMetrics.map(async (activeMetric) => {
            const datapoints: Partial<DataPoint>[] = []
            const hasValidSource =
                activeMetric.source === 'oura' ||
                activeMetric.source === 'fitbit'
            if (hasValidSource) {
                const metricRef = collection(
                    db,
                    `data-points-${activeMetric.source}`
                )
                const dbQuery = query(
                    metricRef,
                    where('userId', '==', userId),
                    where('metric', '==', activeMetric.id)
                )
                const querySnapshot = await getDocs(dbQuery)
                querySnapshot.forEach((doc) => {
                    const { value, date, weekNumber, month, year } = doc.data()
                    datapoints.push({
                        value,
                        date,
                        weekNumber,
                        month,
                        year,
                    })
                })
            }

            return {
                metric: activeMetric.id,
                data: datapoints,
            }
        })
    )
}
