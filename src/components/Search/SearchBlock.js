import { useEffect, useRef, useState } from "react";
import SearchForm from "./SearchForm";
import { getMovies } from "../Catalog/getMovies";
import { useSelector } from "react-redux";
import SearchResult from "./SearchResult";

function SearchBlock(props) {
  const [isTitleEmpty, setTitleEmpty] = useState(false);
  const [isActorEmpty, setActorEmpty] = useState(false);
  const [titleFilm, setTitleFilm] = useState(null);
  const [actorFilm, setActorFilm] = useState(null);

  const token = useSelector((state) => state.tokenLoader.tokenJwt);

  const titleRef = useRef();
  const actorRef = useRef();

  async function fetchMovie(value, type, emptyState, movieState) {
    if (value) {
      const url = `${process.env.REACT_APP_API_URL}/movies?limit=1`;
      let movie;
      if (type === "title") {
        movie = await getMovies({
          url,
          token,
          title: value,
        });
      } else {
        movie = await getMovies({
          url,
          token,
          actor: value,
        });
      }
      if(movie){
        movie.length === 0 ? movieState(false) : movieState(...movie);
      }
    } else {
      emptyState(true);
    }
  }

  function onTitleHandler(event) {
    event.preventDefault();
    fetchMovie(titleRef.current.value, "title", setTitleEmpty, setTitleFilm);
  }

  function onActorHandler(event) {
    event.preventDefault();
    fetchMovie(actorRef.current.value, "actor", setActorEmpty, setActorFilm);
  }

  useEffect(() => {
    let searchTimer = setTimeout(() => {
      if (titleFilm === false) {
        setTitleFilm(null);
      }
      if (actorFilm === false) {
        setActorFilm(null);
      }
    }, 2000);

    return () => {
      clearTimeout(searchTimer);
    };
  }, [titleFilm, actorFilm]);

  return (
    <div className="my-2">
      <SearchForm
        ref={titleRef}
        type="title"
        title="назвою"
        id="filmTitle"
        label="Назва"
        isEmpty={isTitleEmpty}
        setEmpty={setTitleEmpty}
        onSubmitHandler={onTitleHandler}
      ></SearchForm>
      <SearchResult
        alertText="Фільм з такою назвою не знайдено!"
        movieData={titleFilm}
      />
      <SearchForm
        ref={actorRef}
        type="title"
        title="акторем"
        id="filmActor"
        label="Актор"
        isEmpty={isActorEmpty}
        setEmpty={setActorEmpty}
        onSubmitHandler={onActorHandler}
      ></SearchForm>
      <SearchResult
        alertText="Фільм з таким акторем не знайдено!"
        movieData={actorFilm}
      />
    </div>
  );
}
export default SearchBlock;
