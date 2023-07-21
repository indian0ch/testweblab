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
  FormText,
} from "reactstrap";
import { useSelector } from "react-redux";
import { importMovie } from "./importMovie";

function ImportForm(props) {
  const [file, setFile] = useState(null);

  const url = useSelector((state) => state.urlManage.getList);
  const token = useSelector((state) => state.tokenLoader.tokenJwt);

  function changeFileHandler(event) {
    const selectedFile = event.target.files[0];
    
    console.log(selectedFile);
    setFile(selectedFile);
  }

  function onSubmitHandler(event) {
    event.preventDefault();
    // const form = document.getElementById('importForm');
    const formData = new FormData();

    // console.log(Array.from(formData));
    formData.append("movies", file.path);

    console.log(Array.from(formData));

    importMovie("http://localhost:8000/api/v1/movies/import", token, formData);
  }

  return (
    <Form onSubmit={onSubmitHandler} className=" col-12 mx-auto" id="importForm">
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
            />
            <FormText>Імпортуйте .txt файл з даними про фільми</FormText>
            <FormFeedback>Це поле є обовʼязковим для заповнення</FormFeedback>
          </FormGroup>
        </Col>
      </Row>
      <Button color="warning" size="lg" type="submit">
        Імпортувати
      </Button>
    </Form>
  );
}
export default ImportForm;
