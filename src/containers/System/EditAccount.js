import React, { useState } from 'react'
import { Button, InputFormV2, InputReadOnly } from '../../components';
import avatar from '../../assets/avatar.png'
import { useSelector } from 'react-redux';
import { apiUploadImages, apiUpdateUser } from '../../services';
import validate from '../../ultils/Common/validateField';

const EditAccount = () => {
    const { currentData } = useSelector(state => state.user)
    const [payload, setPayload] = useState({
        name: currentData?.name || '',
        avatar: currentData?.avatar || '',
        fbUrl: currentData?.fbUrl || '',
        zalo: currentData?.zalo || ''
    })

    const handleSubmit = async () => {
        const response = await apiUpdateUser(payload)
    }
    const handleUploadFile = async (e) => {
        const imgae = e.target.files[0]
        const formData = new FormData()
        formData.append('file', imgae)
        formData.append("upload_preset", process.env.REACT_APP_UPLOAD_ASSETS_NAME)
        const response = await apiUploadImages(formData)
        if (response.status === 200) {
            setPayload(prev => ({
                ...prev,
                avatar: response.data.secure_url
            }))
        }
    }
    return (
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-3xl w-full text-start font-medium py-4 border-b border-gray-300'>Thông tin cá nhân</h1>
            <div className='w-3/5 flex items-center justify-center'>
                <div className=' w-full py-6 flex flex-col gap-4'>
                    <InputReadOnly
                        direction={'flex-row'}
                        label={'Mã thành viên'}
                        value={currentData?.id || ''}
                    />
                    <InputReadOnly
                        direction={'flex-row'}
                        label={'Số điện thoại'}
                        editPhone
                        value={currentData?.phone}
                    />
                    <InputFormV2
                        setValue={setPayload}
                        name={'name'}
                        direction={'flex-row'}
                        label={'Tên hiển thị'}
                        value={payload.name}
                    />
                    <InputFormV2
                        setValue={setPayload}
                        name={'zalo'}
                        direction={'flex-row'}
                        label={'Zalo'}
                        value={payload.zalo}
                    />
                    <InputFormV2
                        setValue={setPayload}
                        name={'fbUrl'}
                        direction={'flex-row'}
                        label={'FaceBook'}
                        value={payload.fbUrl}
                    />
                    <div className='flex'>
                        <label className='w-48 flex-none' htmlFor='password'>Mật khẩu</label>
                        <small className='flex-auto h-12 text-blue-500 cursor-pointer'>Đổi mật khẩu</small>
                    </div>
                    <div className='flex mb-4'>
                        <label className='w-48 flex-none' htmlFor='avatar'>Ảnh đại diện</label>
                        <div>
                            <img src={payload.avatar || avatar} alt='avatar' className='w-20 h-20 rounded-full object-cover' />
                            <input
                                className='appearance-none my-4'
                                type='file'
                                id='avatar'
                                onChange={handleUploadFile}
                            />
                        </div>
                    </div>
                    <Button
                        text={'Cập nhật'}
                        bgColor={'bg-secondary4'}
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    )
}

export default EditAccount