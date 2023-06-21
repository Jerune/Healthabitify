import { TfiClose } from 'react-icons/tfi'
import TimeSelectionModule from '../TimesDatesModule/TimeSelectionModule'
import ManualDataGrid from './ManualDataGrid'
import { useAppDispatch } from '../../redux/reduxHooks'
import { toggleManualDataGrid } from '../../redux/reducers/utilsReducer'

function ManualDataGridContainer() {
    const dispatch = useAppDispatch()
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
                <ManualDataGrid />
            </div>
        </div>
    )
}

export default ManualDataGridContainer
