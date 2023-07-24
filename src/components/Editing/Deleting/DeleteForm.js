import { useRef, useState } from "react";
import { Form, Row, Col, Button, Alert } from "reactstrap";
import { deleteFilm } from "./deleteFilm";
import { useSelector } from "react-redux";
import { DELETE_URL } from "../../../asserts/urlLinks";
import FormGroupCustom from "../../UI/FormGroupCustom";

function DeleteForm(props) {
  const idRef = useRef();
  const [isIdEmpty, setIdEmpty] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const token = useSelector((state) => state.tokenLoader.tokenJwt);

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
      const isSuccess = await deleteFilm(
        DELETE_URL,
        token,
        idRef.current.value
      );
      if (isSuccess.error) {
        setErrorMessage(true);
      } else {
        setSuccessMessage(true);
      }
    }
  }

  return (
    <Form onSubmit={onSubmitHandler} className=" col-12 mx-auto">
      <Row>
        <Col md={12}>
          <FormGroupCustom
            floating={true}
            class="col-sm"
            name="filmID"
            type="number"
            ref={idRef}
            invalid={isIdEmpty}
            onClick={() => {
              setErrorMessage(false);
              setSuccessMessage(false);
              setIdEmpty(false);
            }}
          >
            Унікальний ідентифікатор фільму
          </FormGroupCustom>
        </Col>
      </Row>
      <Button color="warning" size="lg" type="submit">
        Видалити
      </Button>
      {errorMessage === true && (
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
