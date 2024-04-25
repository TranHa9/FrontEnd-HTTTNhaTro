import React from 'react'
import { useSelector } from "react-redux"
import avatar from "../assets/avatar.png";
import { blobToBase64 } from '../ultils/Common/toBase64';

const User = () => {
    const { currentData } = useSelector(state => state.user)

    return (
        <>
            {currentData && Object.keys(currentData).length > 0 && <div className='flex items-center gap-2'>
                <img src={blobToBase64(currentData?.avatar) || avatar} alt='avatar' className='w-12 h-12 rounded-full object-cover' />
                <div className='flex flex-col'>
                    <span>
                        Xin chào,
                        <span className='font-semibold'>{currentData?.name}</span></span>
                    <span className='flex items-center'>
                        Mã tài khoản:
                        <span className='w-20 inline-block truncate align-middle font-medium'>{currentData?.id}</span></span>
                </div>
            </div>}
        </>
    )
}

export default User