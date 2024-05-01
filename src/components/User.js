import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import avatar from "../assets/avatar.png";
import { blobToBase64 } from '../ultils/Common/toBase64';
import { Link } from 'react-router-dom';
import icons from '../ultils/icons';
import * as action from '../store/actions';
import { menuManage } from '../ultils/menuManage';

const User = () => {
    const { MdLogout, IoIosArrowDown } = icons
    const { currentData } = useSelector(state => state.user)
    const { userInfo } = useSelector(state => state.auth)
    const [isShowMenu, setIsShowMenu] = useState(false)
    const dispatch = useDispatch()

    const filterMenuByRole = (menuManage, userRole) => {
        return menuManage.filter(item => {
            if (item.permissions) {
                return item.permissions.includes(userRole);
            }
            return true;
        });
    };
    const filteredMenu = filterMenuByRole(menuManage, userInfo.role);

    return (
        <>
            {currentData && Object.keys(currentData).length > 0 && <div className='flex items-center gap-2'>
                <div
                    className='flex items-center gap-2 cursor-pointer'
                    onClick={() => setIsShowMenu(prev => !prev)}
                >
                    <img src={blobToBase64(currentData?.avatar) || avatar} alt='avatar' className='w-10 h-10 rounded-full object-cover' />
                    <span className='flex items-center justify-center gap-1'>
                        Xin chào,
                        <span className='font-semibold'> {currentData?.name}</span>
                        <IoIosArrowDown />
                    </span>
                </div>
                {isShowMenu &&
                    <div className="absolute min-w-200 top-full right-0 bg-white shadow-md rounded-md p-4 flex flex-col z-50">
                        {filteredMenu.map(item => {
                            return (
                                <Link
                                    className="flex items-center gap-3 hover:text-[#E03C31] border-b border-gray-200 py-2"
                                    key={item.id}
                                    to={item?.path}>
                                    {item?.icon}
                                    {item.text}
                                </Link>
                            )
                        })}
                        <span
                            className="cursor-pointer hover:text-red-500 border-b border-gray-200 py-2 flex items-center gap-3"
                            onClick={() => {
                                setIsShowMenu(false)
                                dispatch(action.logout())
                            }}>
                            <MdLogout />
                            Đăng xuất
                        </span>
                    </div>}
            </div>}
        </>
    )
}

export default User