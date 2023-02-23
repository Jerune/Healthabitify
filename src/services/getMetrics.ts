import { collection, getDocs } from 'firebase/firestore'
import { db } from './firebase'

async function getMetrics(categoryId: string) {
    const querySnapshot = await getDocs(collection(db, 'metrics'))
    const metricsList = []
    querySnapshot.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() }
        metricsList.push(data)
    })

    const metricsArray = metricsList.filter(
        (metric) => metric.categoryId === categoryId
    )

    const sortedMetrics = metricsArray.sort((a, b) => {
        return a.order - b.order
    })

    console.log(sortedMetrics)
}

export default getMetrics
