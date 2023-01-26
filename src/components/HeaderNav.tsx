/* eslint-disable react/jsx-no-bind */
import { useState } from 'react'
import { SlLogout, SlSettings } from 'react-icons/sl'
import { TfiReload } from 'react-icons/tfi'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import logo from '../assets/logo_1b.jpg'

function HeaderNav(): JSX.Element {
    const [sideNavOpen, setSideNavOpen] = useState(true)
    const sideNavVisibility = sideNavOpen ? 'visible' : 'invisible'
    const sideNavIcon = sideNavOpen ? (
        <TiArrowSortedUp />
    ) : (
        <TiArrowSortedDown />
    )

    function toggleMenu() {
        setSideNavOpen((prevState) => !prevState)
    }

    return (
        <>
            <header className="flex flex-row justify-between items-center h-16 w-[90%] mx-[5%] border-b border-solid border-palette-600">
                <div className="flex flex-row items-center">
                    <img className="h-16" src={logo} alt="Healthability logo" />
                    <span className="pt-1 logo-text">ealthabitify</span>
                    <button
                        type="button"
                        className="pt-2 ml-3 text-lg"
                        onClick={toggleMenu}
                    >
                        {sideNavIcon}
                    </button>
                </div>
                <section className="flex flex-row gap-4 text-lg">
                    <Link to="/settings">
                        <SlSettings />
                    </Link>
                    <TfiReload />
                    <SlLogout />
                </section>
            </header>
            <nav
                className={`flex flex-column fixed top-16 left-0 ${sideNavVisibility}`}
            >
                <Link to="/data/vitals" onClick={toggleMenu}>
                    Vitals
                </Link>
                <Link to="/data/vitals">Vitals</Link>
                <Link to="/data/vitals">Vitals</Link>
            </nav>
        </>
    )
}

export default HeaderNav
