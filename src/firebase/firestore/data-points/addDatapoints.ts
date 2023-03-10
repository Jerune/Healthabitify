/* eslint-disable no-console */
import { collection, addDoc } from 'firebase/firestore'
import { DateTime } from 'luxon'
import type { DataPoint } from '../../../types'
import { db } from '../../firebase'
import updateWearables from '../wearables/updateWearables'
import { getSpecifiedDateAsString } from '../../../utils/getDatesAsString'

async function addDatapoints(datapoints: DataPoint[]) {
    let highestDate = null
    for (let i = 0; i < datapoints.length; i += 1) {
        const currentDate = new Date(datapoints[i].date)
        if (highestDate === null || currentDate > highestDate) {
            highestDate = currentDate
        }
    }
    datapoints.forEach(async (datapoint) => {
        try {
            await addDoc(collection(db, 'data-points'), { ...datapoint })
        } catch (e) {
            console.error('Error adding document: ', e)
        }
    })

    if (highestDate) {
        const highestDateAsDateTime = DateTime.fromJSDate(highestDate)
        // Sets lastUpdated value to datapoint with highest date + 1
        // this is to avoid duplicate data on when retrieving data next time
        const newLastUpdated = highestDateAsDateTime.plus({ days: 1 })
        const newLastUpdatedAsString = getSpecifiedDateAsString(newLastUpdated)

        updateWearables('fitbit', {
            lastUpdated: newLastUpdatedAsString,
        })
    }
}

export default addDatapoints
