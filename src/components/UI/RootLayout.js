import HeaderMenu from "../Header/HeaderMenu";
import HeaderDescription from "../Header/HeaderDescription";
import { Fragment, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ErrorPage from "../../pages/ErrorPage";
import AuthorizationPage from "../../pages/AuthorizationPage";

function RootLayout(props) {
  const dispatch = useDispatch();
  const [isAuthOk, setAuthOk] = useState(false);

  const isLogin = useSelector((state) => state.tokenLoader.isLogin);

  useEffect(() => {
    isLogin === true ? setAuthOk(true) : setAuthOk(false);
  }, [isLogin]);


  return (
    <Fragment>
      <header>
        <HeaderMenu
          fixed="top"
          color="light"
          light="true"
          expand="md"
          container="fluid"
        />
        <HeaderDescription />
      </header>
      {isAuthOk === true ? <Outlet /> : <AuthorizationPage />}
    </Fragment>
  );
}
export default RootLayout;
