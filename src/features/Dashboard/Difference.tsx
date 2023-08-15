import calculateDifference from './calculateDifference'
import adjustValueOutput from '../DataOutputManagement/adjustValueOutput'
import forceNumberReturn from '../../utils/forceNumberReturn'
import { DashboardMetricProps } from '../_types'
import Icon from '../../components/icon'

export default function Difference({ metric }: DashboardMetricProps) {
    // Transform string to number if needed
    const currentValue = forceNumberReturn(metric.value)
    const previousValue = forceNumberReturn(metric.comparisonValue)

    // Calculate difference between values
    const difference = calculateDifference(currentValue, previousValue)

    // Transform difference to correct output
    const differenceResult = adjustValueOutput(metric, difference)

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
