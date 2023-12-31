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
import classes from "./Search.module.css";

const SearchForm = React.forwardRef((props, ref) => {
  return (
    <Form onSubmit={props.onSubmitHandler} className="col-12 mx-auto my-3">
      <Row>
        <Col md={8}>
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
        <Col md={4}>
          <Button
            className={classes.buttonSearch}
            color="warning"
            type="submit"
            outline
          >
            Пошук фільму за {props.title}
          </Button>
        </Col>
      </Row>
    </Form>
  );
});

export default SearchForm;
