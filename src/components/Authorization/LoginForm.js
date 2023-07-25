import classes from "./Authorization.module.css";
import { Form, Button } from "reactstrap";
import { Fragment, useRef, useReducer } from "react";
import FormGroupCustom from "../UI/FormGroupCustom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { USER_URL } from "../../asserts/urlLinks";
import { fetchUser } from "./fetchUser";

function loginReducer(state, action) {
  switch (action.type) {
    case "change_valid_email": {
      return {
        ...state,
        isEmailInvalid: action.status,
      };
    }
    case "change_valid_password": {
      return {
        ...state,
        isPasswordInvalid: action.status,
      };
    }
  }
}

function LoginForm(props) {
  const navigate = useNavigate();
  const [loginState, dispatchLogin] = useReducer(loginReducer, {
    isEmailInvalid: null,
    isPasswordInvalid: null,
  });

  const emailRef = useRef();
  const passwordRef = useRef();

  function checkValidation() {
    let validateStatus = true;
    const fieldsToValidate = [
      { ref: emailRef, type: "change_valid_email" },
      { ref: passwordRef, type: "change_valid_password" },
    ];
    fieldsToValidate.forEach((field) => {
      if (field.ref.current.value === "") {
        dispatchLogin({ type: field.type, status: true });
        validateStatus = false;
      }
    });
    return validateStatus;
  }

  async function getResponse(actorArr) {
    const response = await fetchUser(USER_URL, "createUser", {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    // if (response.status === 0) {
    //   (response.error.code === "NOT_UNIQUE" ||
    //     response.error.code === "MOVIE_EXISTS") &&
    //     setAlreadyExist(true);
    //   setSuccess(false);
    //   return false;
    // } else {
    //   cleanInput();
    //   return true;
    // }
  }

  function onLoginHandler() {
    if (checkValidation()) {
    }
  }

  return (
    <Fragment>
      <div className={classes.captionForm}>
        <span onClick={props.onChangeForm}>Реєстрація</span>
        <h4>Вхід</h4>
        <button>х</button>
      </div>
      <Form className={classes.formContainer}>
        <FormGroupCustom
          name="loginEmail"
          type="email"
          floating={true}
          ref={emailRef}
          invalid={loginState.isEmailInvalid}
          onClick={() => {
            dispatchLogin({ type: "change_valid_email", status: false });
          }}
        >
          E-mail
        </FormGroupCustom>
        <FormGroupCustom
          name="loginPassword"
          type="password"
          floating={true}
          ref={passwordRef}
          invalid={loginState.isPasswordInvalid}
          onClick={() => {
            dispatchLogin({ type: "change_valid_password", status: false });
          }}
        >
          Password
        </FormGroupCustom>
        <Button className="" onClick={onLoginHandler} color="primary" outline size="lg">
          Увійти
        </Button>
      </Form>
    </Fragment>
  );
}
export default LoginForm;
