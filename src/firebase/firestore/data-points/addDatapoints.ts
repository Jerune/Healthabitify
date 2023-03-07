/* eslint-disable no-console */
import { collection, addDoc } from 'firebase/firestore'
import type { DataPoint } from '../../../types'
import { db } from '../../firebase'

async function addDatapoints(datapoints: DataPoint[]) {
    datapoints.forEach(async (datapoint) => {
        try {
            await addDoc(collection(db, 'data-points'), { ...datapoint })
        } catch (e) {
            console.error('Error adding document: ', e)
        }
    })
}

export default addDatapoints
