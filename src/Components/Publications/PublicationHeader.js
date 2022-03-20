import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { faArrowLeft, faEllipsisH, faPen, faShare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Avatar from '../../Helpers/Avatar'
import Button from '../Layouts/Button/Button'
import { faComment, faFlag } from '@fortawesome/free-regular-svg-icons'

import { Popover, PopoverHeader, PopoverBody } from '../Layouts/Popover';
import { CardHeader } from '../Layouts/Card'

const PublicationHeader = ({ showGoBack, id, user_photo, user_id, username, my_user_id, allData, handleDelete }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
    }

    return (
        <CardHeader>
            {
                allData
                    ? <div className="flex items-center">
                        { showGoBack && 
                            <span style={{ marginRight: "20px", cursor: "pointer" }} onClick={() => navigate(-1)}>
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </span>
                        }

                        <Link to={`/user/${username}`}>
                            <Avatar size="sm" src={user_photo} text={username} />
                        </Link>
                    </div>
                    : <div></div>
            }
            <>
                <Button color="hover" onClick={toggle}> <FontAwesomeIcon icon={faEllipsisH} /> </Button>

                <Popover toggle={toggle} open={open}>
                    <PopoverHeader> Action </PopoverHeader>
                    <PopoverBody>
                        {
                            my_user_id === user_id && <>
                                <Button color="red" block icon={faTrash} onClick={() => handleDelete(id)}>Delete</Button>
                                <hr className="bg-dark my-2" />
                                <Button color="yellow" block icon={faPen}>Edit</Button>
                                <hr className="bg-dark my-2" />
                            </>
                        }
                        <Button color="blue" block icon={faShare}>Share</Button>
                        <hr className="bg-dark my-2" />
                        <Button color="green" block icon={faComment}>Message</Button>
                        <hr className="bg-dark my-2" />
                        <Button color="red" block icon={faFlag}>Report</Button>
                    </PopoverBody>
                </Popover>
            </>
        </CardHeader>
    )
}

export default PublicationHeader
