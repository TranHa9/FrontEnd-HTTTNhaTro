import React, { useState } from 'react'
import InputForm from './InputForm'
import Button from './Button'
import { FaXmark } from 'react-icons/fa6'
import Swal from 'sweetalert2'
import { apiUpdatePassword } from '../services'
import { logout, resetDataUserEdit } from '../store/actions'
import validate from '../ultils/Common/validateField'
import { useDispatch, useSelector } from 'react-redux'

const ModalCurrent = ({ setIsEditPassword }) => {

    const [invalidFields, setInvalidFields] = useState([])
    const { currentData } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [payload, setPayload] = useState(() => {
        const initData = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        }
        return initData
    })

    const handleSubmit = async () => {
        const result = validate(payload, setInvalidFields)
        if (result === 0) {
            payload.userId = currentData?.id
            const response = await apiUpdatePassword(payload)
            if (response?.data.err === 0) {
                Swal.fire("Thông báo", "Đổi mật khẩu thành công", "success").then(() => {
                    resetPayload()
                    dispatch(resetDataUserEdit())
                    dispatch(logout())
                })
            } else if (response?.data.err === 2) {
                Swal.fire("Thông báo", "Mật khẩu cũ không chính xác", "error")
            } else if (response?.data.err === 3) {
                Swal.fire("Thông báo", "Mật khẩu mới và mật khẩu xác nhận không khớp", "error")
            } else {
                Swal.fire("Thông báo", "Đã có lỗi", 'error')
            }
        }
    }
    const resetPayload = () => {
        setPayload({
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        })
    }
    return (
        <div
            className='absolute top-0 left-0 right-0 bottom-0 bg-overlay-50 flex justify-end'
            onClick={e => {
                e.stopPropagation()
                setIsEditPassword(false)
            }}
        >
            <div
                className='bg-white max-w-600 w-full overflow-y-auto'
                onClick={e => e.stopPropagation()}
            >

                <div className='p-5 flex flex-col gap-6'>
                    <div className='py-4 border-b border-gray-300 flex items-center justify-between'>
                        <h1 className='text-3xl font-medium'>Đổi mật khẩu</h1>
                        <span
                            onClick={e => {
                                e.stopPropagation()
                                setIsEditPassword(false)
                            }}
                            className='cursor-pointer'
                        ><FaXmark size={30} color='red' /></span>
                    </div>
                    <div>
                        <div className='mb-4'>
                            <InputForm
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                                label={"Mật khẩu cũ"}
                                value={payload.oldPassword}
                                setValue={setPayload}
                                keyPayload={'oldPassword'}
                                type='password'
                            />
                        </div>
                        <div className='mb-4'>
                            <InputForm
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                                label={"Mật khẩu mới"}
                                value={payload.newPassword}
                                setValue={setPayload}
                                keyPayload={'newPassword'}
                                type='password'
                            />
                        </div>
                        <div className='mb-4'>
                            <InputForm
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                                label={"Xác nhận mật khẩu"}
                                value={payload.confirmPassword}
                                setValue={setPayload}
                                keyPayload={'confirmPassword'}
                                type='password'
                            />
                        </div>
                        <Button
                            onClick={handleSubmit}
                            // text={setIsEdit ? 'Cập nhật' : 'Tạo mới'}
                            text={'xác nhận'}
                            bgColor={'bg-redcover'}
                            textColor={'text-white'}
                            fullwidth
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalCurrent