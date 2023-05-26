/* eslint-disable no-await-in-loop */
import getMonthlyYearlyAverages from '../../firebase/firestore/averages/getMonthlyYearlyAverages'
import getWeeklyAverages from '../../firebase/firestore/averages/getWeeklyAverages'

async function buildAverages({ weekNumber, month, year }) {
    const availableDatesInAverages = {}
    let latestWeekNumber = weekNumber
    let latestMonth = month
    let currentYear = year

    // Get all averages from months and weeks for a certain year
    // Manually set to 2019 as first data is from 2019
    while (currentYear >= 2019) {
        availableDatesInAverages[`Y${currentYear}`] = {
            year: {},
            months: {},
            weeks: {},
        }

        const monthlyPromises = []
        const weeklyPromises = []

        while (latestMonth > 0) {
            monthlyPromises.push(
                getMonthlyYearlyAverages(currentYear, latestMonth)
            )
            latestMonth -= 1
        }

        while (latestWeekNumber > 0) {
            weeklyPromises.push(
                getWeeklyAverages(currentYear, latestWeekNumber)
            )
            latestWeekNumber -= 1
        }

        const [monthlyAverages, weeklyAverages] = await Promise.all([
            Promise.all(monthlyPromises),
            Promise.all(weeklyPromises),
        ])

        for (let i = 0; i < monthlyAverages.length; i += 1) {
            if (monthlyAverages[i] !== 'error') {
                availableDatesInAverages[`Y${currentYear}`].months[
                    `M${i + 1}`
                ] = monthlyAverages[i]
            }
        }

        for (let i = 0; i < weeklyAverages.length; i += 1) {
            if (weeklyAverages[i] !== 'error') {
                availableDatesInAverages[`Y${currentYear}`].weeks[`W${i + 1}`] =
                    weeklyAverages[i]
            }
        }

        const yearlyAverage = await getMonthlyYearlyAverages(currentYear)
        if (yearlyAverage !== 'error') {
            availableDatesInAverages[`Y${currentYear}`].year = yearlyAverage
        }

        currentYear -= 1
        latestMonth = 12
        latestWeekNumber = 52
    }

    return availableDatesInAverages
}

export default buildAverages
