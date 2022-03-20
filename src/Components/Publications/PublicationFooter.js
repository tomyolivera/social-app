import moment from 'moment';
import React from 'react';
import { CardFooter } from '../Layouts/Card';
import PublicationButtons from './PublicationButtons';

const PublicationFooter = ({ publication, ILiked, pubLikes, handleLike, handleComment, handleSend, handleSave }) => {
    return (
        <CardFooter>
            <PublicationButtons ILiked={ILiked}
                                pubLikes={pubLikes}
                                handleLike={handleLike}
                                handleComment={handleComment}
                                handleSend={handleSend}
                                handleSave={handleSave}
                            />

            <div>
                { publication.description && <><b>{ publication.username }</b> { publication.description }</>}
            </div>
            <cite className="text-gray-600">{ moment(publication.created_at).fromNow() }</cite>
        </CardFooter>
    )
};

export default PublicationFooter;
