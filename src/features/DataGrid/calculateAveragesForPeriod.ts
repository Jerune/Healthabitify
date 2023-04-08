import calculateAmountAverage from './calculateAmountAverage'
import calculateDurationAverage from './calculateDurationAverage'
import calculateTimeAverage from './calculateTimeAverage'
import { Average, AveragesReturn, MetricValues, PeriodData } from '../../types'

async function calculateAveragesForPeriod(
    periodData: PeriodData
): AveragesReturn {
    const { period, data } = periodData
    const allAverages = {}

    data.forEach((metric) => {
        const name = Object.keys(metric)[0]
        const { type } = metric
        const values = metric[name]

        if (values.length > 0) {
            if (type === 'amount' || type === 'total-amount') {
                let average = 0
                if (type === 'amount') {
                    average = calculateAmountAverage(values)
                } else if (type === 'total-amount') {
                    average = calculateAmountAverage(values, true)
                }
                allAverages[name] = average
            } else if (type === 'time') {
                const average = calculateTimeAverage(values)
                allAverages[name] = average
            } else if (type === 'duration') {
                const average = calculateDurationAverage(values)
                allAverages[name] = average
            }
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
