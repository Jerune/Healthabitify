import React, { useEffect, useState } from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'
import { useParams } from 'react-router-dom'
import MainContent from '../components/MainContent'
import dataSourceMock from '../data/data-grid/dataSourceMock'
import { useAppSelector } from '../redux/reduxHooks'
import getActiveMetrics from '../features/DataGrid/getActiveMetrics'
import buildColumns from '../features/DataGrid/buildColumns'
import getDatapointsForPeriod from '../firebase/firestore/data-points/getDatapointsForPeriod'
import getDatapointsTest from '../firebase/firestore/data-points/getDatapointsTest'
import calculateAveragesForPeriod from '../firebase/firestore/averages/calculateAveragesForPeriod'
import addAverages from '../firebase/firestore/averages/addAverages'

function DataPage() {
    const { category } = useParams()
    const allMetrics = useAppSelector((state) => state.metrics)
    const title: string = category || 'Title'
    const [activeColumns, setActiveColumns] = useState([])
    const [activeRows, setActiveRows] = useState([])

    useEffect(() => {
        async function setDataGrid() {
            if (category) {
                const activeMetrics = getActiveMetrics(allMetrics, category)
                const columns = await buildColumns(activeMetrics)
                // const rowData = await buildRows(columns)
                setActiveColumns(columns)
                // setActiveRows(rowData)
                const data = await getDatapointsForPeriod(allMetrics, {
                    year: 2023,
                    week: 5,
                })
                const averages = await calculateAveragesForPeriod(data)
                console.log(averages)
                addAverages(averages)
            }
        }

        setDataGrid()
    }, [])

    return (
        <MainContent>
            <h1>{title.charAt(0).toUpperCase() + title.slice(1)}</h1>
            <ReactDataGrid
                idProperty="id"
                columns={activeColumns}
                dataSource={dataSourceMock}
                className="w-full h-full"
            />
        </MainContent>
    )
}

export default DataPage
