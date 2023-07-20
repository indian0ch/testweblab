import { useRef, useState } from "react";
import {
  FormGroup,
  Form,
  Label,
  Input,
  FormFeedback,
  Row,
  Col,
  Button,
  Alert,
} from "reactstrap";
import { deleteFilm } from "./deleteFilm";
import { useSelector } from "react-redux";

function DeleteForm(props) {
  const idRef = useRef();
  const [isIdEmpty, setIdEmpty] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const token = useSelector((state) => state.tokenLoader.tokenJwt);
  const url = useSelector((state) => state.urlManage.deleteUrl);

  function chechValidation() {
    if (idRef.current.value === "") {
      setIdEmpty(true);
      return false;
    }
    return true;
  }

  async function onSubmitHandler(event) {
    event.preventDefault();
    if (chechValidation()) {
      const isSuccess = await deleteFilm(url, token, idRef.current.value);
      console.log(isSuccess.error);
      if (isSuccess.error.code === "MOVIE_NOT_FOUND") {
        setErrorMessage(true);
      }
    }
  }

  return (
    <Form onSubmit={onSubmitHandler} className=" col-12 mx-auto">
      <Row>
        <Col md={12}>
          <FormGroup className="col-sm" floating>
            <Input
              id="filmID"
              innerRef={idRef}
              name="filmID"
              type="number"
              onClick={() => {
                setErrorMessage(false);
                setIdEmpty(false);
              }}
              invalid={isIdEmpty}
            />
            <Label for="contactName">Унікальний ідентифікатор фільму</Label>
            <FormFeedback invalid>
              Це поле є обовʼязковим для заповнення
            </FormFeedback>
          </FormGroup>
        </Col>
      </Row>
      <Button color="warning" size="lg" type="submit">
        Видалити
      </Button>
      {errorMessage && (
        <Alert color="danger" className="col-md-12 col-sm my-3">
          Фільм з таким унікальним ідентифікатором не знайдено!
        </Alert>
      )}
      {successMessage && (
        <Alert color="success" className="col-md-12 col-sm my-3">
          Фільм з таким унікальним ідентифікатором видалено!
        </Alert>
      )}
    </Form>
  );
}
export default DeleteForm;
