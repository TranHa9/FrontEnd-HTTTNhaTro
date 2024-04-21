import React, { memo, useState } from 'react'
import icons from '../ultils/icons';
import { Link } from 'react-router-dom';
import { formatVietnameseToString } from '../ultils/Common/formatVietnameseToString';
import { path } from '../ultils/constant';

const indexs = [0, 1, 2, 3]

const { GrStar, RiHeartLine, RiHeartFill, BsBookmarkStarFill } = icons

const Item = ({ images, user, name, star, description, address, area, price, id }) => {
    const [isHoverHeart, setIsHoverHeart] = useState(false)

    const handleStar = (star) => {
        let stars = []
        for (let i = 1; i <= +star; i++) {
            stars.push(<GrStar className='star-item' size={18} color='yellow' />)
        }
        return stars
    }
    return (
        <div className='w-full flex border-t border-orange-600 py-4'>
            <Link to={`${path.DETAIL}${formatVietnameseToString(name.replaceAll('/', '-'))}/${id}`} className='w-2/5 flex flex-wrap gap-[2px] items-center relative cursor-pointer'>
                {images.length > 0 && images.filter((i, index) => indexs.some(i => i === index))?.map((i, index) => {
                    return (
                        <img key={index} src={i} alt='perview' className='w-[48%] h-[122px] object-cover' />
                    )
                })}
                <span className='bg-overlay-50 text-white px-2 rounded-md absolute left-1 bottom-4'>{`${images.length} ảnh`}</span>
                <span className=' absolute right-5 bottom-1'
                    onMouseEnter={() => setIsHoverHeart(true)}
                    onMouseLeave={() => setIsHoverHeart(false)}
                >
                    {isHoverHeart ? <RiHeartFill size={24} color='red' /> : <RiHeartLine size={24} color='white' />}
                </span>
            </Link>
            <div className='w-3/5'>
                <div className='flex justify-between gap-4 w-full'>
                    <Link to={`${path.DETAIL}${formatVietnameseToString(name.replaceAll('/', '-'))}/${id}`} className='text-red-600 font-medium'>
                        {handleStar(+star).length > 0 && handleStar(+star).map((star, number) => {
                            return (
                                <span key={number}>{star}</span>
                            )
                        })}
                        {name}
                    </Link>
                    <div className='w-[10%] flex justify-end'>
                        <BsBookmarkStarFill size={24} color='orange' />
                    </div>
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
                        <button
                            type='button'
                            className='bg-blue-700 text-white p-1 rounded-md'
                        >
                            {`Gọi ${user?.phone}`}
                        </button>
                        <button
                            type='button'
                            className='text-blue-700 px-1 rounded-md border border-blue-700'
                        >
                            Nhắn Zalo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Item)