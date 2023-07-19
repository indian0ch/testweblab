import { Fragment, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroupItem,
} from "reactstrap";

function MovieRow(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  return (
    <Fragment>
      <ListGroupItem onClick={toggle}>{props.title}</ListGroupItem>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Інформація про фільм</ModalHeader>
        <ModalBody>
          <p>Рік : {props.year}</p>
          <p>Формат : {props.format}</p>
        </ModalBody>
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
