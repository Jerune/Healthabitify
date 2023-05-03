/* eslint-disable no-restricted-globals */
import { getDateTimeDataForDatapoints } from '../../utils/getDateTimeData'
import { DataPoint } from '../../types'
import addDatapoints from '../../firebase/firestore/data-points/addDatapoints'

async function getSheetData() {
    const auth =
        'Bearer ya29.a0AWY7CklFoh4r7NFNyrvGA4B5dfyt52AH5BK3_g5mOmCcJKGsx6p4h48l_UTtNhEWLRIOdvezJShtoCzalDlsyMHxvCjpGq1O4hUoGuvrquSLFlBPwCZ92AJXovBQv1ACy5wefHTkX8U75Ckh6yAiRWuSiOcTeAaCgYKAcwSARESFQG1tDrpE9zcMw0Hqgsf2aGHbva8PQ0165'
    const responseValues = await fetch(
        'https://sheets.googleapis.com/v4/spreadsheets/1-WPEgpiI_5eiOWc3hoV96_vjt-LV2d0dRHWvXH4-3UA/values/Weekly!A1:BA9?key=AIzaSyCA804z8krvmsG9lU6jo_uE-J_yDZugdBg',
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: auth,
            },
        }
    )
    const valuesData = await responseValues.json()
    const rows = valuesData.values

    let datapoints: DataPoint[] = []
    // Iterate over each row
    rows.forEach((row) => {
        const metric = row[0]

        // Iterate over each column
        for (let i = 1; i < row.length; i += 1) {
            const date = `${rows[0][i]}`
            const value = row[i]
            const valueAsNumber = Number(value)

            const { weekNumber, month, year } =
                getDateTimeDataForDatapoints(date)
            if (
                value !== 0 &&
                value !== undefined &&
                value !== '' &&
                metric !== 'date'
            ) {
                const data = {
                    value: !isNaN(valueAsNumber) ? valueAsNumber : value,
                    metric,
                    userId: 'nbkxUOC66VVE7CbqhloaTQJKiRH3',
                    source: 'manual',
                    date,
                    weekNumber,
                    month,
                    year,
                }

                datapoints.push(data)
            }
        }
        // if (datapoints.length > 0) {
        //     addDatapoints(datapoints)
        // }
        console.log(datapoints)
        datapoints = []
    })
}

export default getSheetData
