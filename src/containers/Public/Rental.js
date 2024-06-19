import React, { useEffect, useState } from 'react';
import { Province, ItemSidebar, RelatedPost } from '../../components'
import { List, Pagination } from './index';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { formatVietnameseToString } from '../../ultils/Common/formatVietnameseToString';
import { dataAreas, dataPrices } from '../../ultils/data';

const Rentail = () => {
    const { categories } = useSelector(state => state.app);
    const [categoryCurrent, setCategoryCurrent] = useState('')
    const [categoryId, setCategoryId] = useState('none');
    const location = useLocation()

    useEffect(() => {
        const category = categories?.find(item => `/${formatVietnameseToString(item.name)}` === location.pathname)
        setCategoryCurrent(category)
        if (category) {
            setCategoryId(category.id)
        }
    }, [location])

    return (
        <div className='flex flex-col gap-3'>
            <div>
                <h1 className='text-[28px] font-bold'>{categoryCurrent?.title}</h1>
                <p className='text-sm text-gray-700'>{categoryCurrent?.description}</p>
            </div>
            <div className='w-full flex gap-4'>
                <div className='w-[70%]'>
                    <List categoryId={categoryId} />
                    <Pagination />
                </div>
                <div className='w-[30%] flex flex-col gap-4 justify-start items-center'>
                    <ItemSidebar content={categories} title='Danh sách cho thuê' />
                    <ItemSidebar isDouble={true} type='price' content={dataPrices} title='Xem theo giá' />
                    <ItemSidebar isDouble={true} type='area' content={dataAreas} title='Xem theo diện tích' />
                    <RelatedPost />
                </div>
            </div>
        </div>
    )
}

export default Rentail