import { Fragment, useState } from "react";
import { ListGroupItem } from "reactstrap";
import ModalInfo from "./ModalInfo";

function MovieRow(props) {
  const [modal, setModal] = useState(false);
  const [isActive, setActive] = useState(false);

  const toggle = () => {
    setModal(!modal);
    setActive(!isActive);
  };

  return (
    <Fragment>
      <ListGroupItem onClick={toggle} active={isActive ? true : null}>
        {props.title}
      </ListGroupItem>
      <ModalInfo modal={modal} toggle={toggle} id={props.id}></ModalInfo>
    </Fragment>
  );
}
export default MovieRow;
