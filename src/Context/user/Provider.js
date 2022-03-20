import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserContext from '.';

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});

    const getUser = async () => {
        const response = await axios.get('http://localhost:5000/api/auth/user', { withCredentials: true });
        if(response.status === 200)
            setUser(response.data[0]);
        else setUser({});
    }

    useEffect(() => {
        (async function(){
            await getUser();
        })();
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, getUser }}>
            { children }
        </UserContext.Provider>
    )
}

export default UserProvider;