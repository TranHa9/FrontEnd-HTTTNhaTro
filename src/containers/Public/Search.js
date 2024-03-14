import React from 'react';
import { SearchItem } from '../../components';
import icons from '../../ultils/icons';

const { BsChevronRight, CiLocationOn, TbReportMoney, RiCrop2Line, MdLocationCity, FiSearch } = icons

const Search = () => {
    return (
        <div className='w-3/4 my-3 p-[10px] bg-secondary3 rounded-lg flex-col lg:flex-row flex gap-2 items-center justify-around'>
            <SearchItem IconBefore={<MdLocationCity />} fontWeight IconAfter={<BsChevronRight color='#777' />} text='Phòng trọ, nhà trọ' />
            <SearchItem IconBefore={<CiLocationOn />} IconAfter={<BsChevronRight color='#777' />} text='Toàn quốc' />
            <SearchItem IconBefore={<TbReportMoney />} IconAfter={<BsChevronRight color='#777' />} text='Chọn giá' />
            <SearchItem IconBefore={<RiCrop2Line />} IconAfter={<BsChevronRight color='#777' />} text='Chọn diện tích' />
            <button
                type='button'
                className='outline-none py-2 px4 w-full bg-secondary1 text-sm rounded-lg flex items-center justify-center gap-2 text-white font-medium'
            >
                <FiSearch />
                Tìm kiếm
            </button>
        </div>
    )
}

export default Search