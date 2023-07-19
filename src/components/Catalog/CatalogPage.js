import ContainerWrapper from "../UI/ContainerWrapper";
import Pagination from "./Pagination";
import { Outlet } from "react-router-dom";
import { Input, Label } from "reactstrap";
import { useSelector } from "react-redux";
import { useState } from "react";

function CatalogPage(props) {
  const [isSortChecked, setSortChecked] = useState(false);
  const urlUnsorted = useSelector((state) => state.urlManage.getList);
  const urlSorted = useSelector((state) => state.urlManage.getSortList);
  const [url, setUrl] = useState(urlUnsorted);

  function onCheckHandler(event) {
    setSortChecked(!isSortChecked);
    if (isSortChecked === true) {
      setUrl(urlUnsorted);
    } else {
      setUrl(urlSorted);
    }
  }

  return (
    <ContainerWrapper>
      <h2 className="text-center">Каталог фільмів</h2>
      <div className="my-4">
        <p className="fw-bold">
          Для перегляду інформації про фільм - клікніть на назву
        </p>
        <div>
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
        <Outlet context={url}></Outlet>
      </div>
      <Pagination checkStatus={isSortChecked} />
    </ContainerWrapper>
  );
}
export default CatalogPage;
