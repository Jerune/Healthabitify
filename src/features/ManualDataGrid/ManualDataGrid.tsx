import { useCallback, useEffect, useState } from 'react'
import { TfiClose } from 'react-icons/tfi'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks'
import { toggleManualDataGrid } from '../../redux/reducers/utilsReducer'
import TimeSelectionModule from '../TimesDatesModule/TimeSelectionModule'
import SettingsButton from '../SettingsMenu/SettingsButton'
import Loading from '../../components/Loading'
import getManualDatapointsByDate from '../../firebase/firestore/data-points/getManualDatapointsByDate'
import buildManualColumns from '../DataGrid/buildManualColumns'
import { getAllWeekDaysAsStrings } from '../../utils/getDatesAsString'
import buildManualRows from '../DataGrid/buildManualRows'
import updateManualDatapoints from './updateManualDatapoints'

function ManualDataGrid() {
    const dispatch = useAppDispatch()
    const allMetrics = useAppSelector((state) => state.metrics)
    const isLoading = useAppSelector((state) => state.utils.isLoading)
    const currentDateTime = useAppSelector(
        (state) => state.utils.currentDateTime
    )
    const [activeColumns, setActiveColumns] = useState([])
    const [activeRows, setActiveRows] = useState([])
    const [editForm, setEditForm] = useState(false)
    const [datapointsToEdit, setDatapointsToEdit] = useState([])

    useEffect(() => {
        async function setDataGrid() {
            if (currentDateTime.currentDate) {
                const manualMetrics = allMetrics.filter(
                    (metric) => metric.source === 'manual'
                )
                const dates = getAllWeekDaysAsStrings(
                    currentDateTime.firstDayOfTheWeek
                )
                const columns = await buildManualColumns(dates)
                setActiveColumns(columns)
                const datapoints = await getManualDatapointsByDate(
                    currentDateTime,
                    manualMetrics
                )
                const rows = buildManualRows(datapoints, dates)
                setActiveRows(rows)
            }
        }
        if (!isLoading) {
            setDataGrid()
        }
    }, [currentDateTime])

    useEffect(() => {
        if (!editForm && datapointsToEdit.length > 0) {
            updateManualDatapoints(datapointsToEdit)
            setDatapointsToEdit([])
        }
    }, [editForm])

    const onEditComplete = useCallback(
        ({ value, columnId, rowId }) => {
            const data = [...activeRows]
            const id = data[rowId].cells[columnId]
            const metricName = data[rowId].metric
            const metric = metricName.split(' ').join('-').toLowerCase()

            data[rowId][columnId] = value

            setDatapointsToEdit((prevState) => {
                const idToChange = id || 'new'
                return [
                    ...prevState,
                    { date: columnId, id: idToChange, value, metric },
                ]
            })
            setActiveRows(data)
        },
        [activeRows]
    )

    if (isLoading) {
        return <Loading size={50} />
    }

    return (
        <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
            id="my-modal"
        >
            <div className="relative top-16 mx-auto border w-[95%] h-[85%] overflow-scroll shadow-lg rounded-md bg-white">
                <button
                    type="button"
                    id="close"
                    onClick={() => dispatch(toggleManualDataGrid())}
                    className="absolute right-4 top-4 z-50"
                >
                    <TfiClose />
                </button>
                <div className="sticky h-26 w-full top-0 z-40">
                    <TimeSelectionModule showDateTimeTabs={false} />
                </div>
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
                    editable={editForm}
                    onEditComplete={onEditComplete}
                    className="w-full h-full"
                />
                <div className="sticky h-12 w-full bottom-2  px-2 flex flex-row gap-4">
                    <SettingsButton
                        type="button"
                        active={!editForm}
                        text="Edit"
                        onClick={() => setEditForm(true)}
                    />
                    <SettingsButton
                        type="submit"
                        active={editForm}
                        text="Save"
                        onClick={() => setEditForm(false)}
                    />
                </div>
            </div>
        </div>
    )
}

export default ManualDataGrid
