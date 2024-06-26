import React, { memo } from 'react'

const SearchItem = ({ IconBefore, IconAfter, text, fontWeight, defaultText }) => {
    return (
        <div className='w-full bg-white py-2 px-2 rounded-md text-gray-500 text-[13px] flex items-center justify-between'>
            <div className='w-full flex items-center gap-1'>
                {IconBefore}
                <span className={`${fontWeight && 'font-medium text-black'} w-[100px] ${text ? 'font-medium text-black' : ''} truncate`}>{text || defaultText}</span>
            </div>
            {IconAfter}
        </div>
    )
}

export default memo(SearchItem)