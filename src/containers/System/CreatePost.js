import React, { useEffect, useState } from 'react';
import { Address, Overview, Loading, Button } from '../../components';
import icons from '../../ultils/icons';
import { apiUpdatePost, apiUploadImages } from '../../services';
import { useSelector, useDispatch } from 'react-redux';
import { getCodes, getCodesArea } from '../../ultils/Common/getCodes';
import { apiCreateNewPost } from '../../services';
import Swal from 'sweetalert2';
import validate from '../../ultils/Common/validateField';
import { resetDataEdit } from '../../store/actions';

const CreatePost = ({ isEdit }) => {
    const { IoIosCamera, ImBin } = icons;
    const dispatch = useDispatch()

    const { dataEdit } = useSelector(state => state.post)
    const [payload, setPayload] = useState(() => {
        const initData = {
            categoryId: dataEdit?.categoryId || '',
            name: dataEdit?.name || '',
            price: dataEdit?.price || 0,
            area: dataEdit?.area || 0,
            images: dataEdit?.images ? JSON.parse(dataEdit?.images) : '',
            address: dataEdit?.address || '',
            description: dataEdit?.description || '',
            target: dataEdit?.target || '',
            provinceId: dataEdit?.provinceId || '',
            districtId: dataEdit?.districtId || '',
            wardId: dataEdit?.wardId || '',
            expired: dataEdit?.expired || '',
        }

        return initData
    })
    const [imagesPreview, setImagesPreview] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { currentData } = useSelector(state => state.user)
    const [invalidFields, setInvalidFields] = useState([])

    useEffect(() => {
        if (dataEdit && dataEdit.images && dataEdit.images) {
            let images = JSON.parse(dataEdit?.images)
            images && setImagesPreview(images)
        }
    }, [dataEdit])


    const handleFiles = async (e) => {
        e.stopPropagation()
        setIsLoading(true)
        let images = []
        const files = e.target.files
        const formData = new FormData()
        for (let i of files) {
            formData.append('file', i)
            formData.append("upload_preset", process.env.REACT_APP_UPLOAD_ASSETS_NAME)
            const response = await apiUploadImages(formData)
            if (response.status === 200) images = [...images, response.data?.secure_url]
        }
        setIsLoading(false)
        setImagesPreview(prev => [...prev, ...images])
        setPayload(prev => ({ ...prev, images: [...prev.images, ...images] }))

    }

    const handleDeleteImage = (image) => {
        setImagesPreview(prev => prev?.filter(item => item !== image))
        setPayload(prev => ({
            ...prev,
            images: prev.images?.filter(item => item !== image)
        }))
    }

    const handleSubmit = async () => {

        let finalPayload = {
            ...payload,
            useId: currentData.id,
        }
        const result = validate(finalPayload, setInvalidFields)
        if (result === 0) {
            if (dataEdit) {
                finalPayload.postId = dataEdit?.id
                const response = await apiUpdatePost(finalPayload)
                if (response?.data.err === 0) {
                    Swal.fire("Thông báo", "Đã sửa thành công", "success").then(() => {
                        resetPayload()
                        dispatch(resetDataEdit())
                    })
                } else {
                    Swal.fire("Thông báo", "Đã có lỗi", 'error')
                }
            } else {
                const response = await apiCreateNewPost(finalPayload)
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
    }
    const resetPayload = () => {
        setPayload({
            categoryId: "",
            title: '',
            price: 0,
            area: 0,
            images: '',
            address: '',
            description: '',
            target: '',
        })
    }
    return (
        <div className='px-6 '>
            <h1 className='text-3xl font-medium py-4 border-b border-gray-300'>{isEdit ? 'Sửa tin đăng' : 'Đăng tin mới'}</h1>
            <div className='flex gap-4'>
                <div className='py-4 flex flex-col gap-8 flex-auto'>
                    <Address invalidFields={invalidFields} setInvalidFields={setInvalidFields} payload={payload} setPayload={setPayload} />
                    <Overview invalidFields={invalidFields} setInvalidFields={setInvalidFields} payload={payload} setPayload={setPayload} />
                    <div className='w-full'>
                        <h2 className='font-semibold text-xl py-4'>Hình ảnh</h2>
                        <div className='w-full'>
                            <label
                                className='w-full flex flex-col items-center justify-center border-2 h-[200px] border-dashed border-gray-400'
                                htmlFor='file'
                            >
                                {isLoading
                                    ? <Loading />
                                    : <span className='flex flex-col items-center justify-center'>
                                        <IoIosCamera size={60} color='#23A8F2' />
                                        Thêm ảnh
                                    </span>
                                }
                            </label>

                            <input
                                onChange={handleFiles}
                                hidden type='file'
                                id='file' multiple
                            />
                            <small className='text-red-500 block w-full'>
                                {invalidFields?.some(item => item.name === 'images') && invalidFields?.find(item => item.name === 'images')?.message}
                            </small>
                            <div className='w-full'>
                                <h3 className='font-medium py-4'>Ảnh đã chọn</h3>
                                <div className='flex gap-4 items-center'>
                                    {imagesPreview?.map(item => {
                                        return (
                                            <div key={item} className='relative w-40 h-40'>
                                                <img src={item} alt='ảnh' className='w-full h-full object-cover rounded-md' />
                                                <span
                                                    title='Xóa'
                                                    className='absolute top-0 right-0 p-2 cursor-pointer bg-gray-300 hover:bg-red-500 rounded-full'
                                                    onClick={() => handleDeleteImage(item)}
                                                >
                                                    <ImBin />
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button
                        onClick={handleSubmit}
                        text={isEdit ? 'Cập nhật' : 'Tạo mới'}
                        bgColor={'bg-secondary1'}
                        textColor={'text-white'}
                    />
                    <div className='h-[500px]'></div>
                </div>
                <div className='w-[30%]'>
                    map
                    <Loading />
                </div>
            </div>
        </div>
    )
}

export default CreatePost