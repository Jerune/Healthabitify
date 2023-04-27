import { BsCaretUpFill, BsCaretDownFill } from 'react-icons/bs'
import { TiEquals } from 'react-icons/ti'
import hasDecimals from '../../utils/hasDecimals'
import { DashboardMetric } from './DashboardTypes'
import convertMillisecondsToTime from '../../utils/convertMillisecondsToTime'

export default function CalculateDifference({ metric }: DashboardMetric) {
    const sleepMetricIdsWithMilliseconds = [
        'amount-of-deep-sleep',
        'amount-of-rem-sleep',
        'amount-of-sleep',
        'total-beneficial-sleep',
    ]

    // if (typeof(metric.value) === 'string'){

    // }

    const difference =
        metric.value > metric.comparisonValue
            ? metric.value - metric.comparisonValue
            : metric.comparisonValue - metric.value
    const numberHasADecimal = hasDecimals(difference)

    let differenceResult: number | string = 0

    // Change to h:mm format as string in case id is part sleepMetricIdsWithMilliseconds
    if (sleepMetricIdsWithMilliseconds.includes(metric.id)) {
        differenceResult = convertMillisecondsToTime(difference)
    }

    // Change to String if not already the case
    if (typeof differenceResult !== 'string') {
        differenceResult = numberHasADecimal
            ? difference.toFixed(2)
            : difference.toString()
    }

    if (metric.value > metric.comparisonValue) {
        return (
            <>
                <BsCaretUpFill />
                {`${differenceResult} ${metric.unit} more than last ${metric.comparisonType}`}
            </>
        )
    }

    if (metric.value < metric.comparisonValue) {
        return (
            <>
                <BsCaretDownFill />
                {`${differenceResult} ${metric.unit} less than last ${metric.comparisonType}`}
            </>
        )
    }

    return (
        <>
            <TiEquals />
            {`same as last ${metric.comparisonType}`}
        </>
    )
}
