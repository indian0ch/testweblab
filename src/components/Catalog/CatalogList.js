import { ListGroup, Spinner } from "reactstrap";
import { useParams, useOutletContext } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MovieRow from "./MovieRow";
import { getMovies } from "./getMovies";
import { useEffect, useState } from "react";
import classes from "./Catalog.module.css";

function adjustPagination(moviesData, token) {
  const moviesComponentArr = [];

  for (let i in moviesData) {
    const item = moviesData[i];
    if (item) {
      moviesComponentArr.push(
        <MovieRow key={item.id} title={item.title} id={item.id} token={token} />
      );
    }
  }
  return moviesComponentArr;
}

function CatalogList(props) {
  const { pageNumber } = useParams();
  const url = useOutletContext();

  const [isSpinnerActive, setSpinnerActive] = useState(true);
  const [loadedRows, setLoadedRows] = useState([]);

  const token = useSelector((state) => state.tokenLoader.tokenJwt);

  useEffect(() => {
    setSpinnerActive(true);
    const fetchMovies = async () => {
      const moviesData = await getMovies(url, token, (pageNumber - 1) * 5);
      if (moviesData) {
        setSpinnerActive(false);
        setLoadedRows(adjustPagination(moviesData, token));
      }
    };
    fetchMovies();
  }, [url, token, pageNumber]);

  return (
    <ListGroup className={classes.listContainer}>
      {isSpinnerActive ? (
        <Spinner color="primary" size="">
          Loading...
        </Spinner>
      ) : (
        loadedRows
      )}
    </ListGroup>
  );
}
export default CatalogList;
