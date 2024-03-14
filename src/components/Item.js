import React, { memo } from 'react'
import icons from '../ultils/icons'

const images = [
    "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2024/02/19/so-nha_1708295903.jpg",
    "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2024/02/19/untitled_1708295881.png",
    "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2024/02/19/1_1708295901.jpg",
    "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2024/02/19/2_1708295901.jpg",
]

const { GrStar, RiHeartLine, RiHeartFill, BsBookmarkStarFill } = icons

const Item = () => {
    return (
        <div className='w-full flex border-t border-orange-600'>
            <div className='w-2/5 flex flex-wrap gap-[2px] items-center'>
                <img src={images[0]} alt='perview' className='w-[140px] h-[120px] object-cover' />
                <img src={images[1]} alt='perview' className='w-[140px] h-[120px] object-cover' />
                <img src={images[2]} alt='perview' className='w-[140px] h-[120px] object-cover' />
                <img src={images[3]} alt='perview' className='w-[140px] h-[120px] object-cover' />
            </div>
            <div className='w-3/5'>
                <div className='flex justify-between gap-4 w-full'>
                    <div className='text-red-600 font-medium'>
                        <GrStar className='star-item' size={18} color='yellow' />
                        <GrStar className='star-item' size={18} color='yellow' />
                        <GrStar className='star-item' size={18} color='yellow' />
                        <GrStar className='star-item' size={18} color='yellow' />
                        <GrStar className='star-item' size={18} color='yellow' />
                        CHO THUÊ NHÀ TRỌ GIẢ RẺ TIỆN NGHI
                    </div>
                    <div className='w-[10%] flex justify-end'>
                        <BsBookmarkStarFill size={24} color='orange' />
                    </div>
                </div>
                <div className='py-2 flex items-center justify-between'>
                    <span className='font-bold text-green-600'>2.5 triệu/tháng</span>
                    <span>25m²</span>
                    <span>Gia Lâm - Hà Nội</span>
                </div>
                <p className='text-gray-500'>
                    Còn 3 phòng trọ cho thuê, không gian thoáng mát, tiện nghi không thiếu gì, có chỗ để xe, ô tô.Diện tích 30m2 thông thoáng.Nội thất đầy đủ: giường, tủ,…
                </p>
                <div className='flex items-center my-3 justify-between'>
                    <div className='flex items-center'>
                        <img src='https://i.pinimg.com/736x/b7/91/44/b79144e03dc4996ce319ff59118caf65.jpg' alt='avatar' className='w-[30px] h-[30px] 
                        object-cover rounded-full' />
                        <p>Tuệ Thu</p>
                    </div>
                    <div className='flex items-center gap-1'>
                        <button
                            type='button'
                            className='bg-blue-700 text-white p-1 rounded-md'
                        >Gọi 1234567890
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