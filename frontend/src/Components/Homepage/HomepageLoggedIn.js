import React from 'react';

import './Homepage.css';

import Navigation from '../Navigation/Navigation';

const HomepageLoggedIn = () => {
    return (
        <div>
            <Navigation />
            This is the homepage for logged in users
        </div>
    );
};

export default HomepageLoggedIn;