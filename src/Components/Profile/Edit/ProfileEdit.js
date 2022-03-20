import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import UserContext from '../../../Context/user';
import SettingsDiv from '../../../Helpers/Settings/SettingsDiv'
import ProfileData from './ProfileData'

const ProfileEdit = () => {
    const { user } = useContext(UserContext);

    return (
        <div>
            <h2>Edit</h2>

            <SettingsDiv>
                <h2>User Data</h2>
                <ProfileData user={user} />
            </SettingsDiv>

            <SettingsDiv>
                <h2>Actions</h2>
                <Link to="/logout" className="button button-red">Logout</Link>
            </SettingsDiv>
        </div>
    )
}

export default ProfileEdit
