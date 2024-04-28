import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import *as actions from '../../store/actions';
import { formatDate } from '../../ultils/Common/formatDate';
import { Button, Loading, UpdatePost, UpdateUser } from '../../components'
import icons from '../../ultils/icons';
import { apiDeletePost, apiDeleteUser } from '../../services';
import Swal from 'sweetalert2';
import { Pagination } from '../Public';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import avatar from '../../assets/avatar.png'

const ManageUser = () => {
    const { AiOutlineEdit, AiOutlineDelete } = icons

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const { users } = useSelector(state => state.user)
    const [searchParams] = useSearchParams()
    const [isEdit, setIsEdit] = useState(false)
    const [isCreate, setIsCreate] = useState(false)
    const [updateData, setUpdateData] = useState(false)
    const [status, setStatus] = useState('0')
    const [sort, setSort] = useState(0)
    const [isLoading, setIsLoading] = useState(false)


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
        //if (categoryId) searchParamsObject.categoryId = categoryId
        if (sort === 1) searchParamsObject.order = ['createdAt', 'DESC']
        dispatch(actions.apiGetAllUser(searchParamsObject))
            .then(() => {
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }, [searchParams, sort])


    // useEffect(() => {
    //     !dataEdit && setIsEdit(false)
    // }, [dataEdit])
    // useEffect(() => {
    //     setPosts(postOfCurrent)
    // }, [postOfCurrent])

    const checkExpiration = (isoDateString) => {
        const expiryDate = new Date(isoDateString);
        const currentDate = new Date();
        if (expiryDate.getTime() >= currentDate.getTime()) {
            return "Đang hoạt động";
        } else {
            return "Đã hết hạn";
        }
    }
    const handleDeleteUser = async (userId) => {
        const response = await apiDeleteUser(userId)
        if (response?.data.err === 0) {
            Swal.fire('Thông báo!', 'Xóa thành công!', 'success')
            setUpdateData(prev => !prev)
        } else {
            Swal.fire('Lỗi!', 'Xóa tin đăng thất bại', 'error')
        }
    }

    const handlSatust = (e) => {
        setStatus(+e.target.value);
        navigate({
            pathname: location?.pathname,
            search: createSearchParams({
                expired: parseInt(+e.target.value),
            }).toString()
        });
    }
    return (
        <div className='flex flex-col gap-6'>
            <div className='py-4 border-b border-gray-300 flex items-center justify-between'>
                <h1 className='text-3xl font-medium'>Quản người dùng</h1>
                <div className='flex items-center gap-2 my-2'>
                    <Button
                        text={"Thêm mới"}
                        bgColor={"bg-blue-500 text-white"}
                        onClick={() => {
                            setIsCreate(true)
                        }}
                    />
                </div>
            </div>
            {isLoading
                ?
                <Loading />
                :
                <div className="">
                    <table className="w-full">
                        <thead>
                            <tr className='bg-secondary4 text-white'>
                                <th className="px-4 py-3 border text-center text-xs font-bold uppercase">Mã</th>
                                <th className="px-4 py-3 border text-center text-xs font-bold uppercase">Ảnh đại diện</th>
                                <th className="px-4 py-3 border text-center text-xs font-bold uppercase">Tên</th>
                                <th className="px-4 py-3 border text-center text-xs font-bold uppercase">Số điện thoại</th>
                                <th className="px-4 py-3 border text-center text-xs font-bold uppercase">Quyền</th>
                                <th className="px-4 py-3 border text-center text-xs font-bold uppercase">Hoạt động</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users?.length === 0 ? (
                                <tr>
                                    <td className="px-4 py-3">Bạn chưa có tin đăng nào</td>
                                </tr>
                            ) : (
                                users.map(item => (
                                    <tr key={item.id}>
                                        <td className="px-4 py-3">{item?.id}</td>
                                        <td className="px-4 py-3 flex items-center justify-center">
                                            <img src={item?.avatar || avatar} alt='avatar' className='w-10 h-10 object-cover rounded-md' />
                                        </td>
                                        <td className="px-4 py-3">{item?.name}</td>
                                        <td className="px-4 py-3">{item?.phone}</td>
                                        <td className="px-4 py-3">{item?.roleId}</td>
                                        <td className="px-4 py-3">
                                            <div className='flex items-center justify-center gap-2'>
                                                <AiOutlineEdit size={24}
                                                    onClick={() => {
                                                        dispatch(actions.editData(item))
                                                        setIsEdit(true)
                                                    }}
                                                />
                                                <AiOutlineDelete
                                                    size={24}
                                                    color='red'
                                                    onClick={() => handleDeleteUser(item.id)}
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
            {isCreate && <UpdateUser setIsCreate={setIsCreate} />}
            <Pagination type />
            {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
            <Pagination type />
        </div>
    );
}

export default ManageUser