import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'
import type { Metric } from '../../../types'

async function getMetrics() {
    const querySnapshot = await getDocs(collection(db, 'metrics'))
    const metricsList: Metric[] = []
    querySnapshot.forEach((doc) => {
        const {
            order,
            name,
            active,
            onDashboard,
            source,
            dataType,
            unit,
            categoryId,
            categoryIcon,
            isFixed,
            frequency,
            goal,
            conditionsMode,
            good,
            medium,
            bad,
        } = doc.data()
        const data: Metric = {
            id: doc.id,
            order,
            name,
            active,
            onDashboard,
            source,
            dataType,
            unit,
            categoryId,
            categoryIcon,
            isFixed,
            frequency,
            goal,
            conditionsMode,
            good,
            medium,
            bad,
        }
        metricsList.push(data)
    })

    return metricsList
}

export default getMetrics
