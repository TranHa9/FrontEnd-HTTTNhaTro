import { Route, Routes } from "react-router-dom";
import { Home, Login, Rental, HomePage, DetailPost, SearchDetail, Contact, PostSaved } from "./containers/Public";
import { path } from "./ultils/constant";
import { CreatePost, EditAccount, ManagePost, System } from "./containers/System";
import * as action from './store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";




function App() {

  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(state => state.auth)

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(action.getCurrent())
    }, 1000)
  }, [isLoggedIn])

  // useEffect(() => {
  //   dispatch(action.getPrices())
  //   dispatch(action.getArea())
  //   dispatch(action.getProvince())
  // }, [])

  return (
    <div className="bg-primary overflow-hidden">
      <Routes>
        <Route path={path.HOME} element={<Home />} >
          <Route path="*" element={<HomePage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.NHA_CHO_THUE} element={<Rental />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
          <Route path={path.TIM_NGUOI_O_GHEP} element={<Rental />} />
          <Route path={path.SEARCH} element={<SearchDetail />} />
          <Route path={path.DETAIL_POST__TITLE__POSTID} element={<DetailPost />} />
          <Route path={path.CONTACT} element={<Contact />} />
          <Route path={path.POST_SAVED} element={<PostSaved />} />
          {/* <Route path={path.DETAIL_ALL} element={<DetailPost />} /> */}
        </Route>
        <Route path={path.SYSTEM} element={<System />}>
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.MANAGE_POST} element={<ManagePost />} />
          <Route path={path.Edit_ACCOUNT} element={<EditAccount />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
