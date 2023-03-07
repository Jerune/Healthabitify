export default async function getFitbitData(url: string, token: string) {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
    const data = await response.json()

    return data
}
