import { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { getMovies } from "./getMovies";
import { useSelector } from "react-redux";
import { DELETE_URL } from "../storage/urlLinks";

function ModalInfo(props) {
  const [movieData, setMovieData] = useState({});
  const [actorsList, setActorsList] = useState();

  const token = useSelector((state) => state.tokenLoader.tokenJwt);

  useEffect(() => {
    //Отримаємо інфо по конкретному фільмі
    const fetchMovie = async () => {
      const infoMovie = await getMovies({ DELETE_URL, token, id: props.id });
      if (infoMovie) {
        setMovieData(infoMovie);
      }
    };
    fetchMovie();
  }, []);

  useEffect(() => {
    //Розкидуємо інфо по параграфам
    if (movieData.actors) {
      const actorsParagraphs = movieData.actors
        .map((actor) => actor.name)
        .join(", ");
      setActorsList(actorsParagraphs);
    }
  }, [movieData]);

  return (
    <Modal isOpen={props.modal} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>
        Інформація про фільм {movieData.title}
      </ModalHeader>
      <ModalBody>
        <p>Рік : {movieData.year}</p>
        <p>Формат : {movieData.format}</p>
        <p>Актори : {actorsList}</p>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={props.toggle}>
          OK
        </Button>
      </ModalFooter>
    </Modal>
  );
}
export default ModalInfo;
