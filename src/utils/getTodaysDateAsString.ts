export default function getTodaysDateAsString() {
    const today = new Date()
    const todayString = today.toISOString().split('T').slice(0, 1).join()

    return todayString
}
