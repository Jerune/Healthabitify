// AveragesManagement

export type PeriodForAverage = {
    year: number
    weekNumber: number
    month: number
}

export type AveragesData = {
    [year: string]: {
        months: { [month: string]: DocumentData | string }
        weeks: { [week: string]: DocumentData | string }
        year?: DocumentData | string
    }
}

export type Averages = {
    [key: string]: number | string
}

export type AveragesReturn = {
    period: string
    keys: Averages
}
