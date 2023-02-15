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
        good: ['less', 80],
        medium: [80, 85],
        bad: ['more', 85],
    },
}

export default metricItem
