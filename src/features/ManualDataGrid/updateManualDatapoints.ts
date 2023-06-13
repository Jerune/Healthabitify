import addDatapoints from '../../firebase/firestore/data-points/addDatapoints'
import { DataPoint } from '../../types'
import { getDateTimeDataForDatapoints } from '../../utils/getDateTimeData'

function updateManualDatapoints(potentialDatapoints: Partial<DataPoint>[]) {
    const newPotentialDatapoints = potentialDatapoints.filter(
        (datapoint) => datapoint.id === 'new'
    )

    const newDatapoints = newPotentialDatapoints.map((datapoint) => {
        const { date, value, metric } = datapoint
        const { month, weekNumber, year } = getDateTimeDataForDatapoints(date)

        return {
            value,
            metric,
            userId: 'nbkxUOC66VVE7CbqhloaTQJKiRH3',
            source: 'manual',
            date,
            weekNumber,
            month,
            year,
        }
    })

    addDatapoints(newDatapoints)
}

export default updateManualDatapoints
