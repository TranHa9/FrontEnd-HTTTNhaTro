import React from 'react'
import icons from '../ultils/icons'

const NoSearch = () => {
    const { FaRegQuestionCircle } = icons
    return (
        <div className='w-full h-[250px] flex items-center justify-center text-lg'>
            Không tìm thấy...
        </div>
    )
}

export default NoSearch