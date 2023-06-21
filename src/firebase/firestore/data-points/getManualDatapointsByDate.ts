import { collection, query, where, getDocs } from 'firebase/firestore'
import kebabcaseToCamelcase from '../../../utils/kebabcaseToCamelcase'
import { db } from '../../firebase'
import { CurrentDateTime, ManualDatapointReturn, Metric } from '../../../types'

async function getManualDatapointsByDate(
    currentDateTime: CurrentDateTime,
    metrics: Metric[],
    labs: boolean
) {
    const { weekNumber, year } = currentDateTime

    const allDatapointsForPeriod = await Promise.all(
        metrics.map(async (metric: Metric) => {
            const metricName = kebabcaseToCamelcase(metric.id)
            const datapoints: ManualDatapointReturn[] = []
            let dbQuery = query(
                collection(db, 'data-points-manual'),
                where('metric', '==', metric.id),
                where('year', '==', year),
                where('weekNumber', '==', weekNumber)
            )

            if (labs) {
                dbQuery = query(
                    collection(db, 'data-points-labs'),
                    where('metric', '==', metric.id)
                )
            }

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
            return {
                [metricName]: datapoints,
                type: metric.dataType,
            }
        })
    )

    return allDatapointsForPeriod
}

export default getManualDatapointsByDate
