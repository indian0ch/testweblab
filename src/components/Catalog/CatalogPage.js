import ContainerWrapper from "../UI/ContainerWrapper";
import Pagination from "./Pagination";
import { Outlet } from "react-router-dom";

function CatalogPage(props) {
  return (
    <ContainerWrapper>
      <h2>Каталог фільмів</h2>
      <div className="my-4">
        <Outlet></Outlet>
      </div>
      <Pagination />
    </ContainerWrapper>
  );
}
export default CatalogPage;
