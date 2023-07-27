import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

function ModalConfirm(props) {
  return (
    <Modal
      isOpen={props.confirmModal}
      toggle={props.toggleConfirm}
      centered={true}
    >
      <ModalBody>
        Ви справді хочете видалити <b>{props.children}</b> зі списку фільмів?
      </ModalBody>
      <ModalFooter>
        <Button color="warning" onClick={props.deleteHandler}>
          Так
        </Button>
        <Button color="primary" onClick={props.toggleConfirm}>
          Ні
        </Button>
      </ModalFooter>
    </Modal>
  );
}
export default ModalConfirm;
