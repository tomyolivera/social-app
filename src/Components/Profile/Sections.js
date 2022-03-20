import React from 'react'

import ProfileEdit from './Edit/ProfileEdit'
import ProfileSecurity from './Security/ProfileSecurity'

const Sections = ({ section }) => {
    return (
        <div>
            {
                section &&
                section === 'edit' ? <ProfileEdit /> :
                section === 'security' ? <ProfileSecurity /> : <></>
            }    
        </div>
    )
}

export default Sections
