import React from 'react'

const UserSocialData = ({ cantPublications=null, cantFollowers, cantFollowing }) => {
    return (
        <div className="flex">
            {
                cantPublications !== null && <div className="mr-3">
                    <p style={{ fontSize:"18px" }}><b className="text-xl font-extrabold">{ cantPublications } </b> Publications</p>
                </div>
            }

            {
                cantFollowers !== null && <div className="mr-3">
                    <p style={{ fontSize:"18px" }}><b className="text-xl font-extrabold">{ cantFollowers }</b> Followers</p>
                </div>
            }

            {
                cantFollowing !== null && <div>
                    <p style={{ fontSize:"18px" }}><b className="text-xl font-extrabold">{ cantFollowing }</b> Following</p>
                </div>
            }
        </div>
    )
}

export default UserSocialData
