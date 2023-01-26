/* eslint-disable react/jsx-no-bind */
import { useState } from 'react'
import { RiHeartPulseFill } from 'react-icons/ri'
import { SlLogout, SlSettings } from 'react-icons/sl'
import { TfiReload } from 'react-icons/tfi'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import logo from '../assets/logo_1b.jpg'
import categoriesData from '../data/categoriesDataMock'

function HeaderNav(): JSX.Element {
    const [sideNavOpen, setSideNavOpen] = useState(true)
    const sideNavVisibility = sideNavOpen ? 'visible' : 'invisible'
    const sideNavIcon = sideNavOpen ? (
        <TiArrowSortedUp />
    ) : (
        <TiArrowSortedDown />
    )
    const menuCategories = categoriesData.map((category) => {
        return (
            <Link
                to={`/data/${category.name.toLowerCase()}`}
                key={category.name}
                className="flex flex-row items-center gap-2"
            >
                <RiHeartPulseFill />
                {category.name}
            </Link>
        )
    })

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
                className={`flex flex-col fixed top-16 left-[5%] ${sideNavVisibility}`}
            >
                {menuCategories}
            </nav>
        </>
    )
}

export default HeaderNav
