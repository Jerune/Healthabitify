import type { PropsWithChildren } from 'react'
import { Metric } from '../types'

// AveragesManagement

export type Averages = {
    [key: string]: number | string
}

export type AveragesData = {
    [year: string]: {
        months: { [month: string]: DocumentData | string }
        weeks: { [week: string]: DocumentData | string }
        year?: DocumentData | string
    }
}

export type AveragesReturn = {
    period: string
    keys: Averages
}

export type Period = {
    year: number
    month?: number
    weekNumber?: number
}

export type PeriodForAverage = {
    year: number
    weekNumber: number
    month: number
}

export type PeriodData = {
    period: string
    data: DataValuesPerMetric[]
}

export type DatapointsPerMetric = {
    [key: string]: number[] | string[]
    type: string
}

export type MetricValues = {
    name: string
    values: number[]
}

// Dashboard

export type MetricDashboardData = {
    metric: Metric
}

type MetricPropertiesForDashboard = {
    value: number | string
    comparisonValue: number | string
    comparisonStatus: string
    comparisonType: string
}

export type DashboardMetric = MetricPropertiesForDashboard & Metric

export type DashboardMetricProps = {
    metric: DashboardMetric
}

export type DashboardDataProps = {
    children: PropsWithChildren
    data: MetricDashboardData
}

// Data Grid

export type Row = {
    metric: string
    id: string
    cells: { [key: string]: string }
    [key: string]: string | { [key: string]: string }
}

export type DataPoint = {
    date: string
    id: string
    value: number
}

export type DatapointsForDataGrid = {
    [key: string]: {
        data: DataPoint[]
        type: string
        reference?: string
    }
}
