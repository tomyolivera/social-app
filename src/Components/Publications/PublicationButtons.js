import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare, faHeart as faHeartFill } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faCommentDots, faSave } from '@fortawesome/free-regular-svg-icons'
import Button from '../Layouts/Button/Button'

const PublicationButtons = ({ ILiked, pubLikes, handleLike, handleComment, handleSend, handleSave }) => {
    return (
        <div className="flex justify-between py-2">
            <div className="flex items-center">
                <span>{ pubLikes }</span>
                <Button onClick={handleLike}>
                    <FontAwesomeIcon icon={ILiked ? faHeartFill : faHeart } className={ILiked ? "text-red-500" : ""} />
                </Button>

                <Button className="mx-2" onClick={handleComment}><FontAwesomeIcon icon={faCommentDots} /></Button>

                <Button onClick={handleSend}><FontAwesomeIcon icon={faShare} /></Button>
            </div>

            <Button onClick={handleSave}><FontAwesomeIcon icon={faSave} /></Button>
        </div>
    )
}

export default PublicationButtons
