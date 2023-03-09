import { DateTime } from 'luxon'

export function getTodaysDateAsString() {
    const today = DateTime.now()
    const todayString = today.toFormat('yyyy-MM-dd')

    return todayString
}

export function getYesterdaysDateAsString() {
    const today = DateTime.now()
    const yesterday = today.minus({ days: 1 })
    const yesterdayString = yesterday.toFormat('yyyy-MM-dd')

    return yesterdayString
}

export function getSpecifiedDateAsString(dateTime: DateTime) {
    const date = dateTime
    const dateAsString = date.toFormat('yyyy-MM-dd')

    return dateAsString
}
