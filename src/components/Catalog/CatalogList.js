import { ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MovieRow from "./MovieRow";
import { getMovies } from "./getMovies";
import { useEffect, useState } from "react";

function CatalogList(props) {
  const [movies, setMovies] = useState([]);
  const [loadedRows, setLoadedRows] = useState([]);

  const { pageNumber } = useParams();
  const token = useSelector((state) => state.tokenLoader.tokenJwt);
  const url = useSelector((state) => state.urlManage.getList);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getMovies(url, token);
        setMovies(moviesData);
      } catch (error) {
        alert("Error:", error);
      }
    };

    fetchMovies();
  }, [url, token]);

  if (movies) {
    console.log(movies);
    // movies.map((movie) => {
    //   setLoadedRows(() =>
    //     ProgressEvent.push(
    //       <MovieRow
    //         key={movie.title}
    //         title={movie.title}
    //         year={movie.year}
    //         format={movie.format}
    //         actors={movie.actors}
    //       />
    //     )
    //   );
    // });
  }
  for (let i = 0; i < pageNumber; i++)
    return (
      <ListGroup>
        <p>{pageNumber}</p>
        {token !== 0 ? loadedRows : null}
      </ListGroup>
    );
}
export default CatalogList;
