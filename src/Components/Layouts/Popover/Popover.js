import React, { useEffect } from 'react';

export const Popover = ({ open, setOpen, children, className }) => {
    // useEffect(() => {
    //     document.addEventListener("click", e => {
    //         var a = e.target.parentNode;
    //         if(open && !a || !a.className?.includes("popover")){
    //             console.log("hola");
    //             setOpen(false);
    //         }
    //     })
    // }, [])

    return open && <div className={`popover ${className}`}>
        { children }
    </div>;
};