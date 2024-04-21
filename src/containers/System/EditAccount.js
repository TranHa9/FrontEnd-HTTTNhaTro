import React, { useState } from 'react'
import { Button, InputFormV2, InputReadOnly } from '../../components';
import avatar from '../../assets/avatar.png'
import { useSelector, useDispatch } from 'react-redux';
import { apiUpdateUser } from '../../services';
import { fileToBase64, blobToBase64 } from '../../ultils/Common/toBase64';
import { getCurrent } from '../../store/actions';
import Swal from 'sweetalert2';

const EditAccount = () => {
    const { currentData } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [payload, setPayload] = useState({
        name: currentData?.name || '',
        avatar: blobToBase64(currentData?.avatar) || '',
        fbUrl: currentData?.fbUrl || '',
        zalo: currentData?.zalo || ''
    })

    const handleSubmit = async () => {
        const response = await apiUpdateUser(payload)
        if (response?.data.err === 0) {
            Swal.fire('Thông báo', 'Cập nhật thành công', 'success').then(() => {
                dispatch(getCurrent())
            })
        } else {
            Swal.fire('Lỗi!', 'Cập nhật thất bại', 'error')
        }
    }
    const handleUploadFile = async (e) => {
        const imageBase64 = await fileToBase64(e.target.files[0])
        setPayload(prev => ({
            ...prev,
            avatar: imageBase64
        }))
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