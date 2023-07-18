import HeaderMenu from "../Header/HeaderMenu";
import HeaderDescription from "../Header/HeaderDescription";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";

function RootLayout(props) {
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
      <Outlet />
    </Fragment>
  );
}
export default RootLayout;
