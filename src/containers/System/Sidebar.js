import React, { useCallback, useEffect } from 'react';
import Avatar from "../../assets/avatar.png";
import { useSelector, useDispatch } from "react-redux";
import { menuSidebar } from '../../ultils/menuManage';
import { NavLink } from 'react-router-dom';
import icons from "../../ultils/icons";
import * as action from '../../store/actions';
import { blobToBase64 } from '../../ultils/Common/toBase64';

const { MdLogout } = icons


const activeStyle = 'flex items-center hover:bg-redcover text-white rounded-md p-2 font-bold bg-redcover gap-3 cursor-pointer';
const notAcivieStyle = 'flex items-center hover:bg-redcover hover:text-white rounded-md p-2 gap-3 cursor-pointer';

const Sidebar = () => {
    const { currentData } = useSelector(state => state.user)
    const { userInfo } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const filterMenuByRole = (menuSidebar, userRole) => {
        return menuSidebar.filter(item => {
            if (item.permissions) {
                return item.permissions.includes(userRole);
            }
            return true;
        });
    };
    const filteredMenu = filterMenuByRole(menuSidebar, userInfo.role);
    return (
        <div className='w-full h-screen shadow-lg bg-gray-200 p-4 flex flex-col gap-8'>
            <div className='flex flex-col gap-3'>
                <div className='flex items-center justify-start gap-4'>
                    <img src={blobToBase64(currentData?.avatar) || Avatar} alt='avatar' className='w-12 h-12 object-cover rounded-full' />
                    <div className='flex flex-col'>
                        <span className='font-semibold'>{currentData?.name || currentData?.username}</span>
                        <small>{currentData?.phone}</small>
                    </div>
                </div>
                <span className='truncate'>Mã thành viên: <span className='font-medium'>{currentData?.id}</span></span>
            </div>
            <div>
                {filteredMenu.map(item => {
                    return (
                        <NavLink
                            className={({ isActive }) => isActive ? activeStyle : notAcivieStyle}
                            key={item.id}
                            to={item?.path}>
                            {item?.icon}
                            {item.text}
                        </NavLink>
                    )
                })}
                <span
                    className={notAcivieStyle}
                    onClick={() => dispatch(action.logout())}>
                    <MdLogout />
                    Đăng xuất
                </span>
            </div>
        </div>
    )
}

export default Sidebar