import averageExistsInDatabase from '../../firebase/firestore/averages/averageExistsInDatabase'
import addDatapoints from '../../firebase/firestore/data-points/addDatapoints'
import updateDatapoints from '../../firebase/firestore/data-points/updateDatapoints'
import { DataPoint, Period } from '../../types'
import { getDateTimeDataForDatapoints } from '../../utils/getDateTimeData'

async function updateManualDatapoints(
    potentialDatapoints: Partial<DataPoint>[]
) {
    // List of periods to be updated in averages
    const weeks: Period[] = []
    const months: Period[] = []
    const years: Period[] = []

    const newPotentialDatapoints = potentialDatapoints.filter(
        (datapoint) => datapoint.id === 'new'
    )
    const existingDatapointsToChange = potentialDatapoints.filter(
        (datapoint) => datapoint.id !== 'new'
    )

    // Building new values as Datapoints and creating then in FireStore
    if (newPotentialDatapoints.length > 0) {
        const newDatapoints = newPotentialDatapoints.map((datapoint) => {
            const { date, value, metric } = datapoint
            const { month, weekNumber, year } =
                getDateTimeDataForDatapoints(date)

            if (!weeks.some((object) => object.weekNumber === weekNumber)) {
                weeks.push({ year, weekNumber })
            }

            if (!months.some((object) => object.month === month)) {
                months.push({ year, month })
            }

            if (!years.some((object) => object.year === year)) {
                years.push({ year })
            }

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
        // addDatapoints(newDatapoints)
    }

    // Updating existing values of Datapoints in FireStore
    if (existingDatapointsToChange.length > 0) {
        const datapointsToUpdate = existingDatapointsToChange.map(
            (datapoint) => {
                const { id, value } = datapoint
                return { id, value }
            }
        )
        // updateDatapoints(datapointsToUpdate)
    }

    // Checking if periods are already active
    const activeWeeks = await Promise.all(
        weeks.map(async (weekdata) => {
            const doesExist = await averageExistsInDatabase(
                weekdata.year,
                'week',
                weekdata.weekNumber
            )
            return { weekdata, doesExist }
        })
    )

    const activeMonths = await Promise.all(
        months.map(async (monthData) => {
            const doesExist = await averageExistsInDatabase(
                monthData.year,
                'month',
                monthData.month
            )
            return { monthData, doesExist }
        })
    )

    const activeYears = await Promise.all(
        years.map(async (yearData) => {
            const doesExist = await averageExistsInDatabase(
                yearData.year,
                'year',
                yearData.year
            )
            return { yearData, doesExist }
        })
    )

    const periods = [
        ...activeWeeks
            .filter((entry) => entry.doesExist)
            .map((entry) => entry.weekdata),
        ...activeMonths
            .filter((entry) => entry.doesExist)
            .map((entry) => entry.monthData),
        ...activeYears
            .filter((entry) => entry.doesExist)
            .map((entry) => entry.yearData),
    ]

    return periods
}

export default updateManualDatapoints
