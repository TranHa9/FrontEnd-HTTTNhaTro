import React, { useState } from 'react'
import { Button, NoSearch } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/vi';
import { Link, useSearchParams } from 'react-router-dom';
import { path } from '../../ultils/constant';
import { formatVietnameseToString } from '../../ultils/Common/formatVietnameseToString';
import { apiUpdatePost } from '../../services';
import Swal from 'sweetalert2';
import { Pagination } from '../Public';

const ConfirmPost = () => {
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const { postsStatus } = useSelector(state => state.post)
    const [isLoading, setIsLoading] = useState(false)
    const [payload, setPayload] = useState({
        status: 'Đã duyệt'
    })
    const [refuse, setRefuse] = useState({
        status: 'Đã hủy'
    })
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
        dispatch(actions.getPostsStatus(searchParamsObject))
            .then(() => {
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }, [searchParams])

    const formatTime = (createdAt) => {
        moment.locale('vi');
        return moment(createdAt).fromNow()
    }
    const handleSubmit = async (id) => {
        payload.postId = id
        const response = await apiUpdatePost(payload)
        if (response?.data.err === 0) {
            Swal.fire("Thông báo", "Đã duyệt", "success").then(() => {
                setPayload({
                    status: 'Đã duyệt'
                })
                dispatch(actions.getPostsStatus())
            })
        } else {
            Swal.fire("Thông báo", "Đã có lỗi", 'error')
        }
    }

    const handleRefuseSubmit = async (id) => {
        refuse.postId = id
        const response = await apiUpdatePost(refuse)
        if (response?.data.err === 0) {
            Swal.fire("Thông báo", "Đã từ chối", "success").then(() => {
                setRefuse({
                    status: 'Đã hủy'
                })
                dispatch(actions.getPostsStatus())
            })
        } else {
            Swal.fire("Thông báo", "Đã có lỗi", 'error')
        }
    }
    return (
        <div>
            <div className='py-4 flex items-center justify-between'>
                <h1 className='w-full text-3xl font-medium py-4 border-b border-gray-300'>Duyệt bài đăng</h1>
            </div>
            {!postsStatus?.length
                ?
                <NoSearch />
                :
                <div className="">
                    <table className="w-full">
                        <thead>
                            <tr className='bg-redcover text-white'>
                                <th className="px-4 py-3 border text-center text-xs font-bold uppercase">Mã tin</th>
                                <th className="px-4 py-3 border text-center text-xs font-bold uppercase">Ảnh đại diện</th>
                                <th className="px-4 py-3 border text-center text-xs font-bold uppercase">Tiêu đề</th>
                                <th className="px-4 py-3 border text-center text-xs font-bold uppercase">Giá</th>
                                <th className="px-4 py-3 border text-center text-xs font-bold uppercase">Thời gian</th>
                                <th className="px-4 py-3 border text-center text-xs font-bold uppercase">Người đăng</th>
                                <th className="px-4 py-3 border text-center text-xs font-bold uppercase">Xem chi tiết</th>
                                <th className="px-4 py-3 border text-center text-xs font-bold uppercase">Hoạt động</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {postsStatus?.length === 0 ? (
                                <tr>
                                    <td className="px-4 py-3">Bạn chưa có tin đăng nào</td>
                                </tr>
                            ) : (
                                postsStatus.map(item => (
                                    <tr key={item.id}>
                                        <td className="px-4 py-3">{item?.id}</td>
                                        <td className="px-4 py-3 flex items-center justify-center">
                                            <Link
                                                to={`${path.CONFIRM_POST_DETAIL}${formatVietnameseToString(item?.name.replaceAll('/', '-'))}/${item?.id}`}
                                                className='w-full'>
                                                <img src={JSON.parse(item?.images)[0] || ''} alt='ảnh của bài đăng' className='w-10 h-10 object-cover rounded-md' />
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3">
                                            <Link
                                                to={`${path.CONFIRM_POST_DETAIL}${formatVietnameseToString(item?.name.replaceAll('/', '-'))}/${item?.id}`}
                                                className='w-full hover:text-orange-600'>
                                                {item?.name}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3">{item?.price}</td>
                                        <td className="px-4 py-3">{formatTime(item?.created)}</td>
                                        <td className="px-4 py-3">{item?.user?.name}</td>
                                        <td className="px-4 py-3">
                                            <Link
                                                to={`${path.CONFIRM_POST_DETAIL}${formatVietnameseToString(item?.name.replaceAll('/', '-'))}/${item?.id}`}
                                                className='w-full text-[#E03C31] hover:text-blue-600'>
                                                Chi tiết
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className='flex items-center justify-center gap-2'>
                                                <Button
                                                    text={"Phê duyệt"}
                                                    bgColor={"bg-redcover text-white"}
                                                    onClick={() => handleSubmit(item?.id)}
                                                />
                                                <Button
                                                    text={"Từ chối"}
                                                    bgColor={"bg-gray-300"}
                                                    onClick={() => handleRefuseSubmit(item?.id)}
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
            <Pagination typeConfirm />
        </div>
    )
}

export default ConfirmPost