import React, { useCallback, useRef } from "react";
import { Button, User } from '../../components';
import icons from "../../ultils/icons";
import { Link, useNavigate } from "react-router-dom";
import { path } from "../../ultils/constant";
import { useSelector } from "react-redux";


const { AiOutlinePlusCircle, RiHeartLine } = icons

const Header = () => {
    const navigate = useNavigate()
    const headerRef = useRef()
    const { isLoggedIn } = useSelector(state => state.auth)
    const { countSavePost } = useSelector(state => state.post)

    const goLogin = useCallback((flag) => {
        navigate(path.LOGIN, { state: { flag } })
    }, [])

    return (
        <div ref={headerRef} className="w-[98%]">
            <div className="w-full flex items-center justify-between">
                <Link to={'/'}>
                    <h1
                        className="text-lg font-bold text-[#E03C31] ml-5"
                    >
                        Thông tin nhà trọ
                    </h1>
                </Link>
                <div className="flex items-center justify-center gap-1">
                    {!isLoggedIn && <div className="flex items-center justify-center">
                        <small className="text-sm">Xin Chào !</small>
                        <Button
                            text={'Đăng nhập'}
                            textColor={'font-medium'}
                            onClick={() => goLogin(false)}
                        />
                        <small>|</small>
                        <Button
                            text={'Đăng ký'}
                            textColor={'font-medium'}
                            onClick={() => goLogin(true)}
                        />
                    </div>}
                    {isLoggedIn && <div className="flex items-center gap-3 relative font-medium">
                        <Link to={'/tin-da-luu'}>
                            <div className='flex items-center justify-center gap-1'>
                                <RiHeartLine size={24} />
                                <div className='flex items-center gap-1'>
                                    <span className='text-red-500'>{`(${countSavePost})`}</span>
                                    <span>Yêu thích</span>
                                </div>
                            </div>
                        </Link>
                        <User />
                    </div>}
                    <Button
                        text={'Đăng tin'}
                        textColor={'font-medium'}
                        bgColor={'border border-gray-300'}
                        IcAfter={AiOutlinePlusCircle}
                        onClick={() => navigate('/he-thong/tao-moi-bai-dang')}
                    />
                </div>
            </div>
        </div>
    )
}
export default Header