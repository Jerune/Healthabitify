import { useParams } from 'react-router-dom'

function DataPage() {
    const { category } = useParams()
    const title: string = category || 'Title'

    return (
        <>
            <h1>{title.charAt(0).toUpperCase() + title.slice(1)}</h1>
            <section>Data Tables</section>
        </>
    )
}

export default DataPage
