import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { faBell, faComment, faHome, faPlus, faSignInAlt, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';

import UserContext from '../../../Context/user';

// Base
import LoadingPage from './LoadingPage';

import Header from './Header';
import Footer from './Footer';
import InfoSection from './InfoSection';

import Home from '../../Home/Home';

// Users
import User from '../../User/User';
import Profile from '../../Profile/Profile';

// Publications
import Publications from '../../Publications/Publications';
import Content from '../../Content/Content';

// Auth
import Login from '../../Auth/Login/Login';
import Register from '../../Auth/Register/Register';
import Logout from '../../Auth/Logout';

const Layout = () => {
    const { pathname: path } = useLocation();
    const { user, getUser } = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    const links = {
        home: {
            session: "default",
            icon: faHome,
            path: "/"
        },
        chats: {
            session: true,
            icon: faComment,
            path: "/chats"
        },
        content: {
            session: true,
            icon: faPlus,
            path: "/content"
        },
        notifications: {
            session: true,
            icon: faBell,
            path: "/notifications"
        },
        user: {
            session: true,
            icon: null,
            path: `/user/${user.username}`
        },
        login: {
            session: false,
            icon: faSignInAlt,
            path: "/login"
        },
        register: {
            session: false,
            icon: faUser,
            path: "/register"
        }
    }

    useEffect(() => getUser().then(() => setLoading(false)), []);

    // path === "/" -> Home Page

    return (
        <>
            <LoadingPage loading={loading} />
            
            <Header links={links} />

            <div className="mb-20 md:w-3/4 m-auto" style={{ marginTop: '100px' }}>
                <div className={`${path === "/" && "md:grid md:grid-cols-12 md:gap-5"}`}>
                    <div className={`${path === "/" && "md:col-span-9 md:overflow-auto content"}`}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/publication/:id" element={<Publications />} />
                            <Route path="/user/:username" element={<User />} />

                            {
                                user.id
                                ? <>
                                    {/* Auth Routes */}
                                    <Route path="/logout" element={<Logout />} />
                                    <Route path="/content" element={<Content />} />
                                    <Route path="/settings/profile/:section" element={<Profile />} />
                                </>
                                : <>
                                    {/* Not Auth Routes */}
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                </>
                            }

                            <Route path="*" element={<div>404</div>} />
                        </Routes>
                    </div>
                    
                    { path === "/" && <InfoSection className="md:col-span-3" /> }
                </div>

                <Footer links={links} />
            </div>
        </>
    )
};

export default Layout;
