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
import { ADD_URL as url } from "../../../asserts/urlLinks";
import FormGroupCustom from "../../UI/FormGroupCustom";
import { checkValidation } from "../../Authorization/checkValidation-function";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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
  const [moviesCount, setMoviesCount] = useState(null);

  const token = useSelector((state) => state.tokenLoader.tokenJwt);

  function clickInputHandler(typeString) {
    dispatchInfo({ type: typeString, status: false });
  }

  function cleanInput() {
    setSuccess(true);
    setTimeout(() => {
      navigate("/1");
    }, 2000);
  }

  async function getResponse(actorArr) {
    const responsePost = await postFilm(url, token, {
      title: titleRef.current.value,
      year: yearRef.current.value,
      format: formatRef.current.value,
      actors: actorArr,
    });

    if (responsePost.status === 0) {
      (responsePost.error.code === "NOT_UNIQUE" ||
        responsePost.error.code === "MOVIE_EXISTS") &&
        setAlreadyExist(true);
      setSuccess(false);
      return false;
    } else {
      setMoviesCount(responsePost.data.id);
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

    if (checkValidation(fieldsToValidate, dispatchInfo)) {
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
          Фільм з назвою <b>{titleRef.current.value}</b> успішно додано!{" "}
          <br></br> За весь час додали {moviesCount} фільмів
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
