import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import ToastContext from '.';

const ToastProvider = ({ children }) => {    
    const notify = ({ message, color="green" }) => {
        toast(message, {
            progressStyle: { background: color },
        });
    }

    return (
        <ToastContext.Provider value={{ notify }}>
            { children }
            <ToastContainer />
        </ToastContext.Provider>
    )
}

export default ToastProvider;