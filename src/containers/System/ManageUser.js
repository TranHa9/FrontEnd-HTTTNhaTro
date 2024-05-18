import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import *as actions from '../../store/actions';
import { Button, Loading, ModalUser } from '../../components'
import icons from '../../ultils/icons';
import { apiDeleteUser } from '../../services';
import Swal from 'sweetalert2';
import { Pagination } from '../Public';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import avatar from '../../assets/avatar.png'
import { blobToBase64 } from '../../ultils/Common/toBase64';

const ManageUser = () => {
    const { AiOutlineEdit, AiOutlineDelete, AiOutlinePlusCircle } = icons

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const { users, dataUserEdit } = useSelector(state => state.user)
    const [searchParams] = useSearchParams()
    const [isEdit, setIsEdit] = useState(false)
    const [isCreate, setIsCreate] = useState(false)
    const [updateData, setUpdateData] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [userValue, setUserValue] = useState('');
    const [role, setRole] = useState('')


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
        dispatch(actions.apiGetAllUser(searchParamsObject))
            .then(() => {
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }, [searchParams, dataUserEdit, updateData])


    useEffect(() => {
        !dataUserEdit && setIsEdit(false)
    }, [dataUserEdit])

    const handleDeleteUser = async (userId) => {
        const response = await apiDeleteUser(userId)
        if (response?.data.err === 0) {
            Swal.fire('Thông báo!', 'Xóa thành công!', 'success')
            setUpdateData(prev => !prev)
        } else {
            Swal.fire('Lỗi!', 'Xóa tin đăng thất bại', 'error')
        }
    }

    const handlSearchType = (userValue) => {
        setRole('')
        navigate({
            pathname: location?.pathname,
            search: createSearchParams({
                userValue: userValue,
            }).toString()
        });
    }

    const handlRole = (e) => {
        setRole(e.target.value);
        navigate({
            pathname: location?.pathname,
            search: createSearchParams({
                role: e.target.value,
            }).toString()
        });
        setUserValue('')
    }

    return (
        <div className='flex flex-col gap-6'>
            <div className='py-4 border-b border-gray-300 flex items-center justify-between'>
                <h1 className='text-3xl font-medium'>Quản người dùng</h1>
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
                            placeholder="Nhập tên hoặc số điện thoại"
                            className='w-[300px] outline-none border p-2 border-gray-300 rounded-md'
                            value={userValue}
                            onChange={(e) => setUserValue(e.target.value)}
                        />
                        <Button
                            text={"Tìm kiếm"}
                            onClick={() => handlSearchType(userValue)}
                            bgColor={"bg-redcover"}
                            textColor={"text-white"}
                        />
                        <select
                            onChange={handlRole}
                            value={role}
                            className='outline-none border p-2 border-gray-300 rounded-md ml-3'>
                            <option value=''>Lọc theo trạng thái</option>
                            <option value='admin'>Admin</option>
                            <option value='user'>User</option>
                        </select>
                    </div>
                </div>
                {isLoading
                    ?
                    <Loading />
                    :
                    <div className="">
                        <table className="w-full">
                            <thead>
                                <tr className='bg-redcover text-white'>
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
                                        <td className="px-4 py-3">không tìm thấy</td>
                                    </tr>
                                ) : (
                                    users.map(item => (
                                        <tr key={item.id}>
                                            <td className="px-4 py-3">{item?.id}</td>
                                            <td className="px-4 py-3 flex items-center justify-center">
                                                <img src={blobToBase64(item?.avatar) || avatar} alt='avatar' className='w-10 h-10 object-cover rounded-md' />
                                            </td>
                                            <td className="px-4 py-3">{item?.name}</td>
                                            <td className="px-4 py-3">{item?.phone}</td>
                                            <td className="px-4 py-3">{item?.role}</td>
                                            <td className="px-4 py-3">
                                                <div className='flex items-center justify-center gap-2'>
                                                    <AiOutlineEdit size={24}
                                                        onClick={() => {
                                                            dispatch(actions.editUserData(item))
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
            </div>
            {isCreate && <ModalUser setIsCreate={setIsCreate} />}
            {isEdit && <ModalUser setIsEdit={setIsEdit} />}
            <Pagination typeUser />
        </div>
    );
}

export default ManageUser