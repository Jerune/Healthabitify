import { useMemo } from 'react'
import { IconContext } from 'react-icons'
import { SlLogout, SlSettings } from 'react-icons/sl'
import { TfiReload } from 'react-icons/tfi'
import { Link } from 'react-router-dom'
import logo from '../assets/logo_1b.jpg'

function HeaderNav(): JSX.Element {
    const iconsStyle = useMemo(
        () => ({
            className: 'text-palette-600 h-16',
        }),
        []
    )

    return (
        <header className="flex flex-row justify-between h-16 w-[90%] mx-[5%] border-b border-solid border-palette-600">
            <div className="flex flex-row align-middle">
                <img className="h-full" src={logo} alt="Healthability logo" />
                <span className="pt-6 logo-text">ealthabitify</span>
            </div>
            <section className="flex flex-row gap-4 align-bottom">
                <IconContext.Provider value={iconsStyle}>
                    <Link to="/settings">
                        <SlSettings />
                    </Link>
                    <TfiReload />
                    <SlLogout />
                </IconContext.Provider>
            </section>
        </header>
    )
}

export default HeaderNav
