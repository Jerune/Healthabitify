async function buildManualColumns(dates: string[]) {
    const columns = dates.map((date) => {
        return {
            id: date,
            name: date,
            header: date,
            headerProps: {
                style: {
                    color: '#1D3557',
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    fontSize: '1.1em',
                },
            },
            flex: 1,
            textAlign: 'center',
            maxWidth: 300,
            minWidth: 100,
        }
    })
    return [
        {
            name: 'metric',
            id: 'metric',
            header: 'Metric',
            headerProps: {
                style: {
                    color: '#1D3557',
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    fontSize: '1.1em',
                },
            },
            maxWidth: 300,
            minWidth: 200,
        },
        {
            name: 'reference',
            id: 'reference',
            header: 'Reference',
            headerProps: {
                style: {
                    color: '#1D3557',
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    fontSize: '1.1em',
                },
            },
            style: {
                fontStyle: 'italic',
                fontWeight: 'bold',
            },
            textAlign: 'center',
            maxWidth: 100,
            minWidth: 50,
        },
        ...columns,
    ]
}

export default buildManualColumns
