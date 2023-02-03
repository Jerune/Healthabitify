import type { PropsWithChildren } from 'react'

export type MetricDashboardData = {
    metric: {
        name: string
        goal: string
        value: number
        valueType: string
        comparisonValue: number
        comparisonStatus: string
        comparisonType: string
    }
}

export type DashboardDataProps = {
    children: PropsWithChildren
    data: MetricDashboardData
}
