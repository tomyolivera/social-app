import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { AxiosGet } from '../../../Helpers/AxiosHttp';

import Avatar from '../../../Helpers/Avatar';
import UserContext from '../../../Context/user';
import { Popover, PopoverBody, PopoverHeader } from '../Popover';
import UserSocialData from '../../User/UserSocialData';

const SearchBar = () => {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [results, setResults] = useState([]);
    const { user } = useContext(UserContext); 

    const handleSearch = async () => {
        if(search === "") return setOpen(false);
        
        setOpen(true);
        AxiosGet(`users/search/${search}`).then(res => {
            setResults(res.data.filter(u => u.id !== user.id));
        });
    }

    const toggle = () => setOpen(!open);

    return (
        <div className="md:relative">
            <input className="form-control"
                    value={search}
                    placeholder='Search...'
                    onChange={e => setSearch(e.target.value)}
                    onKeyUp={handleSearch}
                    onClick={handleSearch}
                    autoComplete="off"
                    id="focus"
                />

            <Popover className="w-11/12" setOpen={setOpen} open={open}>
                <PopoverHeader> Results </PopoverHeader>
                <PopoverBody>
                    { 
                        results.length > 0 ? results?.map(({ username, photo, cant_followers, cant_following }, i) => (
                            <div key={i}>
                                { i !== 0 && <hr className="my-2" /> }

                                <Link to={`/user/${username}`} onClick={toggle} className="text-center">
                                    <div className="grid grid-cols-12 md:flex md:flex-col md:justify-center md:items-center">
                                        <div className="col-span-4">
                                            <Avatar src={photo} />
                                        </div>

                                        <div className="col-span-8">
                                            <p className="text-lg text-left md:text-center">{username}</p>
                                            <UserSocialData cantFollowers={cant_followers} cantFollowing={cant_following} />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                        : <p className="text-2xl">No results</p>
                    }
                </PopoverBody>
            </Popover>
        </div>
    )
}



export default SearchBar
