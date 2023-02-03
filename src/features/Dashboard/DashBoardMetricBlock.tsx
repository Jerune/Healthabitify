import { GiGoalKeeper } from 'react-icons/gi'
import { BsCaretUpFill, BsCaretDownFill } from 'react-icons/bs'
import { ReactNode } from 'react'
import type { MetricDashboardData } from './DashboardTypes'
import hasDecimals from '../../utils/hasDecimals'

function DashBoardMetricBlock({ metric }: MetricDashboardData) {
    let bgColorClass = ''
    switch (metric.comparisonStatus) {
        case 'good':
            bgColorClass = 'bg-green-100'
            break
        case 'medium':
            bgColorClass = 'bg-orange-100'
            break
        case 'bad':
            bgColorClass = 'bg-red-100'
            break
        default:
            bgColorClass = ''
            break
    }

    function calculateDifference(): ReactNode {
        if (metric.value > metric.comparisonValue) {
            const difference = metric.value - metric.comparisonValue
            const numberHasADecimal = hasDecimals(difference)

            const differenceResult = numberHasADecimal
                ? difference.toFixed(2)
                : difference.toString()
            return (
                <>
                    <BsCaretUpFill />
                    {`${differenceResult} ${metric.valueType} more than last ${metric.comparisonType}`}
                </>
            )
        }
        const difference = metric.value - metric.comparisonValue
        const numberHasADecimal = hasDecimals(difference)

        const differenceResult = numberHasADecimal
            ? difference.toFixed(2)
            : difference.toString()
        return (
            <>
                <BsCaretDownFill />
                {`${differenceResult} ${metric.valueType} less than last ${metric.comparisonType}`}
            </>
        )
    }

    return (
        <section className={`p-6 rounded-xl ${bgColorClass}`}>
            <h2>{metric.name}</h2>
            <p className="flex flex-row gap-x-2 text-sm">
                <GiGoalKeeper />
                {metric.goal}
            </p>
            <div className="flex justify-center items-center text-2xl">
                {metric.value.toString()}
            </div>
            <p className="flex flex-row items-center gap-x-2 text-sm">
                {calculateDifference()}
            </p>
        </section>
    )
}

export default DashBoardMetricBlock
