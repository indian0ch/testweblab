import { useRef, useState, useReducer } from "react";
import { useSelector } from "react-redux";
import {
  FormGroup,
  Form,
  Label,
  Input,
  FormFeedback,
  Row,
  Col,
  Button,
  Spinner,
} from "reactstrap";
import { postFilm } from "./postFilm";
import { validateActors } from "./validateActors";

function filmInfoReducer(state, action) {
  switch (action.type) {
    case "change_title_status": {
      return {
        ...state,
        isTitleValid: action.status,
      };
    }
    case "change_year_status": {
      return {
        ...state,
        isYearValid: action.status,
      };
    }
    case "change_actor_status": {
      return {
        ...state,
        isActorValid: action.status,
      };
    }
  }
}

function AddForm(props) {
  const [filmInfoState, dispatchInfo] = useReducer(filmInfoReducer, {
    isTitleValid: false,
    isYearValid: false,
    isActorValid: false,
  });
  const titleRef = useRef();
  const yearRef = useRef();
  const formatRef = useRef();
  const actorsRef = useRef();
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);

  const url = useSelector((state) => state.urlManage.deleteUrl);

  function clickInputHandler(typeString) {
    dispatchInfo({ type: typeString, status: false });
  }

  function checkValidation() {
    let validateStatus = true;
    const fieldsToValidate = [
      { ref: titleRef, type: "change_title_status" },
      { ref: yearRef, type: "change_year_status" },
      { ref: actorsRef, type: "change_actor_status" },
    ];
    fieldsToValidate.forEach((field) => {
      if (field.ref.current.value === "") {
        dispatchInfo({ type: field.type, status: true });
        validateStatus = false;
      }
    });
    if (validateStatus === true) {
      validateActors(actorsRef.current.value);
      // actorsRef.current.value
    }
    return validateStatus;
  }

  function onSubmitHandler(event) {
    event.preventDefault();
    setIsLoadingBtn(true);
    setTimeout(() => {
      setIsLoadingBtn(false);
    }, 1000);
    if (checkValidation()) {
      // postFilm(url);
    }
  }

  return (
    <Form onSubmit={onSubmitHandler} className=" col-12 mx-auto">
      <Row>
        <Col md={6}>
          <FormGroup className="col-sm" floating>
            <Input
              id="filmTitle"
              innerRef={titleRef}
              name="filmTitle"
              type="name"
              invalid={filmInfoState.isTitleValid}
              onClick={() => clickInputHandler("change_title_status")}
            />
            <Label for="contactName">Назва фільму</Label>
            <FormFeedback invalid>
              Це поле є обовʼязковим для заповнення
            </FormFeedback>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup className="col-sm" floating>
            <Input
              id="filmYear"
              innerRef={yearRef}
              name="filmYear"
              type="number"
              max="2023"
              min="1800"
              invalid={filmInfoState.isYearValid}
              onClick={() => clickInputHandler("change_year_status")}
            />
            <Label for="contactEmail">Рік випуску</Label>
            <FormFeedback invalid>
              Це поле є обовʼязковим для заповнення
            </FormFeedback>
          </FormGroup>
        </Col>
      </Row>
      <FormGroup floating>
        <Input
          id="formatSelect"
          name="formatSelect"
          type="select"
          innerRef={formatRef}
        >
          <option value="VHS">VHS</option>
          <option value="DVD">DVD</option>
          <option value="Blu-ray">Blu-ray</option>
        </Input>
        <Label for="contactPhone">Формат</Label>
      </FormGroup>
      <FormGroup>
        <Label for="exampleText">
          Список акторів (У форматі: Ім'я та Прізвище актора через кому)
        </Label>
        <Input
          id="actorsText"
          innerRef={actorsRef}
          name="actorsText"
          type="textarea"
          placeholder="Andrii Fesiuk, Max Scherbachuk"
          invalid={filmInfoState.isTitleValid}
          onClick={() => clickInputHandler("change_actor_status")}
        />
      </FormGroup>
      <FormFeedback invalid>Це поле є обовʼязковим для заповнення</FormFeedback>
      <FormFeedback valid>Правильно!</FormFeedback>
      <Button color="primary" size="lg" type="submit">
        {isLoadingBtn === true ? (
          <Spinner size="sm" color="light" />
        ) : (
          "Додати фільм"
        )}
      </Button>
    </Form>
  );
}
export default AddForm;
