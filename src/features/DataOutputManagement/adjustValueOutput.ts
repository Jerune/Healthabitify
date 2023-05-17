import convertMillisecondsToTime from '../../utils/convertMillisecondsToTime'
import { Metric } from '../../types'
import addDecimals from './addDecimals'
import forceNumberReturn from '../../utils/forceNumberReturn'

export default function adjustValueOutput(
    metric: Metric,
    value: number
): string {
    const sleepMetricIdsWithMilliseconds = [
        'amount-of-deep-sleep',
        'amount-of-rem-sleep',
        'amount-of-sleep',
        'total-beneficial-sleep',
    ]

    // Change to h:mm format as string in case id is part sleepMetricIdsWithMilliseconds
    if (sleepMetricIdsWithMilliseconds.includes(metric.id)) {
        return convertMillisecondsToTime(value)
    }

    // Change to hours or minutes format as string in case of time or duration
    if (metric.dataType === 'time' || metric.dataType === 'duration') {
        const amountOfMinutes = forceNumberReturn(value) * 60
        const hours = Math.floor(amountOfMinutes / 60)
        const minutes = Math.round(amountOfMinutes - hours * 60)
        const hoursAsString = String(hours).padStart(2, '0')
        const minutesAsString = String(minutes).padStart(2, '0')

        return `${hoursAsString}:${minutesAsString}`
    }

    if (metric === null) {
        return 'null'
    }

    // Adapt to output & Change to String without any adjustments
    const adaptedValue = addDecimals(metric, value)
    return adaptedValue.toString()
}
