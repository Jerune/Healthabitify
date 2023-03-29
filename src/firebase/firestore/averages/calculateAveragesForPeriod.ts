import {
    Average,
    AveragesReturn,
    MetricValues,
    PeriodData,
} from '../../../types'

function calculateAveragesForPeriod(periodData: PeriodData): AveragesReturn {
    const { period, data } = periodData
    const allAverages = {}

    data.forEach((metric) => {
        const name = Object.keys(metric)[0]
        const values = metric[name]
        let total = 0
        let amountOfValues = 0
        if (values.length > 0) {
            values.forEach((value) => {
                total += value
                amountOfValues += 1
            })
            const average = total / amountOfValues
            allAverages[name] = average
        } else {
            allAverages[name] = null
        }
    })

    return {
        period,
        keys: allAverages,
    }
}

export default calculateAveragesForPeriod
