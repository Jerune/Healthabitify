import { DateTime } from 'luxon'
import kebabcaseToCamelcase from '../../utils/kebabcaseToCamelcase'
import adjustValueOutput from '../DataOutputManagement/adjustValueOutput'

function getMonthlyRowData(activeMetrics, allAverages) {
    const rows = []

    const years = Object.keys(allAverages)
    years.forEach((year) => {
        const activeYear = Number(year.split('Y')[1])
        const months = Object.keys(allAverages[year].months)
        months.forEach((month) => {
            const monthNumber = month.split('M')[1].padStart(2, '0')
            const monthName = DateTime.fromISO(
                `${activeYear}-${monthNumber}-01`
            ).toFormat('MMMM')
            const dateTitle = `${monthName} ${activeYear}`

            // Setting default row data
            const row = {
                id: monthNumber,
                date: dateTitle,
            }
            // Retrieving average data from every metric for that month
            activeMetrics.forEach((metric) => {
                const metricId = kebabcaseToCamelcase(metric.id)
                const metricAverageValueThismonth =
                    allAverages[year].months[month][metricId]
                row[metricId] = adjustValueOutput(
                    metric,
                    metricAverageValueThismonth
                )
                if (months.includes(`M${monthNumber - 1}`)) {
                    const metricAverageValueLastmonth =
                        allAverages[year].months[`M${monthNumber - 1}`][
                            metricId
                        ]
                    row[`prev${metricId}`] = adjustValueOutput(
                        metric,
                        metricAverageValueLastmonth
                    )
                }
            })

            rows.push(row)
        })
    })

    return rows
}

export default getMonthlyRowData
