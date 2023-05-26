import React from 'react';
import HomeBox from './HomeBox';
import Clock from '../../components/ReactTime.js/Clock';

const Home = () => {
    return (
        <div className='mx-5 h-[100vh]'>
            <p className='my-5 text-3xl font-extrabold text-[#463BFB]'>Overview</p>
            <Clock/>
            <p className='my-5 text-3xl font-extrabold text-[#463BFB]'>Explore SAMS</p>
            <HomeBox/>
        </div>
    );
};

export default Home;