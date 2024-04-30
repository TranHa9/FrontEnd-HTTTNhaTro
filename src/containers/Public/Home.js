import React, { useEffect, useState } from "react";
import Header from './Header';
import { Outlet, useLocation } from "react-router-dom";
import { Navigation, Search } from "./index";
import { Contact, Intro } from "../../components";
import { useSelector } from 'react-redux';
import { path } from "../../ultils/constant";

const Home = () => {
    const { isLoggedIn } = useSelector(state => state.auth)
    const location = useLocation()


    return (
        <div className="w-full flex gap-4 flex-col items-center h-full ">
            <Header />
            <Navigation />
            {isLoggedIn && location.pathname !== `/${path.CONTACT}` && !location.pathname.includes(path.DETAIL) && <Search />}
            <div className="w-4/5 lg:w-3/4 flex flex-col items-start justify-start mt-3">
                <Outlet />
            </div>
            <Intro />
            <Contact />
        </div>
    )
}
export default Home