import ContainerWrapper from "../UI/ContainerWrapper";
import Pagination from "./Pagination";
import { Outlet } from "react-router-dom";
import { Input, Label } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getMovies } from "./getMovies";
import { paginationCounterActions } from "../storage/paginationSlice";

function CatalogPage(props) {
  const dispatch = useDispatch();

  const urlUnsorted = useSelector((state) => state.urlManage.getList);
  const urlSorted = useSelector((state) => state.urlManage.getSortList);
  const urlAllItems = useSelector((state) => state.urlManage.addUrl);
  const token = useSelector((state) => state.tokenLoader.tokenJwt);

  const [isSortChecked, setSortChecked] = useState(false);
  const [url, setUrl] = useState(urlUnsorted);

  function onCheckHandler(event) {
    setSortChecked(!isSortChecked);
    if (isSortChecked === true) {
      setUrl(urlUnsorted);
    } else {
      setUrl(urlSorted);
    }
  }

  const fetchPageCounts = async () => {
    //Отримання загальох кількості фільмів для налаштування пагінації
    const moviesData = await getMovies(urlAllItems, token);
    if (moviesData) {
      dispatch(paginationCounterActions.setPageCounters(moviesData.length));
    }
  };
  fetchPageCounts();

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
        <Outlet context={url}></Outlet>
      </div>
      <Pagination checkStatus={isSortChecked} />
    </ContainerWrapper>
  );
}
export default CatalogPage;
