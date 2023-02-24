import HeaderNav from '../components/HeaderNav'
import MainContent from '../components/MainContent'
import TimeSelectionModule from '../components/TimeSelectionModule'
import Tabs from '../data/tabs'
import DashBoardContainer from '../features/Dashboard/DashBoardContainer'
import DashBoardMetricBlock from '../features/Dashboard/DashBoardMetricBlock'
import dashboardItems from '../data/dashboardItemsMock'
import AppState from '../components/AppStateInit'

function Dashboard() {
    const dashboardBlocks = dashboardItems.map((item) => (
        <DashBoardMetricBlock metric={item} key={item.name} />
    ))

    return (
        <>
            <HeaderNav />
            <AppState />
            <TimeSelectionModule tabs={Tabs} />
            <MainContent>
                <DashBoardContainer>{dashboardBlocks}</DashBoardContainer>
            </MainContent>
        </>
    )
}

export default Dashboard
