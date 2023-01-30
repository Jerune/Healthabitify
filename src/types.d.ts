export interface Category {
    id: string
    name: string
    iconName: string
}

export interface Metric {
    id: string
    name: string
    categoryId: string
}

export interface Day {
    id: string
    date: Date
    week: number
    month: number
    year: number
}

export interface DataPoint {
    id: string
    value: number
    metricId: string
    dayId: string
}
