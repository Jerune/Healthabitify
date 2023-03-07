import React from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'
import { useParams } from 'react-router-dom'
import MainContent from '../components/MainContent'
import columnsMock from '../data/data-grid/columnsMock'
import dataSourceMock from '../data/data-grid/dataSourceMock'

function DataPage() {
    const { category } = useParams()
    const title: string = category || 'Title'

    return (
        <MainContent>
            <h1>{title.charAt(0).toUpperCase() + title.slice(1)}</h1>
            <ReactDataGrid
                idProperty="id"
                columns={columnsMock}
                dataSource={dataSourceMock}
                className="w-full h-full"
            />
        </MainContent>
    )
}

export default DataPage
