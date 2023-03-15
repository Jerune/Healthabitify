function getSourceData(source: string) {
    let baseUrl = ''
    let resources: string[] = []

    switch (source) {
        case 'oura':
            resources = ['sleep']
            break
        case 'fitbit':
            baseUrl = 'https://api.fitbit.com/1/user/-/activities'
            resources = [
                'activityCalories',
                'steps',
                'minutesSedentary',
                'heart',
            ]
            break
        default:
            baseUrl = ''
            resources = []
    }

    return { baseUrl, resources }
}

export default getSourceData
