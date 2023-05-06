import React from 'react';
import { useLocation } from 'react-router-dom';

const GetUrlPage = () => {
    const location = useLocation();
    const teamName = decodeURIComponent(
        location.pathname.split('/').filter((p) => p !== '').pop()?.replace(/\+/g, ' ') || ''
    );


    return (
        <div>
            <h1>Get URL Page</h1>
            <p>Name team is: {teamName}</p>
        </div>
    );
};

export default GetUrlPage;
