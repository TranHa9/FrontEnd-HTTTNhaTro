import React, { useState } from 'react';
import { Address, Overview, Province } from '../../components';
import icons from '../../ultils/icons';
import { apiUploadImages } from '../../services';

const CreatePost = () => {

    const { IoIosCamera } = icons;

    const [payload, setPayload] = useState({
        categoryCode: "",
        title: '',
        priceNumber: 0,
        areaNumber: 0,
        images: '',
        address: '',
        priceCode: '',
        areaCode: '',
        description: '',
        target: '',
        province: ''
    })
    const [imagesPreview, setImagesPreview] = useState([])
    console.log(payload)
    const handleFiles = async (e) => {
        e.stopPropagation()
        let images = []
        const files = e.target.files
        const formData = new FormData()
        for (let i of files) {
            formData.append('file', i)
            formData.append("upload_preset", process.env.REACT_APP_UPLOAD_ASSETS_NAME)
            const response = await apiUploadImages(formData)
            if (response.status === 200) images = [...images, response.data?.secure_url]
        }
        setImagesPreview(images)
        setPayload(prev => ({ ...prev, images: JSON.stringify(images) }))

    }
    return (
        <div className='px-6 '>
            <h1 className='text-3xl font-medium py-4 border-b border-gray-300'>Đăng tin mới</h1>
            <div className='flex gap-4'>
                <div className='py-4 flex flex-col gap-8 flex-auto'>
                    <Address payload={payload} setPayload={setPayload} />
                    <Overview payload={payload} setPayload={setPayload} />
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
                            <input
                                onChange={handleFiles}
                                hidden type='file'
                                id='file' multiple
                            />
                            <div className='w-full'>
                                <h3 className='font-medium py-4'>Ảnh đã chọn</h3>
                                <div className='flex gap-4 items-center'>
                                    {imagesPreview?.map(item => {
                                        return (
                                            <img key={item} src={item} alt='ảnh' className='w-40 h-40 object-cover rounded-md' />
                                        )
                                    })}
                                </div>
                            </div>
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