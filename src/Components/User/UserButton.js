import { faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../Layouts/Button/Button'

const UserButton = ({ userProfileId, user_id, IAmFollowing, handleFollow }) => {
    return (
        <div>
            {
                userProfileId === user_id
                    ?   <Link className="button button-gray" to="/settings/profile/edit" style={{ textDecoration: 'none' }}>
                            <FontAwesomeIcon icon={faCog} />
                        </Link>
                    : <Button color={IAmFollowing === 1 ? "red" : IAmFollowing === 0 ? "blue" : "green" } onClick={handleFollow}>
                        { IAmFollowing === 1 ? 'Unfollow' : IAmFollowing === 0 ? 'Follow' : "Waiting to be accepted" }
                    </Button>
            }
        </div>
    )
}

export default UserButton
