import { doc, setDoc } from 'firebase/firestore'
import metricItems from '../data/metricsMock'
import { db } from './firebase'
import { useAppSelector } from '../redux/reduxHooks'

async function addAllMetrics() {
    metricItems.forEach(async (metric) => {
        await setDoc(doc(db, 'metrics', metric.id), metric)
    })
}

export default addAllMetrics
