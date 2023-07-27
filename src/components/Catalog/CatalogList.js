import { ListGroup, Spinner } from "reactstrap";
import { useParams, useOutletContext } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MovieRow from "./MovieRow";
import { getMovies } from "./getMovies";
import { useEffect, useState } from "react";
import classes from "./Catalog.module.css";
import { paginationCounterActions } from "../../storage/paginationSlice";

function adjustPagination(moviesData, token) {
  const moviesComponentArr = [];
  let counterItems = 0;

  for (let i in moviesData) {
    const item = moviesData[i];
    if (item) {
      counterItems++;
      moviesComponentArr.push(
        <MovieRow key={item.id} title={item.title} id={item.id} token={token} />
      );
    }
  }
  return [moviesComponentArr, counterItems];
}
//Component
function CatalogList(props) {
  const dispatch = useDispatch();
  const { pageNumber } = useParams();
  const url = useOutletContext();

  const [isSpinnerActive, setSpinnerActive] = useState(true);
  const [loadedRows, setLoadedRows] = useState([]);

  const token = useSelector((state) => state.tokenLoader.tokenJwt);
  const deleteTitle = useSelector((state) => state.deleteTitle.deleteFilmTitle);

  useEffect(() => {
    setSpinnerActive(true);
    dispatch(paginationCounterActions.setNextAvailable(false));
    const fetchMovies = async () => {
      let number = pageNumber;
      pageNumber === "catalog" && (number = 1);

      const moviesData = await getMovies({
        url,
        token,
        offset: (number - 1) * 10,
      });

      if (moviesData) {
        setSpinnerActive(false);
        const [arrMovies, counts] = adjustPagination(moviesData, token);

        counts < 10
          ? dispatch(paginationCounterActions.setNextAvailable(false))
          : dispatch(paginationCounterActions.setNextAvailable(true));

        setLoadedRows(arrMovies);
      }
    };
    deleteTitle === "" && fetchMovies();
  }, [url, token, pageNumber, deleteTitle]);

  return (
    <ListGroup className={classes.listContainer}>
      {isSpinnerActive ? (
        <Spinner className="mx-auto" color="primary" size="">
          Loading...
        </Spinner>
      ) : loadedRows.length === 0 ? (
        <p>Фільми відсутні.</p>
      ) : (
        loadedRows
      )}
    </ListGroup>
  );
}
export default CatalogList;
