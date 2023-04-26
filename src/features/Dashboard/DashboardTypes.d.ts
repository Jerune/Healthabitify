import type { PropsWithChildren } from 'react'
import { Metric } from '../../types'

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

export type DashboardDataProps = {
    children: PropsWithChildren
    data: MetricDashboardData
}
