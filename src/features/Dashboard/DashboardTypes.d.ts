import type { PropsWithChildren } from 'react'
import { Metric } from '../../types'

export type MetricDashboardData = {
    metric: Metric
}

export type DashboardDataProps = {
    children: PropsWithChildren
    data: MetricDashboardData
}
