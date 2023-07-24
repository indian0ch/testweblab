import { useReducer } from "react";
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
import { IMPORT_URL } from "../../asserts/urlLinks";

function formImportReducer(state, action) {
  switch (action.type) {
    case "change_file": {
      return {
        ...state,
        file: action.file,
      };
    }
    case "change_status_success": {
      return {
        ...state,
        isSuccess: action.status,
      };
    }
    case "change_status_error": {
      return {
        ...state,
        isError: action.status,
      };
    }
    case "change_status_spinner": {
      return {
        ...state,
        isSpinner: action.status,
      };
    }
  }
}

function ImportForm(props) {
  const [formImportState, dispatchInfo] = useReducer(formImportReducer, {
    file: null,
    isSuccess: false,
    isError: false,
    isSpinner: false,
  });

  const token = useSelector((state) => state.tokenLoader.tokenJwt);

  function changeFileHandler(event) {
    dispatchInfo({ type: "change_file", file: event.target.files[0] });
  }

  async function sendRequest() {
    const requestStatus = await importMovie(
      IMPORT_URL,
      token,
      formImportState.file
    );

    requestStatus.error
      ? dispatchInfo({ type: "change_status_error", status: true })
      : dispatchInfo({ type: "change_status_success", status: true });

    dispatchInfo({ type: "change_status_spinner", status: false });
  }

  async function onSubmitHandler(event) {
    event.preventDefault();
    dispatchInfo({ type: "change_status_success", status: false });
    dispatchInfo({ type: "change_status_error", status: false });
    dispatchInfo({ type: "change_status_spinner", status: true });

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
              valid={formImportState.isSuccess}
              invalid={formImportState.isError}
            />
            <FormText>Імпортуйте .txt файл з даними про фільми.</FormText>
            <FormFeedback valid>Дані з файлу успішно імпортовано!</FormFeedback>
            <FormFeedback invalid>Проблема з форматом файлу!</FormFeedback>
          </FormGroup>
        </Col>
        {formImportState.isSpinner && (
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
