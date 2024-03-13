import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { apigetCategories } from "../../services/category";
import { formatVietnameseToString } from "../../ultils/Common/formatVietnameseToString";



const notActive = 'hover:bg-secondary2 h-full flex justify-center items-center px-4 bg-secondary1'
const active = 'hover:bg-secondary2 h-full flex justify-center items-center px-4 bg-secondary2'
const Navigate = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        const fetchCategories = async () => {
            const response = await apigetCategories()
            if (response?.data.err === 0) {
                setCategories(response.data.response)
            }
        }
        fetchCategories()
    }, [])
    return (
        <div className="w-screen flex justify-center items-center h-[40px] bg-secondary1 text-white">
            <div className="w-3/5 flex h-full items-center  text-sm font-medium">
                <NavLink to={'/'}
                    className={({ isActive }) => isActive ? active : notActive}
                >
                    Trang chủ
                </NavLink>
                {categories?.length > 0 && categories.map((item) => {
                    return (
                        <div key={item.code} className="h-full flex justify-center items-center">
                            <NavLink to={`${formatVietnameseToString(item.value)}`}
                                className={({ isActive }) => isActive ? active : notActive}
                            >
                                {item.value}
                            </NavLink>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Navigate