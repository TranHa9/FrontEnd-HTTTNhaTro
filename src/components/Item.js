import React, { memo, useEffect, useState } from 'react'
import icons from '../ultils/icons';
import { Link } from 'react-router-dom';
import { formatVietnameseToString } from '../ultils/Common/formatVietnameseToString';
import { path } from '../ultils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { apiDeleteSavePost, apiaddSavePost } from '../services';
import Swal from 'sweetalert2';
import { getSavePostsLimit } from '../store/actions';

const { RiHeartLine, RiHeartFill } = icons

const Item = ({ images, user, name, description, address, area, price, id }) => {
    const { currentData } = useSelector(state => state.user)
    const [isSaved, setIsSaved] = useState(false);
    const { savePosts } = useSelector(state => state.post)
    const dispatch = useDispatch()

    useEffect(() => {
        const isPostSaved = savePosts.some(item => item.postId === id);
        setIsSaved(isPostSaved);
    }, [savePosts]);

    const handleAddSavePost = async (postId) => {
        try {
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
        } catch (error) {
            console.error("lỗi lưu bài đăng:", error);
            Swal.fire("Thông báo", "Đã xảy ra lỗi", 'error');
        }
    }

    const handleDeleteSavedPost = async (savePostId) => {
        try {
            const response = await apiDeleteSavePost(savePostId);
            if (response?.data.err === 0) {
                dispatch(getSavePostsLimit())
                setIsSaved(false);
                Swal.fire("Thông báo", "Đã xóa bài đã lưu", "success");
            } else {
                Swal.fire("Thông báo", "Đã có lỗi", 'error');
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
                <span className=' absolute right-5 bottom-1'
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
                        {name}
                    </Link>
                </div>
                <div className='py-2 flex items-center justify-between gap-2'>
                    <span className='font-bold flex-3 text-green-600 truncate'>{price} đồng/tháng</span>
                    <span className='flex-1 truncate'>{area} m2</span>
                    <span className='flex-3 truncate'>
                        {`${address.split(',')[address.split(',').length - 2]}${address.split(',')[address.split(',').length - 1]}`}
                    </span>
                </div>
                <p className='text-gray-500 w-full h-[70px] overflow-hidden text-ellipsis'>{description}</p>
                <div className='flex items-center justify-between my-7'>
                    <div className='flex items-center'>
                        <img src='https://i.pinimg.com/736x/b7/91/44/b79144e03dc4996ce319ff59118caf65.jpg' alt='avatar' className='w-[30px] h-[30px] 
                        object-cover rounded-full' />
                        <p>{user?.name}</p>
                    </div>
                    <div className='flex items-center gap-1'>
                        <a
                            className='bg-blue-700 text-white p-1 rounded-md'
                            href={`tel:${user?.zalo}`}
                        >
                            {`Gọi ${user?.phone}`}
                        </a>
                        <a
                            className='text-blue-700 px-1 rounded-md border border-blue-700'
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