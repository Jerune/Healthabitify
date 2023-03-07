/* eslint-disable no-console */
import { collection, addDoc } from 'firebase/firestore'
import type { FitbitData } from '../../../types'
import getDateTimeDataForDatapoints from '../../../utils/getDateTimeData'
import { db } from '../../firebase'

async function addDatapoints(datapointData: FitbitData[]) {
    datapointData.forEach(async (datapoint) => {
        const { month, weekNumber, year } = await getDateTimeDataForDatapoints(
            datapoint.dateTime
        )
        try {
            await addDoc(collection(db, 'data-points'), {
                userId: 'nbkxUOC66VVE7CbqhloaTQJKiRH3',
                value: datapoint.value,
                date: datapoint.dateTime,
                source: 'fitbit',
                metric: 'total-average-calorie-burn',
                week: weekNumber,
                month,
                year,
            })
        } catch (e) {
            console.error('Error adding document: ', e)
        }
    })
}

export default addDatapoints
