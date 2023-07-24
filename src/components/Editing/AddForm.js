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
  Alert,
} from "reactstrap";
import { postFilm } from "./postFilm";
import { validateActors } from "./validateActors";
import { ADD_URL } from "../storage/urlLinks";

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
  const [isSuccess, setSuccess] = useState(null);
  const [isAlreadyExist, setAlreadyExist] = useState(null);

  const token = useSelector((state) => state.tokenLoader.tokenJwt);

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
    return validateStatus;
  }

  function cleanInput() {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(null);
    }, 2000);

    titleRef.current.value = "";
    yearRef.current.value = "";
    actorsRef.current.value = "";
  }

  async function getResponse(actorArr) {
    const response = await postFilm(ADD_URL, token, {
      title: titleRef.current.value,
      year: yearRef.current.value,
      format: formatRef.current.value,
      actors: actorArr,
    });

    if (response.status === 0) {
      (response.error.code === "NOT_UNIQUE" ||
        response.error.code === "MOVIE_EXISTS") &&
        setAlreadyExist(true);
      setSuccess(false);
      return false;
    } else {
      cleanInput();
      return true;
    }
  }

  function onSubmitHandler(event) {
    event.preventDefault();

    setAlreadyExist(false);
    setTimeout(() => {
      setIsLoadingBtn(false);
    }, 1000);
    setIsLoadingBtn(true);

    if (checkValidation()) {
      const validatedActorArr = validateActors(actorsRef.current.value);
      if (validatedActorArr) {
        getResponse(validatedActorArr);
      }
    } else {
      setSuccess(false);
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
              max="2021"
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
          invalid={filmInfoState.isActorValid}
          onClick={() => clickInputHandler("change_actor_status")}
        />
        <FormFeedback invalid>
          Це поле є обовʼязковим для заповнення
        </FormFeedback>
      </FormGroup>
      <FormFeedback valid>Правильно!</FormFeedback>
      <Button color="primary" size="lg" type="submit">
        {isLoadingBtn === true ? (
          <Spinner size="sm" color="light" />
        ) : (
          "Додати фільм"
        )}
      </Button>
      {isSuccess && (
        <Alert color="success" className="col-md-12 col-sm my-3">
          Фільм успішно додано
        </Alert>
      )}
      {isAlreadyExist === true ? (
        <Alert color="danger" className="col-md-12 col-sm my-3">
          Фільм з такою назвою вже існує
        </Alert>
      ) : null}
      {isSuccess === false ? (
        <Alert color="danger" className="col-md-12 col-sm my-3">
          Помилка надсилання...
        </Alert>
      ) : null}
    </Form>
  );
}
export default AddForm;
