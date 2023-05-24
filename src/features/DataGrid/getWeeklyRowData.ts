import { Average, Metric } from '../../types'
import kebabcaseToCamelcase from '../../utils/kebabcaseToCamelcase'
import adjustValueOutput from '../DataOutputManagement/adjustValueOutput'

function getWeeklyRowData(activeMetrics: Metric[], allAverages: Average[]) {
    const currentYear = Object.keys(allAverages)[0]
    const weeks = Object.keys(allAverages[currentYear].weeks)
    const rows = []

    weeks.forEach((week) => {
        // Getting data from weeks to be used as title and calculation source
        const weekNumber = Number(week.split('W')[1])
        const dateTitle = `Week ${weekNumber}`
        // Setting default row data
        const row = {
            id: weekNumber,
            date: dateTitle,
        }
        // Retrieving average data from every metric for that week
        activeMetrics.forEach((metric) => {
            const metricId = kebabcaseToCamelcase(metric.id)
            const metricAverageValueThisWeek =
                allAverages[currentYear].weeks[week][metricId]
            row[metricId] = adjustValueOutput(
                metric,
                metricAverageValueThisWeek
            )
            if (weeks.includes(`W${weekNumber - 1}`)) {
                const metricAverageValueLastWeek =
                    allAverages[currentYear].weeks[`W${weekNumber - 1}`][
                        metricId
                    ]
                row[`prev${metricId}`] = adjustValueOutput(
                    metric,
                    metricAverageValueLastWeek
                )
            }
        })

        rows.push(row)
    })

    return rows
}

export default getWeeklyRowData