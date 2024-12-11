import React from 'react';

import './MoodTracker.css';

import Navigation from '../Navigation/Navigation';

const MoodTracker = () => {
    return (
        <div className='flex flex-row'>
            <Navigation />
            This is the mood tracker page
        </div>
    );
};

export default MoodTracker;