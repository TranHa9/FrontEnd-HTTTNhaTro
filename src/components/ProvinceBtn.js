import React, { memo } from 'react';

const ProvinceBtn = ({ name, image }) => {
    return (
        <div className=' shadow-md rounded-lg cursor-pointer'>
            <img
                src={image}
                alt={name}
                className='w-[190px] h-[110px] object-cover rounded-t-lg'
            >
            </img>
            <div className='font-medium p-2 text-blue-700 text-center hover:text-[orange] '>{name}</div>
        </div>
    )
}

export default memo(ProvinceBtn)