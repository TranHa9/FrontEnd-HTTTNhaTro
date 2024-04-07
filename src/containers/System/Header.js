import React from 'react';
import { Navigation } from '../Public';

const Header = () => {
    return (
        <div className='w-full flex h-[40px]'>
            <div className='flex justify-center items-center font-bold bg-secondary1 text-white pl-[2%]'>
                PhongTro
            </div>
            <div className='flex-auto'>
                <Navigation />
            </div>
        </div>
    )
}

export default Header