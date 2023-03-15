import { collection, query, where, getDocs } from 'firebase/firestore'
import { useAppSelector } from '../../../redux/reduxHooks'
import { Metric } from '../../../types'
import { db } from '../../firebase'

export default async function getDatapointsSelection(
    activeMetrics: Metric[],
    userId: string,
    currentYear: number
) {
    const dbQuery = query(
        collection(db, 'data-points'),
        where('userId', '==', userId),
        where('year', '==', currentYear)
    )

    const querySnapshot = await getDocs(dbQuery)
    querySnapshot.forEach((doc) => {
        const { id } = doc
        const { weekNumber, month, year, value } = doc.data()
    })
}
