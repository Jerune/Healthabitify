const metricItem = {
    id: 'Weight',
    name: 'Weight',
    active: true,
    onDashboard: true,
    dataType: 'Amount',
    unit: 'kg',
    source: 'Manual',
    categoryId: '1',
    categoryIcon: 'RiBodyScanFill',
    isFixed: true,
    frequency: 'Weekly',
    goal: 'Stay under 80kg',
    conditionsMode: 'Range',
    good: {
        mode: 'Less',
        value: '80',
    },
    medium: {
        value1: '80',
        value2: '85',
    },
    bad: {
        mode: 'More',
        value: '85',
    },
}

export default metricItem
