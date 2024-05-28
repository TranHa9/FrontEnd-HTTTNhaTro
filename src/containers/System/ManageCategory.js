import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import * as actions from '../../store/actions';
import icons from '../../ultils/icons';
import { Button, Loading, ModalCategory } from '../../components';
import { Pagination } from '../Public';
import { apiDeleteCategory } from '../../services';
import Swal from 'sweetalert2';

const ManageCategory = () => {
    const { AiOutlineEdit, AiOutlineDelete, AiOutlinePlusCircle, FaXmark } = icons

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const { categories, dataCategoryEdit } = useSelector(state => state.app)
    const [searchParams] = useSearchParams()
    const [isEdit, setIsEdit] = useState(false)
    const [isCreate, setIsCreate] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [deleteCategoryId, setDeleteCategoryId] = useState(null);
    const [updateData, setUpdateData] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [categoryName, setCategoryName] = useState('')


    useEffect(() => {
        setIsLoading(true);
        let params = []
        for (let entry of searchParams.entries()) {
            params.push(entry)
        }
        let searchParamsObject = {}
        params?.forEach(i => {
            if (Object.keys(searchParamsObject)?.some(item => item === i[0])) {
                searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
            } else {
                searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
            }
        })
        dispatch(actions.getCategoriesLimit(searchParamsObject))
            .then(() => {
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }, [searchParams, dataCategoryEdit, updateData])


    const handleDeleteCategory = async (categoryId) => {
        const response = await apiDeleteCategory(categoryId)
        if (response?.data.err === 0) {
            Swal.fire('Thông báo!', 'Xóa thành công!', 'success')
            setUpdateData(prev => !prev)
        } else {
            Swal.fire('Lỗi!', 'Xóa tin đăng thất bại', 'error')
        }
    }

    const handlSearchName = (categoryName) => {
        navigate({
            pathname: location?.pathname,
            search: createSearchParams({
                categoryName: categoryName,
            }).toString()
        });
    }

    return (
        <div className='flex flex-col gap-6'>
            <div className='py-4 border-b border-gray-300 flex items-center justify-between'>
                <h1 className='text-3xl font-medium'>Quản lý chuyên mục</h1>
            </div>
            <div>
                <div className='flex items-center justify-between gap-2 my-2'>
                    <Button
                        text={"Thêm mới"}
                        bgColor={"bg-redcover text-white"}
                        IcAfter={AiOutlinePlusCircle}
                        onClick={() => {
                            setIsCreate(true)
                        }}
                    />
                    <div className='flex items-center justify-center'>
                        <input
                            type="text"
                            placeholder="Nhập tên chuyên mục"
                            className='w-[300px] outline-none border p-2 border-gray-300 rounded-md'
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                        <Button
                            text={"Tìm kiếm"}
                            onClick={() => handlSearchName(categoryName)}
                            bgColor={"bg-redcover"}
                            textColor={"text-white"}
                        />
                    </div>
                </div>
                {isLoading
                    ?
                    <Loading />
                    :
                    <div className="shadow-md">
                        <table className="w-full">
                            <thead>
                                <tr className='bg-redcover text-white'>
                                    <th className="px-2 py-3 border text-center text-xs font-bold uppercase">Mã</th>
                                    <th className="px-2 py-3 border text-center text-xs font-bold uppercase">Tên</th>
                                    <th className="px-2 py-3 border text-center text-xs font-bold uppercase">Tiêu đề</th>
                                    <th className="px-2 py-3 border text-center text-xs font-bold uppercase">mô tả</th>
                                    <th className="px-2 py-3 border text-center text-xs font-bold uppercase">Hoạt động</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {categories?.length === 0 ? (
                                    <tr>
                                        <td className="px-2 py-3">không tìm thấy</td>
                                    </tr>
                                ) : (
                                    categories.map((item, index) => (
                                        <tr key={item.id}>
                                            <td className="px-2 py-3 text-center">{item?.id}</td>
                                            <td className="px-2 py-3">{item?.name}</td>
                                            <td className="px-2 py-3">
                                                <div className='w-[300px] whitespace-nowrap overflow-ellipsis overflow-hidden'>
                                                    {item?.title}
                                                </div>
                                            </td>
                                            <td className="px-2 py-3">
                                                <div className='w-[500px] whitespace-nowrap overflow-ellipsis overflow-hidden'>
                                                    {item?.description}
                                                </div>
                                            </td>
                                            <td className="px-2 py-3">
                                                <div className='flex items-center justify-center gap-2 cursor-pointer'>
                                                    <AiOutlineEdit size={24}
                                                        onClick={() => {
                                                            dispatch(actions.editCategoryData(item))
                                                            setIsEdit(true)
                                                        }}
                                                    />
                                                    <AiOutlineDelete
                                                        size={24}
                                                        color='red'
                                                        onClick={() => {
                                                            setIsDelete(true)
                                                            setDeleteCategoryId(item.id)
                                                        }}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
            {isCreate && <ModalCategory setIsCreate={setIsCreate} />}
            {isEdit && <ModalCategory setIsEdit={setIsEdit} />}
            {isDelete && <div
                className='absolute top-0 left-0 right-0 bottom-0 bg-overlay-50 flex justify-center'
                onClick={e => {
                    e.stopPropagation()
                    setIsDelete(false)
                }}
            >
                <div
                    className='bg-white mt-5 w-[450px] h-[200px] rounded-lg'
                    onClick={e => e.stopPropagation()}
                >
                    <div className='pr-5 pl-5 flex flex-col gap-6'>
                        <div className='py-2 border-b border-gray-300 flex items-center justify-between'>
                            <h1 className='text-3xl font-medium'>Thông báo</h1>
                            <span
                                onClick={e => {
                                    e.stopPropagation()
                                    setIsDelete(false)
                                }}
                                className='cursor-pointer'
                            ><FaXmark size={30} color='red' /></span>
                        </div>
                        <p>Bạn có chắc muốn xóa không ?</p>
                    </div>
                    <div className='pr-5 pl-5 mt-6 flex flex-col gap-6'>
                        <div className='pt-5 border-t border-gray-300 flex gap-4 items-center justify-end'>
                            <Button
                                onClick={() => {
                                    handleDeleteCategory(deleteCategoryId)
                                    setIsDelete(false)
                                }}
                                text={'Xác nhận'}
                                bgColor={'bg-redcover'}
                                textColor={'text-white'}
                            />
                            <Button
                                onClick={() => {
                                    setDeleteCategoryId(null)
                                    setIsDelete(false)
                                }}
                                text={'Không'}
                                bgColor={'bg-gray-300'}
                            />
                        </div>
                    </div>
                </div>
            </div>}
            <div className='h-[120px]'>
                <Pagination typeCategory />
            </div>
        </div >
    );
}

export default ManageCategory