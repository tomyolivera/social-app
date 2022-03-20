import React from 'react'

const Avatar = ({ src, size="md", rounded=true, text=null, textPosition="right" }) => {
    const defaultPhoto = "https://www.intra-tp.com/wp-content/uploads/2017/02/no-avatar.png"
    const img_size = size === "sm" ? "w-8" : size === "md" ? "w-12" : size === "lg" ? "w-16" : size === "xl" ? "w-24" : size === "2xl" ? "w-32" : "w-40";

    return (
        <div className="flex items-center">
            { text && textPosition === "left" && <b className="mr-2">{text}</b> }
            
            <img src={src || defaultPhoto}
                className={`${rounded && "rounded-full"} ${img_size}`}
            />

            { text && textPosition === "right" && <b className="mx-2">{text}</b> }
        </div>
    )
}

export default Avatar
