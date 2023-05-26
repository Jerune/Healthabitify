/* eslint-disable no-console */
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { DocumentsToKeep } from '../../types'

async function getDocsFromCollectionBasedOnString(
    dataCollection: string,
    queryString: string
) {
    const querySnapshot = await getDocs(collection(db, dataCollection))

    const documents: number | string[] = []
    const regex = new RegExp(queryString)

    querySnapshot.forEach((document) => {
        if (regex.test(document.id)) {
            documents.push(document.id)
        }
    })

    return documents
}

async function getAllDocsFromCollection(collectionName: string) {
    const querySnapshot = await getDocs(collection(db, collectionName))

    const documentsToKeep: DocumentsToKeep[] = []
    const documentIdsToDelete: string[] = []

    querySnapshot.forEach((document) => {
        const { metric, date, value } = document.data()
        const { id } = document

        if (
            documentsToKeep.some(
                (object) =>
                    object.metric === metric &&
                    object.date === date &&
                    object.value === value
            )
        ) {
            documentIdsToDelete.push(id)
        } else {
            documentsToKeep.push({ metric, date, value })
        }
    })

    return documentIdsToDelete
}

const data = [
    '2YKu1DMVWaSrGdcUhNiQ',
    '2umYpDO4lj17cJ99uUp0',
    '2z087LZ4JFvhRZjfbkGX',
    '3fAErysIPIfrU5HQHuQx',
    '3fIt2FBw5vSC72Ssnc3d',
    '3hZypHeR8lUJLAlbaaGQ',
    '3jwPodzUgEpBHfoKYR9W',
    '3lsZM69aIE9qu9pDA15e',
    '3nspnglcgw6CLtVHRQzW',
    '47pRUJc9oIh2rw6WyOSE',
    '49UYQKnjNs2IFPs6fChs',
    '4HgbEgsMRlfNaInXNCbD',
    '4K7PszF8zPCNnKpxscLU',
    '4N1bEaYGu0vs8ThWsJnc',
    '4QhzOMCdFLWft5knSkR8',
    '4V16nEBBxMnvl25Moefh',
    '4opeXX6Yi0CfEZUxqDca',
    '4xxNt3DNcfYUXRQ1aB32',
    '5NJZn5KIc8Uh7KRgezpl',
    '5QIPzbwr1mdmdyGHcaka',
    '5QUkBfidqL28hztDImQe',
    '5SsKTQnFG7btlmdrNXA1',
    '5bjvTZKFeYKLnOWQJVxV',
    '5dmZhAXZr00MbPF5tK0j',
    '5fmGkyGDGKlngorobPYx',
    '5guIqHGe9QN2zyXhY8ZO',
    '5lXOBuLpZ7f0zc8iQZbG',
    '5pwZOIZOP0ehYwjP8N9e',
    '5uktMrSjgZizBXEo6SNS',
    '5vX1QHCDJjovKXN2PNVO',
    '5zuKoVtyvCVBJxzpfg9n',
]

export { getDocsFromCollectionBasedOnString, getAllDocsFromCollection }
