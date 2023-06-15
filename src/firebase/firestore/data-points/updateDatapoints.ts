/* eslint-disable no-console */
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase'

async function updateDatapoints(datapoints) {
    datapoints.forEach(async (datapoint) => {
        const { id, value } = datapoint
        const docReference = doc(db, 'data-points-manual', id)

        try {
            await updateDoc(docReference, {
                value,
                timestamp: serverTimestamp(),
            })
            console.log(`Document with id ${id} has been updated to ${value}`)
        } catch (error) {
            console.log(`Error while updating document in Firebase ${error}`)
        }
    })
}

export default updateDatapoints
