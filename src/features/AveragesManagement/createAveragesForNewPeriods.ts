import addAverages from '../../firebase/firestore/averages/addAverages'
import getDatapointsForPeriod from '../../firebase/firestore/data-points/getDatapointsForPeriod'
import { DatapointsReturn, Metric, Period } from '../../types'
import calculateAveragesForPeriod from './calculateAveragesForPeriod'

async function createAveragesForNewPeriods(
    newPeriods: Period[],
    allMetrics: Metric[]
) {
    newPeriods.map(async (newPeriod) => {
        const datapoints: DatapointsReturn = await getDatapointsForPeriod(
            allMetrics,
            newPeriod
        )
        if (datapoints.data.length > 0) {
            const averages = await calculateAveragesForPeriod(datapoints)
            addAverages(averages)
        }
    })
}

export default createAveragesForNewPeriods
