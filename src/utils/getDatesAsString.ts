import { DateTime } from 'luxon'

export function getTodaysDateAsString() {
    const today = DateTime.now()
    const yesterdayString = today.toFormat('yyyy-MM-dd')

    return yesterdayString
}

export function getYesterdaysDateAsString() {
    const today = DateTime.now()
    const yesterday = today.minus({ days: 1 })
    const yesterdayString = yesterday.toFormat('yyyy-MM-dd')

    return yesterdayString
}
