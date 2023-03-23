import { PeriodData } from '../../../types'

function calculateNewAveragesForPeriod(periodData: PeriodData) {
    const { period, data } = periodData
    let total = 0
    let amountOfValues = 0
    data.forEach((value) => {
        total += value
        amountOfValues += 1
    })

    const average = total / amountOfValues

    return {
        period,
        average,
    }
}

export default calculateNewAveragesForPeriod
