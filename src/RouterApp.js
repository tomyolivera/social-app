import React from 'react'
import { BrowserRouter } from 'react-router-dom';

import Layout from './Components/Layouts/Base/Layout';

const RouterApp = () => {
    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    )
}

export default RouterApp
