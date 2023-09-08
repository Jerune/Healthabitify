import calculateDifference from './calculateDifference'
import adjustValueOutput from '../DataOutputManagement/adjustValueOutput'
import forceNumberReturn from '../../utils/forceNumberReturn'
import { DashboardMetricProps } from '../_types'
import Icon from '../../components/icon'
import metricsWithStringOutput from '../../data/metrics/metricsWithStringOutput'

export default function Difference({ metric }: DashboardMetricProps) {
    // Transform string to number if needed
    const currentValue = forceNumberReturn(metric.value)
    const previousValue = forceNumberReturn(metric.comparisonValue)

    // Calculate difference between values
    const difference = calculateDifference(currentValue, previousValue)

    // Transform difference to correct output
    const differenceResult = adjustValueOutput(metric, difference)

    if (!metricsWithStringOutput.includes(metric.id) && previousValue === 0) {
        return (
            <>
                <Icon iconId="AiOutlineStop" />
                {`No results registered last ${metric.comparisonType}`}
            </>
        )
    }

    if (currentValue > previousValue) {
        return (
            <>
                <Icon iconId="BsCaretUpFill" />
                {`${differenceResult} ${metric.unit} more than last ${metric.comparisonType}`}
            </>
        )
    }

    if (currentValue < previousValue) {
        return (
            <>
                <Icon iconId="BsCaretDownFill" />
                {`${differenceResult} ${metric.unit} less than last ${metric.comparisonType}`}
            </>
        )
    }

    return (
        <>
            <Icon iconId="TiEquals" />
            {`same as last ${metric.comparisonType}`}
        </>
    )
}
