import React from 'react';

const SmallSpinner = () => {
    return (
        <div className='flex justify-center gap-1'>
        <div className='h-4 w-4 bg-white animate-bounce rounded-full'>
        </div>
        <div className='h-4 w-4 bg-white rounded-full'>
        </div>
        <div className='h-4 w-4 bg-white animate-bounce rounded-full'>
        </div>
        </div>
    );
};

export default SmallSpinner;