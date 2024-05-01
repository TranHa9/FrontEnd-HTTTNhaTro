import React from 'react';
import { Navigation } from '../Public';

const Header = () => {
    return (
        <div className='w-full flex h-[60px]'>
            <div className='flex justify-center items-center font-bold text-[#E03C31] text-xl bg-gray-200 pl-[2%]'>
                Phòng Trọ SV
            </div>
            <div className='flex-auto'>
                <Navigation />
            </div>
        </div>
    )
}

export default Header