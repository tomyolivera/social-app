import React from 'react'

const UserData = ({ username, name, description }) => {
    return (
        <div>
            <p className="text-xl font-semibold">{ name }</p>
            <p className="text-gray-600 font-semibold">@{ username }</p>
            <p>{ description }</p>
        </div>
    )
}

export default UserData
