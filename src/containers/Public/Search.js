import React, { useState } from 'react';
import { Modal, SearchItem } from '../../components';
import icons from '../../ultils/icons';
import { useSelector } from 'react-redux';

const { BsChevronRight, CiLocationOn, TbReportMoney, RiCrop2Line, MdLocationCity, FiSearch } = icons

const Search = () => {

    const [isShowModal, setIsShowModal] = useState(false);
    const [content, setContent] = useState([]);
    const [name, setName] = useState('')
    const { provinces, areas, prices, categories } = useSelector(state => state.app)

    const handleShowModal = (content, name) => {
        setContent(content)
        setName(name)
        setIsShowModal(true)
    }

    return (
        <>
            <div className='w-3/4 my-3 p-[10px] bg-secondary3 rounded-lg flex-col lg:flex-row flex gap-2 items-center justify-around'>
                <span onClick={() => handleShowModal(categories, 'category')} className='cursor-pointer flex-1'>
                    <SearchItem IconBefore={<MdLocationCity />} fontWeight IconAfter={<BsChevronRight color='#777' />} text='Phòng trọ, nhà trọ' />
                </span>
                <span onClick={() => handleShowModal(provinces, 'province')} className='cursor-pointer flex-1'>
                    <SearchItem IconBefore={<CiLocationOn />} IconAfter={<BsChevronRight color='#777' />} text='Toàn quốc' />
                </span>
                <span onClick={() => handleShowModal(prices, 'price')} className='cursor-pointer flex-1'>
                    <SearchItem IconBefore={<TbReportMoney />} IconAfter={<BsChevronRight color='#777' />} text='Chọn giá' />
                </span>
                <span onClick={() => handleShowModal(areas, 'area')} className='cursor-pointer flex-1'>
                    <SearchItem IconBefore={<RiCrop2Line />} IconAfter={<BsChevronRight color='#777' />} text='Chọn diện tích' />
                </span>
                <button
                    type='button'
                    className='outline-none py-2 px4 flex-1 bg-secondary1 text-sm rounded-lg flex items-center justify-center gap-2 text-white font-medium'
                >
                    <FiSearch />
                    Tìm kiếm
                </button>
            </div>
            {isShowModal && <Modal content={content} name={name} setIsShowModal={setIsShowModal} />}
        </>
    )
}

export default Search