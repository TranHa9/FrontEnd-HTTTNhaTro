import React, { useEffect, useState } from 'react'
import InputFormV2 from './InputFormV2'
import Button from './Button'
import validate from '../ultils/Common/validateField'
import Swal from 'sweetalert2'
import { apiCreateNewUser, apiUpdateUserData } from '../services';
import *as actions from '../store/actions';
import InputForm from './InputForm'
import { useDispatch, useSelector } from 'react-redux'
import { resetDataUserEdit } from '../store/actions'
import icons from '../ultils/icons'

const UpdateUser = ({ setIsCreate, setIsEdit }) => {
    const { FaXmark } = icons

    const { dataUserEdit } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [payload, setPayload] = useState(() => {
        const initData = {
            name: dataUserEdit?.name || '',
            password: dataUserEdit?.password || '',
            phone: dataUserEdit?.phone || '',
            roleId: dataUserEdit?.roleId || '',
        }

        return initData
    })
    const [invalidFields, setInvalidFields] = useState([])

    // useEffect(() => {
    //     if (setIsEdit) {
    //         delete payload.password;
    //     }
    // }, [setIsEdit]);

    useEffect(() => {
        if (setIsEdit && dataUserEdit) {
            setPayload({
                name: dataUserEdit.name || '',
                phone: dataUserEdit.phone || '',
                roleId: dataUserEdit.roleId || '',
            });
            delete payload.password;
        } else {
            resetPayload();
        }
    }, [setIsEdit, dataUserEdit]);
    const handleSubmit = async () => {
        const result = validate(payload, setInvalidFields)
        if (result === 0) {
            if (dataUserEdit) {
                payload.userId = dataUserEdit?.id
                const response = await apiUpdateUserData(payload)
                if (response?.data.err === 0) {
                    Swal.fire("Thông báo", "Đã sửa thành công", "success").then(() => {
                        resetPayload()
                        dispatch(resetDataUserEdit())
                    })
                } else {
                    Swal.fire("Thông báo", "Đã có lỗi", 'error')
                }
            } else {
                const response = await apiCreateNewUser(payload)
                if (response?.data.err === 0) {
                    Swal.fire("Thông báo", "Đã thêm bài đăng mới", "success").then(() => {
                        resetPayload()
                        dispatch(actions.apiGetAllUser())
                    })
                }
                else {
                    Swal.fire("Thông báo", "Đã có lỗi", 'error')
                }
            }
        }
    }

    const resetPayload = () => {
        setPayload({
            name: '',
            password: '',
            phone: '',
            roleId: '',
        })
    }
    return (
        <div
            className='absolute top-0 left-0 right-0 bottom-0 bg-overlay-50 flex justify-end'
            onClick={e => {
                e.stopPropagation()
                setIsEdit ? setIsEdit(false) : setIsCreate(false)
            }}
        >
            <div
                className='bg-white max-w-600 w-full overflow-y-auto'
                onClick={e => e.stopPropagation()}
            >
                <div className='p-5 flex flex-col gap-6'>
                    <div className='py-4 border-b border-gray-300 flex items-center justify-between'>
                        <h1 className='text-3xl font-medium'>{setIsEdit ? 'Sửa thông tin người dùng' : 'Thêm người dùng'}</h1>
                        <span
                            onClick={e => {
                                e.stopPropagation()
                                setIsEdit ? setIsEdit(false) : setIsCreate(false)
                            }}
                            className='cursor-pointer'
                        ><FaXmark size={30} color='red' /></span>
                    </div>
                    <div>
                        <div className='mb-4'>
                            <InputFormV2
                                value={payload.name}
                                setValue={setPayload}
                                name='name'
                                label={'Tên'}
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                            />
                        </div>
                        {!setIsEdit && <div className='mb-4'>
                            <InputForm
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                                label={"Mật khẩu"}
                                value={payload.password}
                                setValue={setPayload}
                                keyPayload={'password'}
                                type='password'
                            />
                        </div>}

                        <div className='mb-4'>
                            <InputFormV2
                                value={payload.phone}
                                setValue={setPayload}
                                name='phone'
                                label={'Số điện thoại'}
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                            />
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='roleId' className='block text-gray-700 font-bold mb-2'>Phân quyền:</label>
                            <select
                                name='roleId'
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
                                value={payload.roleId}
                                onChange={(e) => setPayload({ ...payload, roleId: e.target.value })}
                                onFocus={() => setInvalidFields([])}
                            >
                                <option value=''>Chọn quyền</option>
                                <option value='R1'>Admin</option>
                                <option value='R2'>User</option>
                            </select>
                            {<small className='text-red-500 block w-full'>
                                {invalidFields?.find(item => item.name === 'roleId')?.message}
                            </small>}
                        </div>
                        <Button
                            onClick={handleSubmit}
                            text={setIsEdit ? 'Cập nhật' : 'Tạo mới'}
                            bgColor={'bg-secondary1'}
                            textColor={'text-white'}
                            fullwidth
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateUser