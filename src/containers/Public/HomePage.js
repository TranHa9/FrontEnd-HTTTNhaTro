import React from 'react'
import { text } from '../../ultils/constant'
import { Province, ItemSidebar, RelatedPost } from '../../components'
import { List, Pagination } from './index';
import { useSelector } from 'react-redux';
import { dataAreas, dataPrices } from '../../ultils/data';

const HomePage = () => {
    const { categories } = useSelector(state => state.app)
    return (
        <div className='flex flex-col gap-3'>
            <div className='w-full flex gap-4 mt-2'>
                <div className='w-[70%]'>
                    <List />
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

export default HomePage