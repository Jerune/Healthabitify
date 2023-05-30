/* eslint-disable no-console */
import { doc, setDoc } from 'firebase/firestore'
import { AveragesReturn } from '../../../types'
import { db } from '../../firebase'

async function addAverages(periodData: AveragesReturn) {
    const { period, keys } = periodData

    try {
        await setDoc(doc(db, 'averages', period), {
            ...keys,
        })
        console.log(
            `Averages for ${period} have been added successfully to the averages collection`
        )
    } catch (error) {
        console.log(error)
    }
}

export default addAverages
