import React from "react";
import {
  Form,
  Row,
  Col,
  Input,
  FormFeedback,
  FormGroup,
  Label,
  Button,
} from "reactstrap";

const SearchForm = React.forwardRef((props, ref) => {
  return (
    <Form onSubmit={props.onSubmitHandler} className="col-12 mx-auto my-3">
      <Row className="align-items-center">
        <Col md={6}>
          <FormGroup className="col-sm" floating>
            <Input
              id={props.id}
              innerRef={ref}
              name={props.id}
              type={props.type}
              onClick={() => {
                props.setEmpty();
              }}
              invalid={props.isEmpty}
            />
            <Label for={props.id}>{props.label} фільму</Label>
            <FormFeedback invalid>
              Це поле є обовʼязковим для заповнення
            </FormFeedback>
          </FormGroup>
        </Col>
        <Col md={6}>
          <Button color="warning" type="submit" outline>
            Пошук фільму за {props.title}
          </Button>
        </Col>
      </Row>
    </Form>
  );
});

export default SearchForm;
