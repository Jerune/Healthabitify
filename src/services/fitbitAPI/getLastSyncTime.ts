async function getLastSyncTime(token: string) {
    // API related Data
    const headers = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await fetch(
        'https://api.fitbit.com/1/user/-/devices.json',
        headers
    )
    const responseData = await response.json()
    const date = responseData[0].lastSyncTime.split('T').slice(0, 1).join()

    return date
}

export default getLastSyncTime
