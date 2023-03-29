import { doc, setDoc } from 'firebase/firestore'
import { AveragesReturn } from '../../../types'
import { db } from '../../firebase'

async function addAverages(periodData: AveragesReturn) {
    const { period, keys } = periodData

    await setDoc(doc(db, 'averages', period), {
        ...keys,
    })
}

export default addAverages
