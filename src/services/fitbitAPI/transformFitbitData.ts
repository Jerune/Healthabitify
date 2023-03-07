import addDatapoints from '../../firebase/firestore/data-points/addDatapoints'
import { FitbitRawData } from '../../types'

export default function transformFitbitData(data: FitbitRawData) {
    const resource = Object.keys(data)[0]

    if (resource === 'activities-activityCalories') {
        addDatapoints(data[resource])
    }
}
