import { DateTime } from 'luxon'

function getWeekDays(currentDate: DateTime) {
    let lastDayOfTheWeek = currentDate

    for (let i = 1; i < 7; i += 1) {
        const newDate = currentDate.plus({ days: i })
        if (newDate.weekNumber === currentDate.weekNumber) {
            lastDayOfTheWeek = newDate
        }
    }
    const firstDayOfTheWeek = lastDayOfTheWeek.minus({ days: 7 })

    return {
        firstDayOfTheWeek,
        lastDayOfTheWeek,
    }
}

export default getWeekDays
