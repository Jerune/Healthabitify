import calculateAmountAverage from './calculateAmountAverage'
import calculateDurationAverage from './calculateDurationAverage'
import calculateTimeAverage from './calculateTimeAverage'
import { AveragesReturn, PeriodData } from '../../types'
import calculateAutoAverages from './calculateAutoAverages'

async function calculateAveragesForPeriod(
    periodData: PeriodData
): Promise<AveragesReturn> {
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
            allAverages[name] = 0
        }
    })

    const additionalAutoAverages = calculateAutoAverages(allAverages)

    return {
        period,
        keys: { ...allAverages, ...additionalAutoAverages },
    }
}

export default calculateAveragesForPeriod
