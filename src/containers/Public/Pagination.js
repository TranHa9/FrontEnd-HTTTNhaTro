import React, { useState, useEffect } from 'react';
import { PageNumber } from '../../components';
import { useSelector } from 'react-redux';
import icons from '../../ultils/icons';
import { useSearchParams } from 'react-router-dom';

const { GrLinkNext } = icons;

const Pagination = ({ type, typeUser, typeAll, typeConfirm, typeCategory }) => {
    const { count, posts, postOfCurrent, postCount, postAll, countAll, postsStatus, countStatus } = useSelector(state => state.post);
    const { users, countUser } = useSelector(state => state.user)
    const { categories, countCategory } = useSelector(state => state.app)
    const [arrPage, setArrPage] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [isHideEnd, setIsHideEnd] = useState(false)
    const [isHideStart, setIsHideStart] = useState(false)
    const [searchParams] = useSearchParams()

    // Chọn dữ liệu hiển thị dựa trên các type props truyền vào
    const postsCover = type ? postOfCurrent : typeUser ? users : typeAll ? postAll : typeConfirm ? postsStatus : typeCategory ? categories : posts
    const countCover = type ? postCount : typeUser ? countUser : typeAll ? countAll : typeConfirm ? countStatus : typeCategory ? countCategory : count

    useEffect(() => {
        // Lấy số trang từ URL
        let page = searchParams.get('page')
        // Nếu số trang trong URL khác trang hiện tại thì cập nhật trang hiện tại
        page && +page !== currentPage && setCurrentPage(+page)
        // Nếu không có số trang trong URL thì đặt trang hiện tại là 1
        !page && setCurrentPage(1)
    }, [searchParams])

    useEffect(() => {
        // Tính toán số trang tối đa
        let maxPage = Math.ceil(countCover / process.env.REACT_APP_LIMIT_POSTS)
        // Tính toán trang kết thúc và trang bắt đầu để hiển thị
        let end = (currentPage + 2) > maxPage ? maxPage : (currentPage + 2)
        let start = (currentPage - 2) <= 1 ? 1 : (currentPage - 2)
        let temp = []
        // Tạo mảng các số trang sẽ hiển thị
        for (let i = start; i <= end; i++) temp.push(i)
        setArrPage(temp)
        // Kiểm soát việc ẩn/hiện nút cuối cùng và đầu tiên
        currentPage >= (maxPage - 2) ? setIsHideEnd(true) : setIsHideEnd(false)
        currentPage <= 3 ? setIsHideStart(true) : setIsHideStart(false)
    }, [countCover, postsCover, currentPage])

    return (
        <div className='flex items-center justify-center gap-2 py-5'>
            {!isHideStart && <PageNumber setCurrentPage={setCurrentPage} text={1} />}
            {(!isHideStart && currentPage !== 4) && <PageNumber text={'...'} />}
            {arrPage.length > 0 && arrPage.map(item => {
                return (
                    <PageNumber
                        key={item}
                        text={item}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                )
            })}
            {!isHideEnd && <PageNumber text={'...'} />}
            {!isHideEnd && <PageNumber icon={<GrLinkNext />} setCurrentPage={setCurrentPage} text={Math.ceil(countCover / postsCover.length)} />}
        </div>
    )
}

export default Pagination