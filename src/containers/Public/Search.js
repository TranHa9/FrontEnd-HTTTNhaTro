import React, { useEffect, useState } from 'react';
import { Address, Modal, SearchItem } from '../../components';
import icons from '../../ultils/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, createSearchParams, useLocation } from 'react-router-dom';
import { path } from '../../ultils/constant';
import { dataAreas, dataPrices } from '../../ultils/data';
import { apiGetPublicDistrict, apiGetPublicProvince, apiGetPublicWard } from '../../services';
import bg from '../../assets/bg.png'

const { BsChevronRight, CiLocationOn, TbReportMoney, RiCrop2Line, MdLocationCity, FiSearch } = icons

const Search = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isShowModal, setIsShowModal] = useState(false);
    const [content, setContent] = useState([]);
    const [name, setName] = useState('')
    const { categories } = useSelector(state => state.app)
    const [queries, setQueries] = useState({});
    const [arrMinMax, setArrMinMax] = useState({})
    const [defaultText, setDefaultText] = useState('');
    const [provinces, setProvinces] = useState([]);

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
        const queryCodes = Object.entries(queries).filter(([key, value]) => (key.includes('Id') || key === 'price' || key === 'area') && value);
        let queryCodesObj = {}
        queryCodes.forEach(item => { queryCodesObj[item[0]] = item[1] })
        const queryText = Object.entries(queries).filter(item => !item[0].includes('Id') || !item[0].includes('Number'))
        let queryTextObj = {}
        queryText.forEach(item => { queryTextObj[item[0]] = item[1] })
        let titleSearch = `${queryTextObj.category
            ? queryTextObj.category
            : 'Cho thuê tất cả'}${queryTextObj.address
                ? `, Khu vực ${queryTextObj.address}`
                : ''} ${queryTextObj.price
                    ? `giá từ ${queryTextObj.price[0]} đồng đến ${queryTextObj.price[1]} đồng`
                    : ''}${queryTextObj.area
                        ? `, diện tích từ ${queryTextObj.area[0]} m2 đến ${queryTextObj.area[1]} m2` : ''} `
        navigate({
            pathname: path.SEARCH,
            search: createSearchParams(queryCodesObj).toString(),
        }, { state: { titleSearch } })
    }
    return (
        <div className='w-full flex flex-col items-center justify-center relative'>
            <div className='w-full'>
                <img
                    src={bg}
                    alt='backgound'
                />
            </div>

            <div className='w-3/4 my-3 p-[15px] bg-black bg-opacity-40 rounded-lg flex-col lg:flex-row flex gap-2 items-center justify-around absolute top-3'>
                <span onClick={() => handleShowModal(categories, 'category', 'Tìm tất cả')} className='cursor-pointer flex-1'>
                    <SearchItem IconBefore={<MdLocationCity />} fontWeight IconAfter={<BsChevronRight color='#777' />} text={queries.category} defaultText={'Tìm tất cả'} />
                </span>
                <span onClick={() => handleShowModal(provinces, 'province', 'Toàn quốc')} className='cursor-pointer flex-1'>
                    <SearchItem IconBefore={<CiLocationOn />} IconAfter={<BsChevronRight color='#777' />} text={queries.address} defaultText={'Toàn quốc'} />
                </span>
                <span onClick={() => handleShowModal(dataPrices, 'price', 'Chọn giá')} className='cursor-pointer flex-1'>
                    <SearchItem IconBefore={<TbReportMoney />} IconAfter={<BsChevronRight color='#777' />} text={queries.priceNumber} defaultText={'Chọn giá'} />
                </span>
                <span onClick={() => handleShowModal(dataAreas, 'area', 'Chọn diện tích')} className='cursor-pointer flex-1'>
                    <SearchItem IconBefore={<RiCrop2Line />} IconAfter={<BsChevronRight color='#777' />} text={queries.areaNumber} defaultText={'Chọn diện tích'} />
                </span>
                <button
                    type='button'
                    onClick={handleSearch}
                    className='outline-none py-2 px4 flex-1 bg-redcover text-sm rounded-lg flex items-center justify-center gap-2 text-white font-medium'
                >
                    <FiSearch />
                    Tìm kiếm
                </button>
                <div className='absolute top-[100px] left-0 w-[50%]'>
                    <h1 className='text-[30px] font-bold text-white'>Thông tin phòng trọ</h1>
                    <p className='text-lg text-white'>Đăng ký ngày hôm này! Miễn phí cho đăng tin cho thuê nhà chọ, phòng trọ,...</p>
                </div>
            </div>
            {isShowModal && <Modal
                handleSubmit={handleSubmit}
                queries={queries}
                setQueries={setQueries}
                arrMinMax={arrMinMax}
                content={content}
                setContent={setContent}
                name={name}
                setName={setName}
                setIsShowModal={setIsShowModal}
                defaultText={defaultText}
            />}
        </div>
    )
}

export default Search