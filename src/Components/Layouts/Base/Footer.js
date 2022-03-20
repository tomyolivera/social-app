import React from 'react'
import Links from './Links'

const Footer = ({ links }) => {
    return (
        <footer className="md:hidden flex justify-center items-center bg-gray-300 dark:bg-gray-800 fixed bottom-0 w-full">
            <Links links={links} />
        </footer>
    )
}

export default Footer
