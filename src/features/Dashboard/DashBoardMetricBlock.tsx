import { GiGoalKeeper } from 'react-icons/gi'
import { BsCaretUpFill, BsCaretDownFill } from 'react-icons/bs'
import { ReactNode } from 'react'
import * as Icons from 'react-icons/ri'
import type { MetricDashboardData } from './DashboardTypes'
import hasDecimals from '../../utils/hasDecimals'

function DashBoardMetricBlock({ metric }: MetricDashboardData) {
    let bgColorClass = ''
    switch (metric.comparisonStatus) {
        case 'good':
            bgColorClass = 'green-gradient'
            break
        case 'medium':
            bgColorClass = 'orange-gradient'
            break
        case 'bad':
            bgColorClass = 'red-gradient'
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
    const IconElement = Icons[metric.iconName]

    return (
        <section
            className={`flex flex-col pb-6 w-72 h-72 rounded-xl shadow-2xl ${bgColorClass} last:justify-self-start`}
        >
            <div className="h-16 pt-1 px-6 bg-black-opacity text-white flex flex-row justify-center items-center rounded-tl-xl rounded-tr-xl">
                <i className="text-3xl pr-2">
                    <IconElement />
                </i>
                <h2 className="flex justify-center text-xl grow">
                    {metric.name}
                </h2>
            </div>
            <div className="px-6 flex flex-col justify-center items-center grow">
                <div className="flex flex-row justify-center items-center text-6xl">
                    {metric.value.toString()}
                    <span className="text-lg pt-8">{metric.valueType}</span>
                </div>
                <p className="flex flex-row gap-x-2 pt-1 items-center m-0 text-sm">
                    <GiGoalKeeper />
                    {metric.goal}
                </p>
            </div>
            <p className="flex flex-row justify-center items-center gap-x-2 m-0 text-sm italic">
                {calculateDifference()}
            </p>
        </section>
    )
}

export default DashBoardMetricBlock
