import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import UserContext from '../../Context/user';

import Avatar from '../../Helpers/Avatar'
import Publications from '../Publications/Publications';
import UserSocialData from './UserSocialData';
import UserData from './UserData';
import UserButton from './UserButton';
import { AxiosGet } from '../../Helpers/AxiosHttp';
import LoadingPage from '../Layouts/Base/LoadingPage';

const User = ({ u }) => {
    const navigate = useNavigate()
    
    const [loading, setLoading] = useState(true);

    const { user, setUser } = useContext(UserContext);
    const { username } = useParams();
    const [userProfile, setUserProfile] = useState();
    
    // const [IAmFollowing, setIAmFollowing] = useState(0);
    // const [cantFollowers, setCantFollowers] = useState(0);
    // const [cantFollowing, setCantFollowing] = useState(0);
    // const [cantPublications, setCantPublications] = useState(0);

    useEffect(() => {
        (async function(){
            await getUser();
            setLoading(false);
        })();
    }, [loading, username])

    const getUser = async () => {
        if(username){
            await AxiosGet(`users/username/${username}`).then(({ data }) => setUserProfile(data[0]));
        }else setUserProfile(u);
    }

    const handleFollow = async () => {
        if(!user.id)
            return navigate("/login");
            
        if(userProfile.IAmFollowing === 0){
            if(userProfile.is_private)
                return setUserProfile({ ...userProfile, IAmFollowing: 2 });

            setUserProfile({ ...userProfile, IAmFollowing: 1, cant_followers: userProfile.cant_followers + 1 });
            await AxiosGet(`users/follow/${user.id}/${userProfile.id}`);
        } else if(userProfile.IAmFollowing === 2)
            return setUserProfile({ ...userProfile, IAmFollowing: 2 });
        else {
            if(userProfile.is_private)
                if(!window.confirm("Do yo want to unfollow this account?")) return false;

            setUserProfile({ ...userProfile, cant_followers: userProfile.cant_followers - 1, IAmFollowing: 0 });

            await AxiosGet(`users/follow/${user.id}/${userProfile.id}`);
        }
    }

    return (
        loading ? <div className="spinner">Loading</div>
            : <>
                <div className="flex flex-col justify-center text-gray-800 dark:text-gray-300 items-center text-center">
                    <div>
                        <Avatar src={userProfile.photo} size="xxl" />

                        <div className="hidden md:flex items-center justify-center mt-3">
                            <UserButton IAmFollowing={userProfile.IAmFollowing} user_id={user.id} userProfileId={userProfile.id} handleFollow={handleFollow} />
                        </div>

                        <div className="md:hidden absolute top-24 right-3">
                            <UserButton IAmFollowing={userProfile.IAmFollowing} user_id={user.id} userProfileId={userProfile.id} handleFollow={handleFollow} />
                        </div>
                    </div>

                    <div className="my-4">
                        <UserData username={userProfile.username} name={userProfile.name} description={userProfile.description} />
                    </div>

                    <div>
                        <UserSocialData cantPublications={userProfile.cant_publications} cantFollowers={userProfile.cant_followers} cantFollowing={userProfile.cant_following} />
                    </div>
                </div>

                <hr className="my-4" />

                {/* User Publications */}
                <div className="flex flex-col">
                    <Publications user_id={userProfile.id} allData={false} user={userProfile} setUser={setUserProfile} />
                </div>
        </>
    )
}

export default User
