import { useState } from "react";
import {
  FormGroup,
  Form,
  Label,
  Input,
  FormFeedback,
  Row,
  Col,
  Button,
  FormText,
  Spinner,
} from "reactstrap";
import { useSelector } from "react-redux";
import { importMovie } from "./importMovie";

function ImportForm(props) {
  const [file, setFile] = useState(null);
  const [isSuccess, setSuccess] = useState(false);
  const [isError, setError] = useState(false);
  const [isSpinner, setSpinner] = useState(false);

  const token = useSelector((state) => state.tokenLoader.tokenJwt);

  function changeFileHandler(event) {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  }

  async function sendRequest() {
    const requestStatus = await importMovie(token, file);

    requestStatus.error ? setError(true) : setSuccess(true);
    setSpinner(false);
  }

  async function onSubmitHandler(event) {
    event.preventDefault();
    setSuccess(false);
    setError(false);
    setSpinner(true);
    sendRequest();
  }

  return (
    <Form
      onSubmit={onSubmitHandler}
      className=" col-12 mx-auto"
      id="importForm"
    >
      <Row>
        <Col md={10}>
          <FormGroup>
            <Label for="filmsFile">Файл</Label>
            <Input
              id="filmsFile"
              name="file"
              type="file"
              accept=".txt"
              required
              onChange={changeFileHandler}
              valid={isSuccess}
              invalid={isError}
            />
            <FormText>Імпортуйте .txt файл з даними про фільми.</FormText>
            <FormFeedback valid>Дані з файлу успішно імпортовано!</FormFeedback>
            <FormFeedback invalid>Проблема з форматом файлу!</FormFeedback>
          </FormGroup>
        </Col>
        {isSpinner && (
          <Col md={2} className="d-flex align-items-center">
            <Spinner color="primary" />
          </Col>
        )}
      </Row>
      <Button color="warning" size="lg" type="submit">
        Імпортувати
      </Button>
    </Form>
  );
}
export default ImportForm;
