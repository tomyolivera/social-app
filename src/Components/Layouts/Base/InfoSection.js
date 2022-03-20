import React, { useEffect } from 'react';
import SearchBar from './SearchBar';

const InfoSection = ({ className }) => {
    return (
        <div className={`hidden md:block ${className}`}>
            <SearchBar />
            
            <p className="text-xl font-bold">May be you like</p>
        </div>
    )
};

export default InfoSection;
