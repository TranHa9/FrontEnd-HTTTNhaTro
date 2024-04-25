import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsLimit } from '../../store/actions';
import { Button, RelatedPost, SliderCustom } from '../../components';
import icons from '../../ultils/icons';
import { formatDate } from '../../ultils/Common/formatDate';
import moment from 'moment';
import 'moment/locale/vi';
import { formatVietnameseToString } from '../../ultils/Common/formatVietnameseToString';
import MapWithSearch from '../../components/MapWithSearch';
import avatar from '../../assets/avatar.png'
import { blobToBase64 } from '../../ultils/Common/toBase64';


const DetailPost = () => {

    const { CiLocationOn, TbReportMoney, RiCrop2Line, MdAccessTime, GoHash, FaPhoneAlt, SiZalo, RiHeartLine, RiHeartFill } = icons

    const { postId } = useParams()
    const dispatch = useDispatch()
    const { posts } = useSelector(state => state.post)

    useEffect(() => {
        postId && dispatch(getPostsLimit({ id: postId }))
    }, [postId])

    const formatTime = (createdAt) => {
        moment.locale('vi');
        return moment(createdAt).fromNow()
    }

    return (
        <div className='w-full flex gap-4'>
            <div className='w-[70%]'>
                <SliderCustom images={(posts && posts.length > 0 && posts[0]?.images) && JSON.parse(posts[0]?.images)} />
                <div className='w-full bg-white shadow-md rounded-md p-6'>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-2xl font-bold text-red-600'>{posts[0]?.name}</h2>
                        <div className=' flex items-center gap-2'>
                            <span>Chuyên mục:</span>
                            <span className='text-blue-600 underline font-medium hover:text-orange-600'>
                                <Link
                                    to={`/${posts[0]?.category?.name && formatVietnameseToString(posts[0]?.category?.name)}`}
                                    className='text-blue-600 font-medium hover:text-orange-600'
                                >{posts[0]?.category?.name}</Link>
                            </span>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <CiLocationOn />
                            <span>{posts[0]?.address}</span>
                        </div>
                        <div className='flex items-center justify-between'>
                            <span className='flex items-center gap-1'>
                                <TbReportMoney />
                                <span className='font-medium text-lg'>{posts[0]?.price} đồng/tháng</span>
                            </span>
                            <span className='flex items-center gap-1'>
                                <RiCrop2Line />
                                <span>{posts[0]?.area} m2</span>
                            </span >
                            <span className='flex items-center gap-1'>
                                <MdAccessTime />
                                <span>{formatTime(posts[0]?.created)}</span>
                            </span>
                            <span className='flex items-center gap-1'>
                                <GoHash />
                                <span>{posts[0]?.id}</span>
                            </span>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <h3 className='font-semibold text-xl my-4'>Thông tin mô tả</h3>
                        <div className='flex flex-col gap-3'>
                            {posts[0]?.description}
                        </div>
                    </div>
                    <div className='mt-8'>
                        <h3 className='font-semibold text-xl my-4'>Đặc điểm tin đăng</h3>
                        <table className='w-full'>
                            <tbody>
                                <tr className='w-full '>
                                    <td className="px-4 py-3">Mã tin</td>
                                    <td className="px-4 py-3">{posts[0]?.id}</td>
                                </tr>
                                <tr className='w-full bg-gray-200'>
                                    <td className="px-4 py-3">Khu vực</td>
                                    <td className="px-4 py-3">{posts[0]?.address}</td>
                                </tr>
                                <tr className='w-full '>
                                    <td className="px-4 py-3">Loại tin rao</td>
                                    <td className="px-4 py-3">{posts[0]?.category?.name}</td>
                                </tr>
                                <tr className='w-full bg-gray-200'>
                                    <td className="px-4 py-3">Đối tượng thuê</td>
                                    <td className="px-4 py-3">{posts[0]?.target}</td>
                                </tr>
                                <tr className='w-full '>
                                    <td className="px-4 py-3">Ngày đăng</td>
                                    <td className="px-4 py-3">{formatDate(posts[0]?.created)}</td>
                                </tr>
                                <tr className='w-full bg-gray-200'>
                                    <td className="px-4 py-3">Ngày hết hạn</td>
                                    <td className="px-4 py-3">{formatDate(posts[0]?.expired)}</td>
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
                                    <td className="px-4 py-3">{posts[0]?.user?.name}</td>
                                </tr>
                                <tr className='w-full bg-gray-200'>
                                    <td className="px-4 py-3">Điện thoại</td>
                                    <td className="px-4 py-3">{posts[0]?.user?.phone}</td>
                                </tr>
                                <tr className='w-full '>
                                    <td className="px-4 py-3">Zalo</td>
                                    <td className="px-4 py-3">{posts[0]?.user?.zalo}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='mt-8'>
                        <h3 className='font-semibold text-xl my-4'>Bản đồ</h3>
                        {posts && <MapWithSearch address={posts[0]?.address} />}
                    </div>
                </div>
            </div>
            <div className='w-[30%] flex flex-col gap-5'>
                <div className='w-full bg-yellow-500 rounded-md flex flex-col items-center p-4 gap-4'>
                    <img
                        className='w-16 h-16 object-contain rounded-full'
                        src={blobToBase64(posts[0]?.user?.avatar) || avatar}
                        alt='Ảnh đại diện'
                    />
                    <h3 className='font-bold text-xl'>{posts[0]?.user?.name}</h3>
                    <a
                        className='w-full text-white font-bold text-lg bg-green-600 py-2 flex items-center justify-center gap-2 rounded-md'
                        href={`tel:${posts[0]?.user.zalo}`}
                    >
                        <FaPhoneAlt />
                        {posts[0]?.user?.phone}
                    </a>
                    <a
                        className='w-full font-bold text-lg bg-white py-2 flex items-center justify-center gap-2 rounded-md'
                        href={`https://zalo.me/${posts[0]?.user.zalo}`}
                        target='_blank'
                    >
                        <SiZalo size={24} color='blue' />
                        {'Nhắn Zalo'}
                    </a>
                    <Button
                        text={'Yêu thích'}
                        bgColor={"bg-white text-lg font-bold"}
                        fullwidth
                        IcBefore={RiHeartLine}
                    />
                </div>
                <RelatedPost />
            </div>
        </div>
    )
}

export default DetailPost