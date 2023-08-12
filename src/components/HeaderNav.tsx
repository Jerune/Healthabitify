import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks'
import {
    toggleManualDataGrid,
    toggleMenu,
} from '../redux/reducers/utilsReducer'
import logo from '../assets/logo_1b.jpg'
import { localSignOut } from '../redux/reducers/usersReducer'
import categoriesList from '../data/categories'
import Icon from './icon'

function HeaderNav() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const sideNavOpen = useAppSelector((state) => state.utils.sideNavOpen)
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn)
    const manualDataGridOpen = useAppSelector(
        (state) => state.utils.manualDataGridOpen
    )
    const sideNavClasses = sideNavOpen ? 'open' : ''
    const sideNavIcon = sideNavOpen ? (
        <Icon iconId="AiOutlineDoubleLeft" />
    ) : (
        <Icon iconId="AiOutlineDoubleRight" />
    )

    const menuCategories = categoriesList.map((category) => {
        return (
            <Link
                to={`/data/${category.name.toLowerCase()}`}
                key={category.name}
                className="flex flex-row items-center gap-3 py-2"
                onClick={() => dispatch(toggleMenu())}
            >
                <button type="button" className="text-xl">
                    <Icon iconId={category.iconName} />
                </button>
                <span className="text-lg">{category.name}</span>
            </Link>
        )
    })

    function signOutUser() {
        signOut(auth).then(() => {
            dispatch(localSignOut())
            navigate('/')
        })
    }

    return (
        <>
            <header className="flex flex-row fixed top-0 justify-between items-center h-12 w-full bg-palette-600 text-white border-b border-solid border-palette-600 z-20">
                <div className="flex flex-row items-center">
                    <Link to="/">
                        <img
                            className="h-12"
                            src={logo}
                            alt="Healthability logo"
                        />
                    </Link>
                    <Icon iconId="LogoText" />
                    {isLoggedIn && (
                        <button
                            type="button"
                            className="ml-4 md:ml-20 mt-2 text-base"
                            onClick={() => dispatch(toggleMenu())}
                        >
                            {sideNavIcon}
                        </button>
                    )}
                </div>
                {isLoggedIn && (
                    <section className="flex flex-row md:gap-6 md:mr-8 text-lg gap-4 mr-6">
                        <button
                            type="button"
                            className="cursor-pointer"
                            onClick={() => dispatch(toggleManualDataGrid())}
                        >
                            {manualDataGridOpen ? (
                                <Icon iconId="MdOutlineModeEditOutline" />
                            ) : (
                                <Icon iconId="MdModeEdit" />
                            )}
                        </button>
                        <Link to="/settings">
                            <Icon iconId="SlSettings" />
                        </Link>
                        <button
                            type="button"
                            className="cursor-pointer"
                            onClick={() => window.location.reload()}
                        >
                            <Icon iconId="TfiReload" />
                        </button>
                        <button
                            type="button"
                            className="cursor-pointer"
                            onClick={signOutUser}
                        >
                            <Icon iconId="SlLogout" />
                        </button>
                    </section>
                )}
            </header>
            <div className="h-12 w-full" />
            <nav
                className={`w-screen overflow-scroll md:w-auto h-screen flex flex-col fixed top-12 left-0 pb-14 py-5 pl-6 pr-14 bg-white shadow-lg z-50 ${sideNavClasses}`}
            >
                <Link
                    to="/"
                    className="flex flex-row items-center gap-3 py-2"
                    onClick={() => dispatch(toggleMenu())}
                >
                    <button type="button" className="text-xl">
                        <Icon iconId="MdDashboard" />
                    </button>
                    <span className="text-lg">Dashboard</span>
                </Link>
                <div>{menuCategories}</div>
                <div className="mt-6">
                    <Link
                        to="/labs"
                        className="flex flex-row items-center gap-3 py-2"
                        onClick={() => dispatch(toggleMenu())}
                    >
                        <Icon iconId="ImLab" />
                        <span className="text-base">Labs</span>
                    </Link>
                    <Link
                        to="/settings"
                        className="flex flex-row items-center gap-3 py-2"
                        onClick={() => dispatch(toggleMenu())}
                    >
                        <Icon iconId="SlSettings" />
                        <span className="text-base">Settings</span>
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default HeaderNav
