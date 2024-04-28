import React, { useState } from 'react'
import InputFormV2 from './InputFormV2'
import Button from './Button'
import validate from '../ultils/Common/validateField'
import Swal from 'sweetalert2'
import { apiCreateNewUser } from '../services'
import InputForm from './InputForm'

const UpdateUser = ({ setIsCreate }) => {

    const [payload, setPayload] = useState(() => {
        const initData = {
            name: '',
            password: '',
            phone: '',
            roleId: '',
        }

        return initData
    })
    const [invalidFields, setInvalidFields] = useState([])

    const handleSubmit = async () => {
        const result = validate(payload, setInvalidFields)
        console.log(payload)
        console.log(result)
        if (result === 0) {
            const response = await apiCreateNewUser(payload)
            if (response?.data.err === 0) {
                Swal.fire("Thông báo", "Đã thêm bài đăng mới", "success").then(() => {
                    resetPayload()
                })
            }
            else {
                Swal.fire("Thông báo", "Đã có lỗi", 'error')
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
                setIsCreate(false)
            }}
        >
            <div
                className='bg-white max-w-600 w-full overflow-y-auto'
                onClick={e => e.stopPropagation()}
            >
                <div className='p-5 flex flex-col gap-6'>
                    <div className='py-4 border-b border-gray-300 flex items-center justify-between'>
                        <h1 className='text-3xl font-medium'>Thêm người dùng</h1>
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

                        <div className='mb-4'>
                            <InputForm
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                                label={"Mật khẩu"}
                                value={payload.password}
                                setValue={setPayload}
                                keyPayload={'password'}
                                type='password'
                            />
                        </div>

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
                            //text={isEdit ? 'Cập nhật' : 'Tạo mới'}
                            text={'tạo mới'}
                            bgColor={'bg-secondary1'}
                            textColor={'text-white'}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateUser