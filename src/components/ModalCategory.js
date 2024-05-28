import React, { useEffect, useState } from 'react'
import InputFormV2 from './InputFormV2'
import Button from './Button'
import validate from '../ultils/Common/validateField'
import Swal from 'sweetalert2'
import { apiCreateCategory, apiCreateNewUser, apiUpdateCategoryData, apiUpdateUserData } from '../services';
import *as actions from '../store/actions';
import InputForm from './InputForm'
import { useDispatch, useSelector } from 'react-redux'
import icons from '../ultils/icons'

const ModalCategory = ({ setIsCreate, setIsEdit }) => {
    const { FaXmark } = icons

    const { dataCategoryEdit } = useSelector(state => state.app)
    const dispatch = useDispatch()
    const [payload, setPayload] = useState(() => {
        const initData = {
            name: dataCategoryEdit?.name || '',
            title: dataCategoryEdit?.title || '',
            description: dataCategoryEdit?.description || ''
        }

        return initData
    })
    const [invalidFields, setInvalidFields] = useState([])

    useEffect(() => {
        if (setIsCreate) {
            dispatch(actions.resetDataCategoryEdit())
        }
    }, [setIsCreate]);

    useEffect(() => {
        if (setIsEdit && dataCategoryEdit) {
            setPayload({
                name: dataCategoryEdit.name || '',
                title: dataCategoryEdit.title || '',
                description: dataCategoryEdit.description || '',
            });
        } else {
            resetPayload();
        }
    }, [setIsEdit, dataCategoryEdit]);
    const handleSubmit = async () => {
        const result = validate(payload, setInvalidFields)
        if (result === 0) {
            if (dataCategoryEdit) {
                payload.categoryId = dataCategoryEdit?.id
                const response = await apiUpdateCategoryData(payload)
                if (response?.data.err === 0) {
                    Swal.fire("Thông báo", "Đã sửa thành công", "success").then(() => {
                        resetPayload()
                        dispatch(actions.resetDataCategoryEdit())
                    })
                } else {
                    Swal.fire("Thông báo", "Đã có lỗi", 'error')
                }
            } else {
                const response = await apiCreateCategory(payload)
                if (response?.data.err === 0) {
                    Swal.fire("Thông báo", "Đã thêm mới chuyên mục thành công", "success").then(() => {
                        resetPayload()
                        dispatch(actions.getCategoriesLimit())
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
            title: '',
            description: ''
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
                        <h1 className='text-3xl font-medium'>{setIsEdit ? 'Sửa thông tin chuyên mục' : 'Thêm chuyên mục'}</h1>
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
                        <div className='mb-4'>
                            <InputFormV2
                                value={payload.title}
                                setValue={setPayload}
                                name='title'
                                label={'Tiêu đề'}
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='font-medium' htmlFor='desc'>Nôi dung mô tả</label>
                            <textarea
                                className='w-full rounded-md outline-none border border-gray-300 p-2'
                                id='desc'
                                cols={30}
                                rows={10}
                                value={payload.description}
                                onChange={(e) => setPayload(prev => ({ ...prev, description: e.target.value }))}
                                onFocus={() => setInvalidFields([])}
                            ></textarea>
                            <small className='text-red-500 block w-full'>
                                {invalidFields?.some(item => item.name === 'description') && invalidFields?.find(item => item.name === 'description')?.message}
                            </small>
                        </div>

                        <Button
                            onClick={handleSubmit}
                            text={setIsEdit ? 'Cập nhật' : 'Tạo mới'}
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

export default ModalCategory