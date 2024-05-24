import React from 'react';
import { Navigation } from '../Public';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='w-full flex h-[60px]'>
            <div className='flex justify-center items-center font-bold text-[#E03C31] text-xl bg-gray-200 pl-[2%]'>
                <Link to={'/'}>
                    Phòng Trọ SV
                </Link>
            </div>
            <div className='flex-auto'>
                <Navigation />
            </div>
        </div>
    )
}

export default Header