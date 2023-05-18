import kebabcaseToCamelcase from '../../utils/kebabcaseToCamelcase'
import adjustValueOutput from '../DataOutputManagement/adjustValueOutput'

function getMonthlyRowData(activeMetrics, allAverages) {
    const rows = []

    const years = Object.keys(allAverages)
    years.forEach((year) => {
        const months = Object.keys(allAverages[year].months)
        months.forEach((month) => {
            // Getting data from months to be used as title and calculation source
            const monthNumber = Number(month.split('M')[1])
            const dateTitle = '' // Add DateTime month name + year

            // Setting default row data
            const row = {
                id: monthNumber,
                date: dateTitle,
            }
            // Retrieving average data from every metric for that month
            activeMetrics.forEach((metric) => {
                const metricId = kebabcaseToCamelcase(metric.id)
                const metricAverageValueThismonth =
                    allAverages[currentYear].months[month][metricId]
                row[metricId] = adjustValueOutput(
                    metric,
                    metricAverageValueThismonth
                )
                if (months.includes(`W${monthNumber - 1}`)) {
                    const metricAverageValueLastmonth =
                        allAverages[currentYear].months[`W${monthNumber - 1}`][
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
