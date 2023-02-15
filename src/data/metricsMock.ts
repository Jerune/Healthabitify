const metricItem = {
    id: '1',
    name: 'Weight',
    active: true,
    onDashboard: true,
    dataType: 'amount',
    source: 'Manual',
    categoryId: '1',
    categoryIcon: 'RiBodyScanFill',
    isFixed: true,
    frequency: 'Weekly',
    goal: 'Stay under 80kg',
    conditionsMode: 'Range',
    range: {
        good: {
            mode: 'Less',
            value: 80,
        },
        medium: {
            value1: 80,
            value2: 85,
        },
        bad: {
            mode: 'More',
            value: 85,
        },
    },
}

export default metricItem
