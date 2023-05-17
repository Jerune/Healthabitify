/* eslint-disable no-param-reassign */
import { BsCaretUpFill, BsCaretDownFill } from 'react-icons/bs'
import { TiEquals } from 'react-icons/ti'
import { DashboardMetric } from './DashboardTypes'
import calculateDifference from './calculateDifference'
import adjustValueOutput from '../DataOutputManagement/adjustValueOutput'
import forceNumberReturn from '../../utils/forceNumberReturn'

export default function Difference({ metric }: DashboardMetric) {
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
                <BsCaretUpFill />
                {`${differenceResult} ${metric.unit} more than last ${metric.comparisonType}`}
            </>
        )
    }

    if (currentValue < previousValue) {
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
