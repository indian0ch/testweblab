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

function AddForm(props) {


  return (
    <Form className=" col-12 mx-auto">
      <Row>
        <Col md={6}>
          <FormGroup className="col-sm" floating>
            <Input
              id="filmName"
              //   innerRef={nameRef}
              name="filmName"
              type="name"
            />
            <Label for="contactName">Назва фільму</Label>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup className="col-sm" floating>
            <Input
              id="filmYear"
              //   innerRef={emailRef}
              name="filmYear"
              type="number"
            />
            <Label for="contactEmail">Рік випуску</Label>
          </FormGroup>
        </Col>
      </Row>
      <FormGroup floating>
        <Input
          id="formatSelect"
          name="formatSelect"
          type="select"
          //   innerRef={deliveryWayRef}
        >
          <option value="VHS">VHS</option>
          <option value="DVD">DVD</option>
          <option value="Blu-ray">Blu-ray</option>
        </Input>
        <Label for="contactPhone">Формат</Label>
        <FormFeedback>Це поле є обовʼязковим для заповнення</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="exampleText">
          Список акторів (“Ім'я та прізвище актора”)
        </Label>
        <Input
          id="exampleText"
          //   innerRef={textRef}
          name="text"
          type="textarea"
        />
      </FormGroup>
      <Button color="primary" size="lg" type="submit">
        Додати
      </Button>
    </Form>
  );
}
export default AddForm;
