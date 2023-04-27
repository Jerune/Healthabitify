import { GiGoalKeeper } from 'react-icons/gi'
import * as Icons from 'react-icons/ri'
import type { DashboardMetric } from './DashboardTypes'
import convertMillisecondsToTime from '../../utils/convertMillisecondsToTime'
import CalculateDifference from './calculateDifference'

function DashBoardMetricBlock({ metric }: DashboardMetric) {
    const sleepMetricIdsWithMilliseconds = [
        'amount-of-deep-sleep',
        'amount-of-rem-sleep',
        'amount-of-sleep',
        'total-beneficial-sleep',
    ]
    const IconElement = Icons[metric.categoryIcon]
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
            bgColorClass = 'white'
            break
    }

    return (
        <section
            className={`flex flex-col pb-6 w-72 h-72 rounded-xl shadow-2xl ${bgColorClass} last:justify-self-start`}
        >
            <div className="h-16 pt-1 px-6 bg-black-opacity text-white flex flex-row justify-center items-center rounded-tl-xl rounded-tr-xl">
                <i className="text-3xl mr-2">
                    <IconElement />
                </i>
                <h2 className="flex justify-center text-xl">{metric.name}</h2>
            </div>
            <div className="px-6 flex flex-col justify-center items-center grow">
                <div className="flex flex-row justify-center items-center text-6xl">
                    {/* Converts Milliseconds into time */}
                    {sleepMetricIdsWithMilliseconds.includes(metric.id)
                        ? convertMillisecondsToTime(metric.value)
                        : metric.value.toString()}
                    <span className="text-lg pt-8">{metric.unit}</span>
                </div>
                {metric.goal !== '' && (
                    <p className="flex flex-row gap-x-2 pt-1 items-center m-0 text-sm">
                        <GiGoalKeeper />
                        {metric.goal}
                    </p>
                )}
            </div>
            <p className="flex flex-row justify-center items-center gap-x-2 m-0 text-sm italic">
                <CalculateDifference metric={metric} />
            </p>
        </section>
    )
}

export default DashBoardMetricBlock
