import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'

export default async function updateWearables(
    source: string,
    changeObj: { [key]: string }
) {
    const metricRef = doc(db, 'wearables', source)
    const key: string = Object.keys(changeObj)[0]
    const value = changeObj[key]

    await updateDoc(metricRef, {
        [key]: value,
    })
}
