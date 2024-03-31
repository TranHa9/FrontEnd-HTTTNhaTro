import React, { useEffect } from "react";
import Header from './Header';
import { Outlet } from "react-router-dom";
import { Navigate, Search } from "./index";
import { Contact, Intro } from "../../components";
import { useDispatch } from 'react-redux';
import * as action from '../../store/actions';

const Home = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(action.getPrices())
        dispatch(action.getArea())
        dispatch(action.getProvince())
    }, [])
    return (
        <div className="w-full flex gap-4 flex-col items-center h-full ">
            <Header />
            <Navigate />
            <Search />
            <div className="w-4/5 lg:w-3/4 flex flex-col items-start justify-start mt-3">
                <Outlet />
            </div>
            <Intro />
            <Contact />
            <div className="h-[500px]">

            </div>

        </div>
    )
}
export default Home