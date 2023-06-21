import { useCallback, useEffect, useState } from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks'
import {
    changeLoadingMessage,
    changeLoadingStatus,
} from '../../redux/reducers/utilsReducer'
import SettingsButton from '../SettingsMenu/SettingsButton'
import Loading from '../../components/Loading'
import getManualDatapointsByDate from '../../firebase/firestore/data-points/getManualDatapointsByDate'
import buildManualColumns from '../DataGrid/buildManualColumns'
import { getAllWeekDaysAsStrings } from '../../utils/getDatesAsString'
import buildManualRows from '../DataGrid/buildManualRows'
import updateManualDatapoints from './updateManualDatapoints'
import createAveragesForNewPeriods from '../AveragesManagement/createAveragesForNewPeriods'
import { initAverages } from '../../redux/reducers/averagesReducer'
import buildAverages from '../AveragesManagement/buildAverages'
import { getDateTimeDataForPreviousPeriod } from '../../utils/getDateTimeData'
import { ManualDataProps } from '../../types'
import labTestMetrics from '../../data/labTestMetrics'

function ManualDataGrid({ labs }: ManualDataProps) {
    const dispatch = useAppDispatch()
    const allMetrics = useAppSelector((state) => state.metrics)
    const deviceData = useAppSelector((state) => state.user.devices)
    const isLoading = useAppSelector((state) => state.utils.isLoading)
    const currentDateTime = useAppSelector(
        (state) => state.utils.currentDateTime
    )
    const lastUpdated =
        deviceData.fitbit.lastUpdated > deviceData.oura.lastUpdated
            ? deviceData.oura.lastUpdated
            : deviceData.fitbit.lastUpdated
    const [activeColumns, setActiveColumns] = useState([])
    const [activeRows, setActiveRows] = useState([])
    const [editForm, setEditForm] = useState(false)
    const [datapointsToEdit, setDatapointsToEdit] = useState([])

    const labDates = [
        '2018-07-04',
        '2018-12-27',
        '2019-06-27',
        '2019-12-23',
        '2020-07-31',
        '2021-01-09',
        '2021-07-21',
        '2021-12-09',
        '2022-09-05',
        '2023-02-13',
    ]

    useEffect(() => {
        async function setDataGrid() {
            if (currentDateTime.currentDate) {
                let activeMetrics = []
                let dates = []

                // Set labs data whenever labs props is active
                if (labs) {
                    dates = labDates
                    activeMetrics = labTestMetrics
                } else {
                    // Set manual data metrics whenever labs is not active
                    activeMetrics = allMetrics.filter(
                        (metric) => metric.source === 'manual'
                    )
                    dates = getAllWeekDaysAsStrings(
                        currentDateTime.firstDayOfTheWeek
                    )
                }

                const columns = await buildManualColumns(dates)
                setActiveColumns(columns)
                const datapoints = await getManualDatapointsByDate(
                    currentDateTime,
                    activeMetrics,
                    labs
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
        async function updateLabData() {
            dispatch(changeLoadingStatus(true))
            dispatch(changeLoadingMessage('Adding new labs data'))
            setDatapointsToEdit([])
            updateManualDatapoints(datapointsToEdit, true)
            dispatch(changeLoadingStatus(false))
        }

        async function updateExistingAverages() {
            dispatch(changeLoadingStatus(true))
            dispatch(changeLoadingMessage('Adding manual data'))
            // Reset datapoints to edit
            setDatapointsToEdit([])
            // Return periods whenever data of already calculated averages have been updated
            const periods = await updateManualDatapoints(
                datapointsToEdit,
                false
            )
            // Update averages for already existing periods
            if (periods.length > 0) {
                await createAveragesForNewPeriods(periods, allMetrics)
                dispatch(changeLoadingMessage('Calculating final results'))
                const datesToCheckFor =
                    getDateTimeDataForPreviousPeriod(lastUpdated)
                if (datesToCheckFor) {
                    setTimeout(async () => {
                        const averageStoreData = await buildAverages(
                            datesToCheckFor
                        )
                        dispatch(initAverages(averageStoreData))
                    }, 2000)
                }
            }

            dispatch(changeLoadingStatus(false))
        }

        if (!editForm && datapointsToEdit.length > 0 && !labs) {
            updateExistingAverages()
        } else if (!editForm && datapointsToEdit.length > 0 && labs) {
            updateLabData()
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
        <>
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
        </>
    )
}

ManualDataGrid.defaultProps = {
    labs: false,
}

export default ManualDataGrid
