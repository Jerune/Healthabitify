/* eslint-disable no-console */
import { collection, addDoc } from 'firebase/firestore'
import type { DataPoint } from '../../../types'
import { db } from '../../firebase'
import updateWearables from '../wearables/updateWearables'
import { getTodaysDateAsString } from '../../../utils/getDatesAsString'

async function addDatapoints(datapoints: DataPoint[]) {
    const today = getTodaysDateAsString()
    datapoints.forEach(async (datapoint) => {
        try {
            await addDoc(collection(db, 'data-points'), { ...datapoint })
        } catch (e) {
            console.error('Error adding document: ', e)
        }
    })
    updateWearables('fitbit', {
        lastUpdated: today,
    })
}

export default addDatapoints
