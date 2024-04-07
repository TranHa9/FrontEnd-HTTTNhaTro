import React, { useEffect, useState } from 'react';
import { Modal, SearchItem } from '../../components';
import icons from '../../ultils/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, createSearchParams, useLocation } from 'react-router-dom';
import { path } from '../../ultils/constant';

const { BsChevronRight, CiLocationOn, TbReportMoney, RiCrop2Line, MdLocationCity, FiSearch } = icons

const Search = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isShowModal, setIsShowModal] = useState(false);
    const [content, setContent] = useState([]);
    const [name, setName] = useState('')
    const { provinces, areas, prices, categories } = useSelector(state => state.app)
    const [queries, setQueries] = useState({});
    const [arrMinMax, setArrMinMax] = useState({})
    const [defaultText, setDefaultText] = useState('');

    useEffect(() => {
        if (!location?.pathname.includes(path.SEARCH)) {
            setArrMinMax({})
            setQueries({})
        }
    }, [location])

    const handleShowModal = (content, name, defaultText) => {
        setContent(content)
        setName(name)
        setIsShowModal(true)
        setDefaultText(defaultText)
    }
    const handleSubmit = (e, query, arrMinMax) => {
        e.stopPropagation()
        setQueries(prev => ({ ...prev, ...query }))
        setIsShowModal(false)
        arrMinMax && setArrMinMax(prev => ({ ...prev, ...arrMinMax }))
    }

    const handleSearch = () => {
        const queryCodes = Object.entries(queries).filter(item => item[0].includes('Number') || item[0].includes('Code')).filter(item => item[1])
        let queryCodesObj = {}
        queryCodes.forEach(item => { queryCodesObj[item[0]] = item[1] })
        const queryText = Object.entries(queries).filter(item => !item[0].includes('Code') || !item[0].includes('Number'))
        let queryTextObj = {}
        queryText.forEach(item => { queryTextObj[item[0]] = item[1] })
        let titleSearch = `${queryTextObj.category
            ? queryTextObj.category
            : 'Cho thuê tất cả'} ${queryTextObj.province
                ? `tỉnh ${queryTextObj.province}`
                : ''} ${queryTextObj.price
                    ? `giá ${queryTextObj.price}`
                    : ''} ${queryTextObj.area
                        ? `diện tích ${queryTextObj.area}` : ''} `
        navigate({
            pathname: path.SEARCH,
            search: createSearchParams(queryCodesObj).toString(),
        }, { state: { titleSearch } })
    }
    return (
        <>
            <div className='w-3/4 my-3 p-[10px] bg-secondary3 rounded-lg flex-col lg:flex-row flex gap-2 items-center justify-around'>
                <span onClick={() => handleShowModal(categories, 'category', 'Tìm tất cả')} className='cursor-pointer flex-1'>
                    <SearchItem IconBefore={<MdLocationCity />} fontWeight IconAfter={<BsChevronRight color='#777' />} text={queries.category} defaultText={'Tìm tất cả'} />
                </span>
                <span onClick={() => handleShowModal(provinces, 'province', 'Toàn quốc')} className='cursor-pointer flex-1'>
                    <SearchItem IconBefore={<CiLocationOn />} IconAfter={<BsChevronRight color='#777' />} text={queries.province} defaultText={'Toàn quốc'} />
                </span>
                <span onClick={() => handleShowModal(prices, 'price', 'Chọn giá')} className='cursor-pointer flex-1'>
                    <SearchItem IconBefore={<TbReportMoney />} IconAfter={<BsChevronRight color='#777' />} text={queries.price} defaultText={'Chọn giá'} />
                </span>
                <span onClick={() => handleShowModal(areas, 'area', 'Chọn diện tích')} className='cursor-pointer flex-1'>
                    <SearchItem IconBefore={<RiCrop2Line />} IconAfter={<BsChevronRight color='#777' />} text={queries.area} defaultText={'Chọn diện tích'} />
                </span>
                <button
                    type='button'
                    onClick={handleSearch}
                    className='outline-none py-2 px4 flex-1 bg-secondary1 text-sm rounded-lg flex items-center justify-center gap-2 text-white font-medium'
                >
                    <FiSearch />
                    Tìm kiếm
                </button>
            </div>
            {isShowModal && <Modal
                handleSubmit={handleSubmit}
                queries={queries}
                arrMinMax={arrMinMax}
                content={content}
                name={name}
                setIsShowModal={setIsShowModal}
                defaultText={defaultText}
            />}
        </>
    )
}

export default Search