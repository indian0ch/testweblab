import { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { getMovies } from "./getMovies";
import { useSelector } from "react-redux";

function ModalInfo(props) {
  const [movieData, setMovieData] = useState({});
  const [actorsList, setActorsList] = useState();

  const token = useSelector((state) => state.tokenLoader.tokenJwt);
  const url = useSelector((state) => state.urlManage.getList);

  useEffect(() => {
    const fetchMovie = async () => {
      const infoMovie = await getMovies(url, token, props.id);
      if (infoMovie) {
        setMovieData(infoMovie);
      }
    };
    fetchMovie();
  }, []);

  useEffect(() => {
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
