import React, { useCallback, useEffect, useRef } from "react";
import logo from '../../assets/logo.png';
import { Button } from '../../components';
import icons from "../../ultils/icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { path } from "../../ultils/constant";
import { useSelector, useDispatch } from "react-redux";
import * as action from '../../store/actions'


const { AiOutlinePlusCircle } = icons

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchParam] = useSearchParams()
    const headerRef = useRef()
    const { isLoggedIn } = useSelector(state => state.auth)
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
                    {isLoggedIn && <div className="flex items-center gap-1">
                        <small>Tên !</small>
                        <Button text={'Đăng xuất'} textColor='text-white' bgColor='bg-red-700'
                            onClick={() => dispatch(action.logout())}
                        />
                    </div>}
                    <Button text={'Đăng tin mới'} textColor='text-white' bgColor='bg-[#f73859]' IcAfter={AiOutlinePlusCircle} />
                </div>
            </div>
        </div>
    )
}
export default Header