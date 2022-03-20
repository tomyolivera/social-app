import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useLocation } from 'react-router-dom'

import UserContext from '../../../Context/user'
import Avatar from '../../../Helpers/Avatar'

const Links = ({ links }) => {
    const { pathname: path } = useLocation();
    const { user } = useContext(UserContext);

    return (
        <>
            {
                Object.entries(links).map(([key, value], i) => (
                    value.session === "default" || value.session && user.id !== undefined || value.session === false && user.id === undefined
                        ? <Link key={i} to={value.path} className={`nav-link ${path === value.path ? "active" : ""}`}>
                            {   value.icon !== null
                                    ? <FontAwesomeIcon icon={value.icon} /> 
                                    : <Avatar src={user.photo} size="md" />
                            }
                        </Link>
                        : <></>
                ))
            }
        </>
    )
}

export default Links
