import React, { memo } from 'react';
import icons from '../ultils/icons';
import { formatVietnameseToString } from '../ultils/Common/formatVietnameseToString';
import { Link } from 'react-router-dom';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';

const { GrNext } = icons

const ItemSidebar = ({ content, title, isDouble, type }) => {

    //const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()


    const formatContent = () => {
        const oddEl = content?.filter((item, index) => index % 2 !== 0)
        const evenEl = content?.filter((item, index) => index % 2 === 0)
        const formatContent = oddEl?.map((item, index) => {
            return {
                right: item,
                left: evenEl?.find((item2, index2) => index2 === index)
            }
        })
        return formatContent
    }
    const handleFilterPosts = (data) => {
        let min = 0;
        let max = 0
        if (data.min !== 0 && data.type === "price") {
            min = data.min * 1000000
        } else {
            min = data.min
        }
        if (data.type === "price") {
            max = data.max * 1000000
        } else {
            max = data.max
        }
        navigate({
            pathname: location?.pathname,
            search: createSearchParams({
                [`${type}`]: [min, max],
            }).toString()
        });
    }


    return (
        <div className='w-full p-4 rounded-md bg-white'>
            <h3 className='text-lg font-semibold mb-4'>{title}</h3>
            {!isDouble && <div className='flex flex-col gap-2'>
                {content?.length > 0 && content.map(item => {
                    return (
                        <Link
                            to={`${formatVietnameseToString(item.name)}`}
                            key={item.id}
                            className='flex gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-dashed border-gray-200 pb-1'>
                            <GrNext size={10} color='#C5C5C5' />
                            <p>{item.name}</p>
                        </Link>
                    )
                })}
            </div>}
            {isDouble && <div className='flex flex-col gap-2'>
                {content?.length > 0 && formatContent(content).map((item, index) => {
                    return (
                        <div key={index} className=''>
                            <div className='flex items-center justify-around'>
                                <div className='flex flex-1 gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-dashed border-gray-200 pb-1'
                                    onClick={() => handleFilterPosts(item.left)}
                                >
                                    <GrNext size={10} color='#C5C5C5' />
                                    <p>{item.left.value}</p>
                                </div>
                                <div
                                    className='flex flex-1 gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-dashed border-gray-200 pb-1'
                                    onClick={() => handleFilterPosts(item.right)}
                                >
                                    <GrNext size={10} color='#C5C5C5' />
                                    <p>{item.right.value}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>}
        </div>
    )
}

export default memo(ItemSidebar)