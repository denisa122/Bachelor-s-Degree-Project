import React from 'react';

import './Journal.css';

import Navigation from '../Navigation/Navigation';

const Journal = () => {
    return (
        <div className='flex flex-row'>
            <Navigation />
            This is the journal page
        </div>
    );
};

export default Journal;