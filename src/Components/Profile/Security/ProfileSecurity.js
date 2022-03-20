import React, { useContext } from 'react'
import UserContext from '../../../Context/user';

import SettingsDiv from '../../../Helpers/Settings/SettingsDiv';
import ProfilePrivate from './ProfilePrivate';

const ProfileSecurity = () => {
    const { user } = useContext(UserContext);    

    return (
        <div>
            <h2>Security</h2>

            <SettingsDiv>
                <h2>Private account</h2>
                <ProfilePrivate user={user} />
            </SettingsDiv>
        </div>
    )
}

export default ProfileSecurity
