import ContainerWrapper from "../components/UI/ContainerWrapper";
import Pagination from "../components/Catalog/Pagination";
import { Outlet, useNavigate } from "react-router-dom";
import { Input, Label } from "reactstrap";
import { useState } from "react";
import { SortLIST_URL, LIST_URL } from "./../asserts/urlLinks";

function CatalogPage(props) {
  const navigate = useNavigate();

  const [isSortChecked, setSortChecked] = useState(false);
  const [urlForLoad, setUrlForLoad] = useState(LIST_URL);

  function onCheckHandler(event) {
    setSortChecked(!isSortChecked);
    if (isSortChecked === true) {
      setUrlForLoad(LIST_URL);
    } else {
      setUrlForLoad(SortLIST_URL);
    }
    navigate(`/1`);
  }

  return (
    <ContainerWrapper>
      <h2 className="text-center">Каталог фільмів</h2>
      <div className="my-4">
        <p className="fw-bold">
          Для перегляду інформації про фільм - клікніть на назву
        </p>
        <div className="my-2">
          <Input
            type="checkbox"
            onClick={onCheckHandler}
            checked={isSortChecked}
          />{" "}
          <Label>
            Показати список фільмів, що відсортовані за назвою в алфавітному
            порядку
          </Label>
        </div>
        <Outlet context={urlForLoad}></Outlet>
      </div>
      <Pagination checkStatus={isSortChecked} />
    </ContainerWrapper>
  );
}
export default CatalogPage;
