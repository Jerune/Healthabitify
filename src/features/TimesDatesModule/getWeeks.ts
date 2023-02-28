import { DateTime } from 'luxon'

function getWeeks(currentDate: DateTime, currentWeekNumber: number) {
    let lastDayOfTheWeek = currentDate

    for (let i = 1; i < 7; i += 1) {
        const newDate = currentDate.plus({ days: i })
        if (newDate.weekNumber === currentWeekNumber) {
            lastDayOfTheWeek = newDate
        }
    }
    const firstDayOfTheWeek = lastDayOfTheWeek.minus({ days: 7 })

    return {
        firstDayOfTheWeek,
        lastDayOfTheWeek,
    }
}

export default getWeeks
