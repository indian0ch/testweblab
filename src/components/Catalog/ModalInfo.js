import { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { getMovies } from "./getMovies";
import { useSelector, useDispatch } from "react-redux";
import { DELETE_URL } from "../../asserts/urlLinks";
import { deleteFilm } from "../Editing/Deleting/deleteFilm";
import { deleteTitleActions } from "../../storage/deleteMovieSlice";

function ModalInfo(props) {
  const dispatch = useDispatch();
  const [movieData, setMovieData] = useState({});
  const [actorsList, setActorsList] = useState();

  const token = useSelector((state) => state.tokenLoader.tokenJwt);

  const [nestedModal, setNestedModal] = useState(false);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    // setCloseAll(false);
  };

  useEffect(() => {
    //Отримаємо інфо по конкретному фільмі
    const fetchMovie = async () => {
      const infoMovie = await getMovies({
        url: DELETE_URL,
        token,
        id: props.id,
      });
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

  async function deleteHandler() {
    const isSuccess = await deleteFilm(DELETE_URL, token, props.id);
    if (isSuccess.error) {
      dispatch(deleteTitleActions.setError(true));
    } else {
      dispatch(deleteTitleActions.setError(false));
      dispatch(deleteTitleActions.setDeletedTitle(movieData.title));
    }
    toggleNested();
    props.toggle();
  }

  return (
    <Modal isOpen={props.modal} toggle={props.toggle} centered={true}>
      <ModalHeader toggle={props.toggle}>
        Інформація про фільм {movieData.title}
      </ModalHeader>
      <ModalBody>
        <p>Рік : {movieData.year}</p>
        <p>Формат : {movieData.format}</p>
        <p>Актори : {actorsList}</p>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={toggleNested}>
          Видалити
        </Button>
        <Button color="primary" onClick={props.toggle}>
          OK
        </Button>
      </ModalFooter>
      <Modal
        isOpen={nestedModal}
        toggle={toggleNested}
        centered={true}
      >
        <ModalBody>
          Ви справді хочете видалити <b>{movieData.title}</b> зі списку фільмів?
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={deleteHandler}>
            Так
          </Button>
          <Button color="primary" onClick={toggleNested}>
            Ні
          </Button>
        </ModalFooter>
      </Modal>
    </Modal>
  );
}
export default ModalInfo;
