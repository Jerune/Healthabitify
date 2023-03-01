const columnsMock = [
    { name: 'date', header: 'Date' },
    {
        name: 'RHR',
        header: 'Average Resting Heart Rate (bpm)',
        onRender: (cellProps, { data }) => {
            if (data.RHR < data.prevRHR) {
                cellProps.style.background = 'green'
            } else if (data.RHR > data.prevRHR) {
                cellProps.style.background = 'red'
            } else {
                cellProps.style.background = 'orange'
            }
        },
    },
    {
        name: 'HRV',
        header: 'Average Resting Heart Rate Variability (ms)',
        onRender: (cellProps, { data }) => {
            cellProps.style.background = data.HRV > 50 ? 'green' : 'red'
        },
    },
    {
        name: 'Blood',
        header: 'Blood Oxygen (SpO2) (%)',
        onRender: (cellProps, { data }) => {
            cellProps.style.background = data.Blood > '96%' ? 'green' : 'red'
        },
    },
    {
        name: 'Resp',
        header: 'Respitory Rate (x/min)',
        onRender: (cellProps, { data }) => {
            cellProps.style.background = data.Resp < 14.3 ? 'green' : 'red'
        },
    },
]

export default columnsMock
