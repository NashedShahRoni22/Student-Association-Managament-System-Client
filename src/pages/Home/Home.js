import React from 'react';
import HomeBox from './HomeBox';
import Clock from '../../components/ReactTime.js/Clock';

const Home = () => {
    return (
        <div className='banner'>
            <div className='h-full bg-black/40 p-5'>
            <p className='mb-5 text-3xl font-extrabold text-white text-end'>Overview</p>
            <Clock/>
            <p className='mt-6 mb-5 text-3xl font-extrabold text-white text-end'>Explore SAMS</p>
            <HomeBox/>
        </div>
        </div>
    );
};

export default Home;