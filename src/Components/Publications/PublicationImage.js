import React from 'react'
import { Link } from 'react-router-dom'
import { CardBody } from '../Layouts/Card'

const PublicationImage = ({ id, photo }) => {
    return (
        <CardBody>
            <Link to={`/publication/${id}`}>
                <img className="cover" src={photo} alt="Publication" loading='lazy' />
            </Link>
        </CardBody>
    )
}

export default PublicationImage
