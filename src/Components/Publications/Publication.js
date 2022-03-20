import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import UserContext from '../../Context/user';

import { Card, CardContent } from '../Layouts/Card';

import PublicationHeader from './PublicationHeader';
import PublicationImage from './PublicationImage';
import PublicationFooter from './PublicationFooter';

const Publication = ({ p, allData, showGoBack, handleDelete, handleComment, handleSend, handleSave }) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { _id } = useParams();

    const [publication, setPublication] = useState({});
    const [loading, setLoading] = useState(true);
    const [ILiked, setILiked] = useState(false);
    const [pubLikes, setPubLikes] = useState(0);

    useEffect(() => {
        (async function () {
            await getPublication();
            setLoading(false);
        })();
    }, [loading, publication]);

    const getPublication = async () => {
        if(_id){
            const response = await axios.get(`http://localhost:5000/api/publications/${_id}`, { withCredentials: true });
            setPublication(response.data[0]);
        }else setPublication(p)

        if(!loading){
            setPubLikes(publication.cant_likes);
            setILiked(publication.ILiked);
        }
    }

    const handleLike = async () => {
        if(!user.id)
            return navigate("/login");

        if(ILiked){
            setPubLikes(pubLikes - 1);
            setILiked(false);
        }
        else {
            setPubLikes(pubLikes + 1)
            setILiked(true);
        }

        await axios.get(`http://localhost:5000/api/publications/like/${user.id}/${publication.id}`, { withCredentials: true});
    }

    return (
        !loading &&
            <Card>
                <CardContent>
                    <PublicationHeader  id={publication.id}
                                        user_photo={publication.user_photo}
                                        user_id={publication.user_id}
                                        username={publication.username}
                                        allData={allData}
                                        my_user_id={user.id}
                                        handleDelete={handleDelete}
                                        showGoBack={showGoBack}
                                    />
                    
                    <PublicationImage   id={publication.id}
                                        photo={publication.photo}
                                    />
                    
                    <PublicationFooter  id={publication.id}
                                        publication={publication}
                                        ILiked={ILiked}
                                        pubLikes={pubLikes}
                                        handleLike={handleLike}
                                        handleComment={handleComment}
                                        handleSend={handleSend}
                                        handleSave={handleSave}
                                    />
                </CardContent>
            </Card>
    )
}

export default Publication
