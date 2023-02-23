import { doc, updateDoc } from 'firebase/firestore'
import { db } from './firebase'
import type { Metric } from '../types'

async function updateMetric(updatedMetric: Metric) {
    const metricRef = doc(db, 'metrics', updatedMetric.id)
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
    } = updatedMetric

    await updateDoc(metricRef, {
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
    })
}

export default updateMetric
