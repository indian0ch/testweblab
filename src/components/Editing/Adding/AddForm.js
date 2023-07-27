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
import { ADD_URL } from "../../../asserts/urlLinks";
import FormGroupCustom from "../../UI/FormGroupCustom";
import { checkValidation } from "../../Authorization/checkValidation-function";

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

    const fieldsToValidate = [
      { ref: titleRef, type: "change_title_status" },
      { ref: yearRef, type: "change_year_status" },
      { ref: actorsRef, type: "change_actor_status" },
    ];

    if (checkValidation(fieldsToValidate,dispatchInfo)) {
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
          <FormGroupCustom
            className="col-sm"
            name="filmTitle"
            ref={titleRef}
            type="name"
            floating={true}
            invalid={filmInfoState.isTitleValid}
            onClick={() => clickInputHandler("change_title_status")}
          >
            Назва фільму
          </FormGroupCustom>
        </Col>
        <Col md={6}>
          <FormGroupCustom
            className="col-sm"
            name="filmYear"
            ref={yearRef}
            type="number"
            floating={true}
            invalid={filmInfoState.isYearValid}
            onClick={() => clickInputHandler("change_year_status")}
            max="2021"
            min="1900"
          >
            Рік випуску
          </FormGroupCustom>
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
          <option value="Blu-ray">Blu-Ray</option>
        </Input>
        <Label for="contactPhone">Формат</Label>
      </FormGroup>
      <FormGroupCustom
        name="actorsText"
        ref={actorsRef}
        type="textarea"
        placeholder="Andrii Fesiuk, Max Scherbachuk"
        floating={false}
        invalid={filmInfoState.isActorValid}
        onClick={() => clickInputHandler("change_actor_status")}
      >
        Список акторів (У форматі: Ім'я та Прізвище актора через кому)
      </FormGroupCustom>

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
