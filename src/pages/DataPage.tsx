import { useParams } from 'react-router-dom'
import HeaderNav from '../components/HeaderNav'
import MainContent from '../components/MainContent'
import AppState from '../components/AppStateInit'

function DataPage() {
    const { category } = useParams()
    const title: string = category || 'Title'

    return (
        <>
            <HeaderNav />
            <AppState />
            <MainContent>
                <h1>{title.charAt(0).toUpperCase() + title.slice(1)}</h1>
                <section>Data Tables</section>
            </MainContent>
        </>
    )
}

export default DataPage
