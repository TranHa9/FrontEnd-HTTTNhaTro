import React, { memo } from 'react';

const ProvinceBtn = ({ name, image }) => {
    return (
        <div className=' shadow-md rounded-lg  text-blue-700 cursor-pointer hover:text-[orange]'>
            <img
                src={image}
                alt={name}
                className='w-[190px] h-[110px] object-cover rounded-t-lg'
            >
            </img>
            <div className='font-medium p-2 text-center '>{name}</div>
        </div>
    )
}

export default memo(ProvinceBtn)