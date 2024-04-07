import React from 'react'
import { useSelector } from "react-redux"
import avatar from "../assets/avatar.png"

const User = () => {
    const { currentData } = useSelector(state => state.user)

    return (
        <div className='flex items-center gap-2'>
            <img src={currentData?.avatar || avatar} alt='avatar' className='w-14 h-15 object-cover rounded-full' />
            <div className='flex flex-col'>
                <span>
                    Xin chào,
                    <span className='font-semibold'>{currentData?.name}</span></span>
                <span className='flex items-center'>
                    Mã tài khoản:
                    <span className='w-20 inline-block truncate align-middle font-medium'>{currentData?.id}</span></span>
            </div>
        </div>
    )
}

export default User