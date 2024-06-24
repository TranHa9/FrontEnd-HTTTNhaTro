import React, { memo, useCallback, useEffect, useState } from 'react'
import icons from '../ultils/icons';
import { Link, unstable_HistoryRouter, useNavigate } from 'react-router-dom';
import { formatVietnameseToString } from '../ultils/Common/formatVietnameseToString';
import { path } from '../ultils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { apiDeleteSavePost, apiaddSavePost } from '../services';
import Swal from 'sweetalert2';
import { getSavePostsLimit } from '../store/actions';
import avatar from "../assets/avatar.png"
import { blobToBase64 } from '../ultils/Common/toBase64';

const { RiHeartLine, RiHeartFill } = icons

const Item = ({ images, user, name, description, address, area, price, id, status }) => {
    const { currentData } = useSelector(state => state.user)
    const [isSaved, setIsSaved] = useState(false);
    const { savePosts } = useSelector(state => state.post)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoggedIn } = useSelector(state => state.auth)

    useEffect(() => {
        const isPostSaved = savePosts.some(item => item.postId === id);
        setIsSaved(isPostSaved);
    }, [savePosts]);

    const goLogin = useCallback((flag) => {
        //navigate(path.LOGIN, { state: { flag } })
        window.location.href = '/login';
    }, [])

    const handleAddSavePost = async (postId) => {
        try {
            if (isLoggedIn) {
                const userId = currentData.id;
                const response = await apiaddSavePost({ postId, userId })
                if (response?.data.err === 0) {
                    dispatch(getSavePostsLimit())
                    setIsSaved(true);
                    Swal.fire("Thông báo", "Đã lưu đăng", "success")
                }
                else {
                    Swal.fire("Thông báo", "Đã có lỗi", 'error')
                }
            } else {
                goLogin(false)
            }
        } catch (error) {
            console.error("lỗi lưu bài đăng:", error);
            Swal.fire("Thông báo", "Đã xảy ra lỗi", 'error');
        }
    }

    const handleDeleteSavedPost = async (savePostId) => {
        try {
            if (isLoggedIn) {
                const response = await apiDeleteSavePost(savePostId);
                if (response?.data.err === 0) {
                    dispatch(getSavePostsLimit())
                    setIsSaved(false);
                    Swal.fire("Thông báo", "Đã xóa bài đã lưu", "success");
                } else {
                    Swal.fire("Thông báo", "Đã có lỗi", 'error');
                }
            } else {
                goLogin(false)
            }
        } catch (error) {
            console.error("Error deleting saved post:", error);
            Swal.fire("Thông báo", "Đã xảy ra lỗi", 'error');
        }
    };

    return (
        <div className='w-full flex border-t border-orange-600 py-4'>
            <div className='w-2/5 flex flex-wrap gap-[2px] items-center relative cursor-pointer'>
                <Link to={`${path.DETAIL}${formatVietnameseToString(name.replaceAll('/', '-'))}/${id}`} className='w-full'>
                    {images.length > 0 &&
                        <img src={images[0]} alt='perview' className='w-[95%] h-[250px] object-cover' />
                    }
                    <span className='bg-overlay-50 text-white px-2 rounded-md absolute left-1 bottom-4'>{`${images.length} ảnh`}</span>
                </Link>
                <span className='bg-overlay-30 rounded-md absolute right-5 bottom-4'
                >
                    <span
                        onClick={() => {
                            if (isSaved) {
                                handleDeleteSavedPost(id);
                            } else {
                                handleAddSavePost(id);
                            }
                        }}
                    >
                        {isSaved ? <RiHeartFill size={24} color='red' /> : <RiHeartLine size={24} color='white' />}
                    </span>
                </span>
            </div>
            <div className='w-3/5'>
                <div className='flex justify-between gap-4 w-full'>
                    <Link to={`${path.DETAIL}${formatVietnameseToString(name.replaceAll('/', '-'))}/${id}`} className='text-red-600 font-bold text-lg'>
                        {`${name} ${status === 'Hết phòng' ? '(Đã hết phòng)' : ''}`}
                    </Link>
                </div>
                <div className='py-2 flex items-center justify-between gap-2'>
                    <span className='font-bold flex-3 text-green-600 truncate'>{price} đồng/tháng</span>
                    <span className='flex-1 truncate'>{area} m2</span>
                    <span className='flex-3 truncate'>
                        {`${address.split(',')[address.split(',').length - 2]}${address.split(',')[address.split(',').length - 1]}`}
                    </span>
                </div>
                <div className="max-h-[200px] overflow-hidden">
                    <p className="text-gray-500" style={{ lineHeight: '1.5em', WebkitLineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
                        {description}
                    </p>
                </div>
                <div className='flex items-center justify-between my-7'>
                    <div className='flex items-center gap-2'>
                        <img
                            src={blobToBase64(user.avatar) || avatar} alt='avatar'
                            className='w-[30px] h-[30px] object-cover rounded-full'
                        />
                        <p>{user?.name}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <a
                            className='bg-redcover text-white p-1 rounded-md'
                            href={`tel:${user?.zalo}`}
                        >
                            {`Gọi ${user?.phone}`}
                        </a>
                        <a
                            className='text-[#E03C31] p-1 rounded-md border border-[#E03C31]'
                            href={`https://zalo.me/${user?.zalo}`}
                            target='_blank'
                        >
                            Nhắn Zalo
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Item)