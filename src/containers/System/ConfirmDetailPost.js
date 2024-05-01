import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsStatus } from '../../store/actions';
import { Button, SliderCustom } from '../../components';
import icons from '../../ultils/icons';
import { formatDate } from '../../ultils/Common/formatDate';
import moment from 'moment';
import 'moment/locale/vi';
import { formatVietnameseToString } from '../../ultils/Common/formatVietnameseToString';
import MapWithSearch from '../../components/MapWithSearch';
import avatar from '../../assets/avatar.png'
import { blobToBase64 } from '../../ultils/Common/toBase64';
import * as action from "../../store/actions"
import Swal from 'sweetalert2';
import { apiUpdatePost } from '../../services';
import { createBrowserHistory } from 'history';


const ConfirmDetailPost = () => {

    const { CiLocationOn, TbReportMoney, RiCrop2Line, MdAccessTime, GoHash, FaPhoneAlt, SiZalo, RiHeartLine, RiHeartFill } = icons
    const { postStatusId } = useParams()
    const dispatch = useDispatch()
    const history = createBrowserHistory()
    const { postsStatus } = useSelector(state => state.post)

    const [payload, setPayload] = useState({
        status: 'Đã duyệt'
    })
    const [refuse, setRefuse] = useState({
        status: 'Đã hủy'
    })
    useEffect(() => {
        postStatusId && dispatch(getPostsStatus({ id: postStatusId }))
    }, [postStatusId])

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
                dispatch(action.getPostsStatus())
                history.back();
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
                dispatch(action.getPostsStatus())
                history.back();
            })
        } else {
            Swal.fire("Thông báo", "Đã có lỗi", 'error')
        }
    }

    return (
        <div className='w-full flex gap-4'>
            <div className='w-[70%]'>
                <SliderCustom images={(postsStatus && postsStatus.length > 0 && postsStatus[0]?.images) && JSON.parse(postsStatus[0]?.images)} />
                <div className='w-full bg-white shadow-md rounded-md p-6'>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-2xl font-bold text-red-600'>{postsStatus[0]?.name}</h2>
                        <div className=' flex items-center gap-2'>
                            <span>Chuyên mục:</span>
                            <span className='text-blue-600 underline font-medium hover:text-orange-600'>
                                <Link
                                    to={`/${postsStatus[0]?.category?.name && formatVietnameseToString(postsStatus[0]?.category?.name)}`}
                                    className='text-blue-600 font-medium hover:text-orange-600'
                                >{postsStatus[0]?.category?.name}</Link>
                            </span>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <CiLocationOn />
                            <span>{postsStatus[0]?.address}</span>
                        </div>
                        <div className='flex items-center justify-between'>
                            <span className='flex items-center gap-1'>
                                <TbReportMoney />
                                <span className='font-medium text-lg'>{postsStatus[0]?.price} đồng/tháng</span>
                            </span>
                            <span className='flex items-center gap-1'>
                                <RiCrop2Line />
                                <span>{postsStatus[0]?.area} m2</span>
                            </span >
                            <span className='flex items-center gap-1'>
                                <MdAccessTime />
                                <span>{formatTime(postsStatus[0]?.created)}</span>
                            </span>
                            <span className='flex items-center gap-1'>
                                <GoHash />
                                <span>{postsStatus[0]?.id}</span>
                            </span>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <h3 className='font-semibold text-xl my-4'>Thông tin mô tả</h3>
                        <div className='flex flex-col gap-3'>
                            {postsStatus[0]?.description}
                        </div>
                    </div>
                    <div className='mt-8'>
                        <h3 className='font-semibold text-xl my-4'>Đặc điểm tin đăng</h3>
                        <table className='w-full'>
                            <tbody>
                                <tr className='w-full '>
                                    <td className="px-4 py-3">Mã tin</td>
                                    <td className="px-4 py-3">{postsStatus[0]?.id}</td>
                                </tr>
                                <tr className='w-full bg-gray-200'>
                                    <td className="px-4 py-3">Khu vực</td>
                                    <td className="px-4 py-3">{postsStatus[0]?.address}</td>
                                </tr>
                                <tr className='w-full '>
                                    <td className="px-4 py-3">Loại tin rao</td>
                                    <td className="px-4 py-3">{postsStatus[0]?.category?.name}</td>
                                </tr>
                                <tr className='w-full bg-gray-200'>
                                    <td className="px-4 py-3">Đối tượng thuê</td>
                                    <td className="px-4 py-3">{postsStatus[0]?.target}</td>
                                </tr>
                                <tr className='w-full '>
                                    <td className="px-4 py-3">Ngày đăng</td>
                                    <td className="px-4 py-3">{formatDate(postsStatus[0]?.created)}</td>
                                </tr>
                                <tr className='w-full bg-gray-200'>
                                    <td className="px-4 py-3">Ngày hết hạn</td>
                                    <td className="px-4 py-3">{formatDate(postsStatus[0]?.expired)}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <div>
                        <h3 className='font-semibold text-xl my-4'>Thông tin liên hệ</h3>
                        <table className='w-full'>
                            <tbody>
                                <tr className='w-full '>
                                    <td className="px-4 py-3">Liên hệ</td>
                                    <td className="px-4 py-3">{postsStatus[0]?.user?.name}</td>
                                </tr>
                                <tr className='w-full bg-gray-200'>
                                    <td className="px-4 py-3">Điện thoại</td>
                                    <td className="px-4 py-3">{postsStatus[0]?.user?.phone}</td>
                                </tr>
                                <tr className='w-full '>
                                    <td className="px-4 py-3">Zalo</td>
                                    <td className="px-4 py-3">{postsStatus[0]?.user?.zalo}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='mt-8'>
                        <h3 className='font-semibold text-xl my-4'>Bản đồ</h3>
                        {postsStatus && <MapWithSearch address={postsStatus[0]?.address} />}
                    </div>
                </div>
                <div className='h-[120px]'>
                </div>
            </div>
            <div className='w-[30%] flex flex-col gap-5'>
                <div className='w-full rounded-md shadow-md flex flex-col items-center p-4 gap-4'>
                    <img
                        className='w-16 h-16 object-contain rounded-full'
                        src={blobToBase64(postsStatus[0]?.user?.avatar) || avatar}
                        alt='Ảnh đại diện'
                    />
                    <h3 className='font-bold text-xl'>{postsStatus[0]?.user?.name}</h3>
                    <a
                        className='w-full text-white font-bold text-lg bg-green-700 py-2 flex items-center justify-center gap-2 rounded-md'
                        href={`tel:${postsStatus[0]?.user.zalo}`}
                    >
                        <FaPhoneAlt />
                        {postsStatus[0]?.user?.phone}
                    </a>
                    <a
                        className='w-full font-bold text-lg border-2 bg-white border-black py-2 flex items-center justify-center gap-2 rounded-md'
                        href={`https://zalo.me/${postsStatus[0]?.user.zalo}`}
                        target='_blank'
                    >
                        <SiZalo size={24} color='blue' />
                        {'Nhắn Zalo'}
                    </a>
                    <Button
                        text={"Phê duyệt"}
                        bgColor={"bg-redcover text-white"}
                        onClick={() => handleSubmit(postsStatus[0]?.id)}
                        fullwidth
                    />
                    <Button
                        text={"Từ chối"}
                        bgColor={"bg-gray-300"}
                        onClick={() => handleRefuseSubmit(postsStatus[0]?.id)}
                        fullwidth
                    />
                </div>
            </div>
        </div>
    )
}

export default ConfirmDetailPost