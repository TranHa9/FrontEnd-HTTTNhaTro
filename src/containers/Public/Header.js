import React, { useCallback, useEffect, useRef, useState } from "react";
import logo from '../../assets/logo.png';
import { Button, PostSave, User } from '../../components';
import icons from "../../ultils/icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { path } from "../../ultils/constant";
import { useSelector, useDispatch } from "react-redux";
import * as action from '../../store/actions';
import { menuManage } from "../../ultils/menuManage";


const { AiOutlinePlusCircle, MdLogout, IoIosArrowDown, RiHeartLine } = icons

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchParam] = useSearchParams()
    const headerRef = useRef()
    const { isLoggedIn } = useSelector(state => state.auth)
    const [isShowMenu, setIsShowMenu] = useState(false)
    const { savePosts, countSavePost } = useSelector(state => state.post)

    const goLogin = useCallback((flag) => {
        navigate(path.LOGIN, { state: { flag } })
    }, [])


    useEffect(() => {
        headerRef.current.scrollIntoView({ block: 'start' })
    }, [searchParam.get('page')])

    return (
        <div ref={headerRef} className="w-3/4">
            <div className="w-full flex items-center justify-between">
                <Link to={'/'}>
                    <img
                        src={logo}
                        alt="logo"
                        className="w-[240px] h-[70px] object-contain"
                    />
                </Link>
                <div className="flex items-center gap-1">
                    {!isLoggedIn && <div className="flex items-center gap-1">
                        <small>Xin Chào !</small>
                        <Button text={'Đăng nhập'} textColor='text-white' bgColor='bg-[#3961fb]'
                            onClick={() => goLogin(false)}
                        />
                        <Button text={'Đăng ký'} textColor='text-white' bgColor='bg-[#3961fb]'
                            onClick={() => goLogin(true)}
                        />
                    </div>}
                    {isLoggedIn && <div className="flex items-center gap-3 relative">
                        <User />
                        <Link to={'/tin-da-luu'}>
                            <div className='flex items-center justify-center gap-1'>
                                <RiHeartLine size={24} />
                                <div className='flex items-center gap-1'>
                                    <span className='text-red-500'>{`(${countSavePost})`}</span>
                                    <span>Yêu thích</span>
                                </div>
                            </div>
                        </Link>
                        <Button
                            text={'Quản lý tài khoản'}
                            textColor='text-white'
                            bgColor='bg-blue-700'
                            IcAfter={IoIosArrowDown}
                            px='px-4'
                            onClick={() => setIsShowMenu(prev => !prev)}
                        />
                        {isShowMenu &&
                            <div className="absolute min-w-200 top-full right-0 bg-white shadow-md rounded-md p-4 flex flex-col">
                                {menuManage.map(item => {
                                    return (
                                        <Link
                                            className="flex items-center gap-3 hover:text-orange-500 text-blue-600 border-b border-gray-200 py-2"
                                            key={item.id}
                                            to={item?.path}>
                                            {item?.icon}
                                            {item.text}
                                        </Link>
                                    )
                                })}
                                <span
                                    className="cursor-pointer hover:text-red-500 text-blue-600 border-b border-gray-200 py-2 flex items-center gap-3"
                                    onClick={() => {
                                        setIsShowMenu(false)
                                        dispatch(action.logout())
                                    }}>
                                    <MdLogout />
                                    Đăng xuất
                                </span>
                            </div>}
                    </div>}
                    <Button
                        text={'Đăng tin mới'}
                        textColor='text-white'
                        bgColor='bg-[#f73859]'
                        IcAfter={AiOutlinePlusCircle}
                        onClick={() => navigate('/he-thong/tao-moi-bai-dang')}
                    />
                </div>
            </div>
        </div>
    )
}
export default Header