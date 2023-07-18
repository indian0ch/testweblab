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
} from "reactstrap";

function DeleteForm(props) {
    
  return (
    <Form className=" col-12 mx-auto">
      <Row>
        <Col md={10}>
          <FormGroup className="col-sm" floating>
            <Input
              id="filmName"
              //   innerRef={nameRef}
              name="filmName"
              type="name"
            />
            <Label for="contactName">Назва фільму</Label>
            <FormFeedback>Це поле є обовʼязковим для заповнення</FormFeedback>
          </FormGroup>
        </Col>
      </Row>
      <Button color="warning" size="lg" type="submit">
        Видалити
      </Button>
    </Form>
  );
}
export default DeleteForm;
