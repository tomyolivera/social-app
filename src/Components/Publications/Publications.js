import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import Publication from './Publication';
import { AxiosDelete, AxiosGet } from '../../Helpers/AxiosHttp';

const Publications = ({ user_id=null, allData=true, user, setUser }) => {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        (async function(){
            await getPublications(id, user_id).then(() => {
                setLoading(false)
            });
        })();
    }, [user_id]);

    const getPublications = async (id, user_id) => {
        let data;

        if(id){
            data = await AxiosGet(`publications/${id}`);
            data = data.data;
        }else if(user_id){
            data = await AxiosGet(`publications/user/${user_id}`);
            data = data.data;
        }else {
            data = await AxiosGet('publications');
            data = data.data;
        }


        setPublications(data);
    }

    const handleComment = () => {

    }

    const handleSend = () => {
        
    }

    const handleSave = () => {

    }

    const handleDelete = async id => {
        if(window.confirm(`Are you sure you want to delete this publication with id: ${id}?`)){
            await AxiosDelete(`publications/${id}`);
            await getPublications(null, user_id);
            if(user.cant_publications)
                setUser({ ...user, cant_publications: user.cant_publications - 1 });
        }
    }

    return (
        loading ? <div className="spinner"></div>
        : <div className={`${allData ? "md:max-w-xl" : "md:grid md:grid-cols-2 lg:grid-cols-3"}`}>
            {
                publications?.length > 0 ? publications?.map(p => (
                    <div key={p.id} className="mb-5">
                        <Publication    p={p} 
                                        allData={allData}
                                        handleDelete={handleDelete}
                                        handleComment={handleComment}
                                        handleSend={handleSend}
                                        handleSave={handleSave}
                                        showGoBack={allData ? id ? true : false : false}
                                    />
                    </div>
                ))

                : <h1>No publications yet</h1>
            }
        </div>
    )
}

export default Publications
