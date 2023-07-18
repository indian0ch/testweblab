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

function ImportForm(props) {
  return (
    <Form className=" col-12 mx-auto">
      <Row>
        <Col md={10}>
          <FormGroup>
            <Label for="filmsFile">Файл</Label>
            <Input
              id="filmsFile"
              name="file"
              type="file"
              required
              accept=".txt"
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
