import React from 'react';
import { Address, Overview } from '../../components';
import icons from '../../ultils/icons';

const CreatePost = () => {

    const { IoIosCamera } = icons;

    return (
        <div className='px-6 '>
            <h1 className='text-3xl font-medium py-4 border-b border-gray-300'>Đăng tin mới</h1>
            <div className='flex gap-4'>
                <div className='py-4 flex flex-col gap-8 flex-auto'>
                    <Address />
                    <Overview />
                    <div className='w-full'>
                        <h2 className='font-semibold text-xl py-4'>Hình ảnh</h2>
                        <div className='w-full'>
                            <label
                                className='w-full flex flex-col items-center justify-center border-2 h-[200px] border-dashed border-gray-400'
                                htmlFor='file'
                            >
                                <IoIosCamera size={60} />
                                Thêm ảnh
                            </label>
                            <input hidden type='file' id='file' />
                        </div>
                    </div>
                    <div className='h-[500px]'></div>
                </div>
                <div className='w-[30%]'>
                    map
                </div>
            </div>
        </div>
    )
}

export default CreatePost