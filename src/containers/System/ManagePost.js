import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import *as actions from '../../store/actions';
import { formatDate } from '../../ultils/Common/formatDate';
import { Loading, ModalPost } from '../../components'
import icons from '../../ultils/icons';
import { apiDeletePost } from '../../services';
import Swal from 'sweetalert2';
import { Pagination } from '../Public';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const ManagePost = () => {
    const { AiOutlineEdit, AiOutlineDelete } = icons

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const { postOfCurrent, dataEdit } = useSelector(state => state.post)
    const [searchParams] = useSearchParams()
    const [isEdit, setIsEdit] = useState(false)
    const [updateData, setUpdateData] = useState(false)
    const [posts, setPosts] = useState([])
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
        dispatch(actions.getPostsLimitUser(searchParamsObject))
            .then(() => {
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }, [searchParams, sort, dataEdit, updateData])

    // useEffect(() => {
    //     !dataEdit && dispatch(actions.getPostsLimitAdmin())
    // }, [dataEdit, updateData])

    useEffect(() => {
        !dataEdit && setIsEdit(false)
    }, [dataEdit])
    useEffect(() => {
        setPosts(postOfCurrent)
    }, [postOfCurrent])

    const checkExpiration = (isoDateString) => {
        const expiryDate = new Date(isoDateString);
        const currentDate = new Date();
        if (expiryDate.getTime() >= currentDate.getTime()) {
            return "Đang hoạt động";
        } else {
            return "Đã hết hạn";
        }
    }
    const handleDeletePost = async (postId) => {
        const response = await apiDeletePost(postId)
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
                status: parseInt(+e.target.value),
            }).toString()
        });
    }
    return (
        <div className='flex flex-col gap-6'>
            <div className='py-4 border-b border-gray-300 flex items-center justify-between'>
                <h1 className='text-3xl font-medium'>Quản lý tin đăng</h1>
                <div className='flex items-center gap-2 my-2'>
                    <span>Sắp xếp:</span>
                    <span onClick={() => setSort(0)} className={`bg-gray-200 p-2 rounded-md cursor-pointer hover:underline ${sort === 0 && 'text-red-500'}`}>Mặc định</span>
                    <span onClick={() => setSort(1)} className={`bg-gray-200 p-2 rounded-md cursor-pointer hover:underline ${sort === 1 && 'text-red-500'}`}>Mới nhất</span>
                    <select
                        onChange={handlSatust}
                        value={status}
                        className='outline-none border p-2 border-gray-300 rounded-md'>
                        <option value='0'>Lọc theo trạng thái</option>
                        <option value='1'>Đang hoạt động</option>
                        <option value='2'>Đã hết hạn</option>
                        <option value='3'>Đang chờ duyệt</option>
                        <option value='4'>Đã hủy</option>
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
                                <th className="px-4 py-3 border text-center text-xs font-bold uppercase">Mã tin</th>
                                <th className="px-4 py-3 border text-center text-xs font-bold uppercase">Ảnh đại diện</th>
                                <th className="px-4 py-3 border text-center text-xs font-bold uppercase">Tiêu đề</th>
                                <th className="px-4 py-3 border text-center text-xs font-bold uppercase">Giá</th>
                                <th className="px-4 py-3 border text-center text-xs font-bold uppercase">Ngày bắt đầu</th>
                                <th className="px-4 py-3 border text-center text-xs font-bold uppercase">Ngày hết hạn</th>
                                <th className="px-4 py-3 border text-center text-xs font-bold uppercase">Trạng thái</th>
                                <th className="px-4 py-3 border text-center text-xs font-bold uppercase">Hoạt động</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {posts?.length === 0 ? (
                                <tr>
                                    <td className="px-4 py-3">Bạn chưa có tin đăng nào</td>
                                </tr>
                            ) : (
                                posts.map(item => (
                                    <tr key={item.id}>
                                        <td className="px-4 py-3">{item?.id}</td>
                                        <td className="px-4 py-3 flex items-center justify-center">
                                            <img src={JSON.parse(item?.images)[0] || ''} alt='ảnh của bài đăng' className='w-10 h-10 object-cover rounded-md' />
                                        </td>
                                        <td className="px-4 py-3">{item?.name}</td>
                                        <td className="px-4 py-3">{item?.price}</td>
                                        <td className="px-4 py-3">{formatDate(item?.created)}</td>
                                        <td className="px-4 py-3">{formatDate(item?.expired)}</td>
                                        <td className="px-4 py-3">
                                            {(item?.status === 'Đang chờ duyệt')
                                                ? item?.status
                                                : (item?.status === 'Đã hủy')
                                                    ? item?.status
                                                    :
                                                    checkExpiration(item?.expired)}
                                        </td>
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
                                                    onClick={() => handleDeletePost(item.id)}
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
            {isEdit && <ModalPost setIsEdit={setIsEdit} />}
            <Pagination type />
        </div>
    );
}

export default ManagePost