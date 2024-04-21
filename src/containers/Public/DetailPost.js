import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsLimit } from '../../store/actions';
import { Slider } from '../../components';
import icons from '../../ultils/icons';
import { formatDate } from '../../ultils/Common/formatDate';

const DetailPost = () => {

    const { CiLocationOn, TbReportMoney, RiCrop2Line, MdAccessTime, GoHash } = icons

    const { postId } = useParams()
    const dispatch = useDispatch()
    const { posts } = useSelector(state => state.post)
    console.log(posts)

    useEffect(() => {
        postId && dispatch(getPostsLimit({ id: postId }))
    }, [postId])

    return (
        <div className='w-full flex gap-4'>
            <div className='w-[70%]'>
                <Slider images={posts && posts.length > 0 && posts[0]?.images && JSON.parse(posts[0]?.images)} />
                <div className='w-full bg-white shadow-md rounded-md p-6'>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-2xl font-bold text-red-600'>{posts[0]?.title}</h2>
                        <div className=' flex items-center gap-2'>
                            <span>Chuyên mục:</span>
                            <span className='text-blue-600 underline font-medium hover:text-orange-600'>{posts[0]?.overviews?.title}</span>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <CiLocationOn />
                            <span>{posts[0]?.address}</span>
                        </div>
                        <div className='flex items-center justify-between'>
                            <span className='flex items-center gap-1'>
                                <TbReportMoney />
                                <span className='font-medium text-lg'>{posts[0]?.attributes?.price}</span>
                            </span>
                            <span className='flex items-center gap-1'>
                                <RiCrop2Line />
                                <span>{posts[0]?.attributes?.acreage}</span>
                            </span >
                            <span className='flex items-center gap-1'>
                                <MdAccessTime />
                                <span>{posts[0]?.attributes?.published}</span>
                            </span>
                            <span className='flex items-center gap-1'>
                                <GoHash />
                                <span>{posts[0]?.attributes?.hashtag}</span>
                            </span>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <h3 className='font-semibold text-xl my-4'>Thông tin mô tả</h3>
                        {/* <div className='flex flex-col gap-3'>
                            {posts[0]?.description && posts[0]?.description?.map((item, index) => {
                                return (
                                    <span key={index}>{item}</span>
                                )
                            })}
                        </div> */}
                    </div>
                    <div className='mt-8'>
                        <h3 className='font-semibold text-xl my-4'>Đặc điểm tin đăng</h3>
                        <table className='w-full'>
                            <tbody>
                                <tr className='w-full '>
                                    <td className="px-4 py-3">Mã tin</td>
                                    <td className="px-4 py-3">{posts[0]?.overviews?.code}</td>
                                </tr>
                                <tr className='w-full bg-gray-200'>
                                    <td className="px-4 py-3">Khu vực</td>
                                    <td className="px-4 py-3">{posts[0]?.overviews?.title}</td>
                                </tr>
                                <tr className='w-full '>
                                    <td className="px-4 py-3">Loại tin rao</td>
                                    <td className="px-4 py-3">{posts[0]?.overviews?.type}</td>
                                </tr>
                                <tr className='w-full bg-gray-200'>
                                    <td className="px-4 py-3">Đối tượng thuê</td>
                                    <td className="px-4 py-3">{posts[0]?.overviews?.target}</td>
                                </tr>
                                <tr className='w-full '>
                                    <td className="px-4 py-3">Ngày đăng</td>
                                    <td className="px-4 py-3">{formatDate(posts[0]?.overviews?.created)}</td>
                                </tr>
                                <tr className='w-full bg-gray-200'>
                                    <td className="px-4 py-3">Ngày hết hạn</td>
                                    <td className="px-4 py-3">{formatDate(posts[0]?.overviews?.expired)}</td>
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

                    </div>
                </div>
            </div>
            <div className='w-[30%]'>
                content
            </div>
        </div>
    )
}

export default DetailPost