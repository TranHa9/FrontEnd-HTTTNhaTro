import { Route, Routes } from "react-router-dom";
import { Home, Login, Rental, HomePage, DetailPost, SearchDetail } from "./containers/Public";
import { path } from "./ultils/constant";
import { CreatePost, System } from "./containers/System";


function App() {
  return (
    <div className="bg-primary">
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
          <Route path={'chi-tiet/*'} element={<DetailPost />} />
        </Route>
        <Route path={path.SYSTEM} element={<System />}>
          <Route path={path.CREATE_POST} element={<CreatePost />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
