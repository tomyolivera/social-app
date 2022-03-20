import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import ButtonDarkMode from '../ButtonDarkMode'
import Links from './Links'
import SearchBar from './SearchBar'

const Header = ({ links }) => {
    const [openSearch, setOpenSearch] = useState(false);

    return (
        <nav className="flex items-center justify-center md:justify-between bg-teal-500 dark:opacity-95 dark:bg-gray-800 z-50" style={{ position: 'fixed', top: '0', width: '100%'}}>
            { !openSearch ? <Link className="md:flex items-center nav-link" to="/">FACER</Link> : null }

            { openSearch &&
                <div className="md:hidden flex items-center w-full ml-10">
                    <SearchBar />
                </div>
            }

            <div className="hidden mx-auto md:flex gap-5 items-center w-auto">
                <Links links={links} />
            </div>

            <div className="nav-link md:flex items-center">
                <Button className="block md:hidden" onClick={() => setOpenSearch(!openSearch)}>
                    <FontAwesomeIcon icon={openSearch ? faTimes : faSearch} />
                </Button>

                <ButtonDarkMode />
            </div>
        </nav>
    )
}

export default Header
