import { ListGroup, Spinner } from "reactstrap";
import { useParams, useOutletContext } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MovieRow from "./MovieRow";
import { getMovies } from "./getMovies";
import { useEffect, useState } from "react";

function CatalogList(props) {
  const { pageNumber } = useParams();
  const url = useOutletContext();

  const [isSpinnerActive, setSpinnerActive] = useState(true);
  const [loadedRows, setLoadedRows] = useState([]);

  const token = useSelector((state) => state.tokenLoader.tokenJwt);

  useEffect(() => {
    setSpinnerActive(true);
    const fetchMovies = async () => {
      const moviesData = await getMovies(url, token);
      if (moviesData) {
        setSpinnerActive(false);
        const moviesComponentArr = await moviesData.map((movie) => {
          return (
            <MovieRow
              key={movie.id}
              title={movie.title}
              id={movie.id}
              token={token}
            />
          );
        });
        setLoadedRows(moviesComponentArr);
      }
    };
    fetchMovies();
  }, [url, token]);

  return (
    <ListGroup>
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
