import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../Context/user';
import { AxiosGet } from '../../Helpers/AxiosHttp';

const Logout = () => {
    const navigate = useNavigate();
    const { getUser } = useContext(UserContext);
    
    useEffect(() => {
        (async () => {
            await AxiosGet('auth/logout');
            await getUser();
        })().then(() => {
            navigate("/");
        });
    }, [])

    return <></>
}

export default Logout
