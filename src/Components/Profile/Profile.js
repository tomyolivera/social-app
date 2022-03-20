import React from 'react'
import { useParams } from 'react-router-dom';

import ProfileLinks from './ProfileLinks';
import Sections from './Sections';

const Profile = () => {
    const { section } = useParams();

    return (
        <div>
            <h1>Profile</h1>

            <div className="row">
                <div className="col">
                    <ProfileLinks section={section} />
                </div>

                <div className="col">
                    <Sections section={section} />
                </div>
            </div>
        </div>
    )
}

export default Profile
