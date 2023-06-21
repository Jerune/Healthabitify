import MainContent from '../components/MainContent'
import ManualDataGrid from '../features/ManualDataGrid/ManualDataGrid'

function Labs() {
    return (
        <MainContent>
            <h1 className="p-2">Labs</h1>
            <ManualDataGrid labs />
        </MainContent>
    )
}

export default Labs
