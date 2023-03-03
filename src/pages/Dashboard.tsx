import MainContent from '../components/MainContent'
import TimeSelectionModule from '../features/TimesDatesModule/TimeSelectionModule'
import Tabs from '../data/tabs'
import DashBoardContainer from '../features/Dashboard/DashBoardContainer'
import DashBoardMetricBlock from '../features/Dashboard/DashBoardMetricBlock'
import dashboardItems from '../data/dashboardItemsMock'
import AuthorizeOura from '../components/AuthorizeOura'

function Dashboard() {
    const dashboardBlocks = dashboardItems.map((item) => (
        <DashBoardMetricBlock metric={item} key={item.name} />
    ))

    return (
        <>
            <AuthorizeOura />
            <TimeSelectionModule tabs={Tabs} />
            <MainContent>
                <DashBoardContainer>{dashboardBlocks}</DashBoardContainer>
            </MainContent>
        </>
    )
}

export default Dashboard
