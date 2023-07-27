import { Fragment, useState } from "react";
import { ListGroupItem, Button } from "reactstrap";
import ModalInfo from "./ModalInfo";
import { useSelector, useDispatch } from "react-redux";
import { DELETE_URL } from "../../asserts/urlLinks";
import { deleteFilm } from "../Editing/Deleting/deleteFilm";
import { deleteTitleActions } from "../../storage/deleteMovieSlice";
import ModalConfirm from "./ModalConfirm";
import classes from "./Catalog.module.css";

function MovieRow(props) {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [isActive, setActive] = useState(false);

  const token = useSelector((state) => state.tokenLoader.tokenJwt);

  const toggle = () => {
    setModal(!modal);
    setActive(!isActive);
  };
  const toggleConfirm = () => {
    setConfirmModal(!confirmModal);
  };

  async function deleteHandler() {
    const isSuccess = await deleteFilm(DELETE_URL, token, props.id);
    if (isSuccess.error) {
      dispatch(deleteTitleActions.setError(true));
    } else {
      dispatch(deleteTitleActions.setError(false));
      dispatch(deleteTitleActions.setDeletedTitle(props.title));
    }
  }

  return (
    <Fragment>
      <ListGroupItem
        className="d-flex justify-content-between"
        active={isActive ? true : null}
      >
        <div className={classes.titleDiv} onClick={toggle}>
          <a> {props.title}</a>
        </div>
        <Button color="danger" size="sm" onClick={toggleConfirm}>
          Видалити
        </Button>
      </ListGroupItem>
      <ModalInfo modal={modal} toggle={toggle} id={props.id}></ModalInfo>
      <ModalConfirm
        deleteHandler={deleteHandler}
        toggleConfirm={toggleConfirm}
        confirmModal={confirmModal}
      >
        {props.title}
      </ModalConfirm>
    </Fragment>
  );
}
export default MovieRow;
