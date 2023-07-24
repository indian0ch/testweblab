import HeaderMenu from "../Header/HeaderMenu";
import HeaderDescription from "../Header/HeaderDescription";
import { Fragment, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { tokenLoaderActions } from "../storage/tokenSlice";
import { useDispatch } from "react-redux";
import ErrorPage from "../../pages/ErrorPage";

function RootLayout(props) {
  const dispatch = useDispatch();
  const [isResponseOk, setResponseOk] = useState(true);

  useEffect(() => {
    console.log("API_URL:", process.env.REACT_APP_API_URL);
    console.log("API_URL:", process.env.API_URL);

    fetch(`${process.env.REACT_APP_API_URL}/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        email: "fesiukandrey146@gmail.com",
        password: "95219521",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const token = data.token;
        dispatch(tokenLoaderActions.setToken(token));
      })
      .catch(() => {
        setResponseOk(false);
      });
  }, [process.env.REACT_APP_API_URL]);

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
      {isResponseOk === true ? <Outlet /> : <ErrorPage></ErrorPage>}
    </Fragment>
  );
}
export default RootLayout;
