import MainContent from '../components/MainContent'
import ManualDataGrid from '../features/ManualDataGrid/ManualDataGrid'

function Labs() {
    return (
        <MainContent>
            <h1 className="py-2 pl-4 md:p-6 block text-xl md:text-4xl">Labs</h1>
            <ManualDataGrid labs />
        </MainContent>
    )
}

export default Labs
