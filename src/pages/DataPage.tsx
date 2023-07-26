import { useEffect, useState } from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'
import { useParams } from 'react-router-dom'
import MainContent from '../components/MainContent'
import { useAppSelector } from '../redux/reduxHooks'
import getActiveMetrics from '../features/DataGrid/getActiveMetrics'
import buildColumns from '../features/DataGrid/buildColumns'
import TimeSelectionModule from '../features/TimesDatesModule/TimeSelectionModule'
import Tabs from '../data/tabs'
import buildRows from '../features/DataGrid/buildRows'
import Loading from '../components/Loading'

function DataPage() {
    const { category } = useParams()
    const allMetrics = useAppSelector((state) => state.metrics)
    const allAverages = useAppSelector((state) => state.averages)
    const isLoading = useAppSelector((state) => state.utils.isLoading)
    const activeTimeView = useAppSelector((state) => state.utils.activeTimeView)
    const [activeColumns, setActiveColumns] = useState([])
    const [activeRows, setActiveRows] = useState([])
    const title: string = category || 'Title'

    useEffect(() => {
        async function setDataGrid() {
            if (category) {
                const activeMetrics = getActiveMetrics(allMetrics, category)
                const columns = await buildColumns(activeMetrics)
                const rows = buildRows(
                    activeMetrics,
                    activeTimeView,
                    allAverages
                )
                setActiveColumns(columns)
                setActiveRows(rows)
            }
        }
        if (!isLoading) {
            setDataGrid()
        }
    }, [isLoading, category, activeTimeView])

    if (isLoading) {
        return <Loading size={50} />
    }

    return (
        <MainContent>
            <div className="flex justify-center md:block w-full md:w-auto absolute md:top-20 md:left-6 text-xl bottom-0 md:right-auto md:bottom-auto">
                <h1 className="block text-xl md:text-4xl">
                    {title.charAt(0).toUpperCase() + title.slice(1)}
                </h1>
            </div>
            <TimeSelectionModule tabs={Tabs} showDateSpecifications={false} />
            <ReactDataGrid
                idProperty="id"
                columns={activeColumns}
                dataSource={activeRows}
                activateRowOnFocus={false}
                showHoverRows={false}
                showColumnMenuTool={false}
                showColumnMenuFilterOptions={false}
                showColumnMenuGroupOptions={false}
                resizable={false}
                className="w-full h-full"
            />
        </MainContent>
    )
}

export default DataPage
