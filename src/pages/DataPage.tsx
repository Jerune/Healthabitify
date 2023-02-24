import { useParams } from 'react-router-dom'
import MainContent from '../components/MainContent'

function DataPage() {
    const { category } = useParams()
    const title: string = category || 'Title'

    return (
        <MainContent>
            <h1>{title.charAt(0).toUpperCase() + title.slice(1)}</h1>
            <section>Data Tables</section>
        </MainContent>
    )
}

export default DataPage
