import { collection, getDocs } from 'firebase/firestore'
import { db } from './firebase'
import metricItems from '../data/metricsMock'

async function getMetrics(categoryId: string) {
    // const querySnapshot = await getDocs(collection(db, 'categories'))
    // const categoryList = []
    // querySnapshot.forEach((doc) => {
    //     const data = doc.data()
    //     categoryList.push(data)
    // })
    const metricsArray = Object.keys(metricItems).find(
        (key) => metricItems[key] === categoryId
    )

    // const sortedCategories = categoryList.sort((a, b) => {
    //     return a.order - b.order
    // })

    console.log(metricsArray)
}

export default getMetrics
