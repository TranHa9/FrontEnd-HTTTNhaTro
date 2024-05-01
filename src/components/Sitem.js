import React, { memo } from 'react';
import moment from 'moment';
import 'moment/locale/vi';
import { Link } from 'react-router-dom';
import { formatVietnameseToString } from '../ultils/Common/formatVietnameseToString';
import { path } from '../ultils/constant';

const Sitem = ({ title, price, image, createdAt, id }) => {
    const formatTime = (createdAt) => {
        moment.locale('vi');
        return moment(createdAt).fromNow()
    }
    return (
        <Link to={`${path.DETAIL}${formatVietnameseToString(title.replaceAll('/', '-'))}/${id}`} className='w-full flex items-center gap-2 py-2 border-b border-gray-300'>
            <img
                src={image[0]}
                alt="anh"
                className='w-[65px] h-[65px] object-cover flex-none rounded-md'
            />
            <div className='w-full flex-auto flex flex-col justify-between gap-3'>
                <div class="overflow-hidden">
                    <h1 class="text-[#E03C31]" style={{ lineHeight: '1.5em', WebkitLineClamp: 1, display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
                        {title}
                    </h1>
                </div>
                <div className=' flex items-center justify-between w-full'>
                    <span className='text-sm font-medium text-green-500'>{price}</span>
                    <span className='text-sm text-gray-400'>{formatTime(createdAt)}</span>
                </div>
            </div>
        </Link>
    )
}

export default memo(Sitem)