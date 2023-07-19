import { Fragment, useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroupItem,
} from "reactstrap";
import { getMovies } from "./getMovies";
import { useSelector } from "react-redux";

function MovieRow(props) {
  const [modal, setModal] = useState(false);
  const [isActive, setActive] = useState(false);
  const [isInfoLoaded, setInfoLoaded] = useState(false);
  const [movieData, setMovieData] = useState({});

  const url = useSelector((state) => state.urlManage.getList);

  const toggle = () => {
    setModal(!modal);
    setActive(!isActive);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const infoMovie = await getMovies(url, props.token, props.id);
      if (infoMovie) {
        setMovieData(infoMovie);
        setInfoLoaded(true);
      }
    };

    fetchMovies();
  }, []);

  return (
    <Fragment>
      <ListGroupItem onClick={toggle} active={isActive ? true : null}>
        {props.title}
      </ListGroupItem>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Інформація про фільм {props.title}
        </ModalHeader>
        {isInfoLoaded ? (
          <ModalBody>
            <p>Рік : {movieData.year}</p>
            <p>Формат : {movieData.format}</p>
            <p>Актори : {props.actors}</p>
          </ModalBody>
        ) : null}
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
}
export default MovieRow;
