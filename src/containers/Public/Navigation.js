import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { formatVietnameseToString } from "../../ultils/Common/formatVietnameseToString";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../store/actions';
import { path } from '../../ultils/constant'



const notActive = 'hover:border-b-2 hover:border-[#E03C31] px-4 h-full flex items-center '
const active = 'border-b-2 px-4 h-full flex items-center border-[#E03C31]'

const Navigation = () => {
    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.app)
    useEffect(() => {
        dispatch(actions.getCategories())
    }, [])
    return (
        <div className="w-full bg-gray-200 flex justify-center items-center h-[60px] mb-5 shadow-md">
            <div className="w-3/4 flex h-full items-center font-medium ">
                <NavLink to={'/'}
                    className={({ isActive }) => isActive ? active : notActive}
                >
                    Trang chủ
                </NavLink>
                {categories?.length > 0 && categories.map((item) => {
                    return (
                        <div key={item.id} className="h-full flex justify-center items-center">
                            <NavLink to={`/${formatVietnameseToString(item.name)}`}
                                className={({ isActive }) => isActive ? active : notActive}
                            >
                                {item.name}
                            </NavLink>
                        </div>
                    )
                })}
                <NavLink to={path.CONTACT}
                    className={({ isActive }) => isActive ? active : notActive}
                >
                    Liên hệ
                </NavLink>
            </div>
        </div>
    )
}
export default Navigation