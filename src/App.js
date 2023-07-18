import logo from "./logo.svg";
import "./App.css";
import Test from "./components/Test";
import HeaderMenu from "./components/Header/HeaderMenu";
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
        <HeaderMenu
          fixed="top"
          color="light"
          light="true"
          expand="md"
          container="fluid"
        />
      <div className="mt-5">
      <Test />
      </div>
    </Fragment>
  );
}

export default App;
