import React, { memo } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import icons from '../ultils/icons';

const notActive = 'w-[46px] h-[48px] flex justify-center items-center py-3 bg-white hover:bg-gray-300 rounded-md '
const active = 'w-[46px] h-[48px] flex justify-center items-center py-3 bg-[#E13427] text-white rounded-md '

const PageNumber = ({ text, currentPage, icon, setCurrentPage, type }) => {
    const navigate = useNavigate()

    const handlChangPage = () => {
        if (!(text === '...')) {
            setCurrentPage(+text)
            navigate({
                pathname: '/',
                search: createSearchParams({
                    page: text
                }).toString()
            })
        }
    }

    return (
        <div className={+text === +currentPage ? `${active}${text === '...' ? '' : 'cursor-pointer'}` : `${notActive}${text === '...' ? '' : 'cursor-pointer'}`}
            onClick={handlChangPage}
        >
            {icon || text}
        </div>
    )
}

export default memo(PageNumber)