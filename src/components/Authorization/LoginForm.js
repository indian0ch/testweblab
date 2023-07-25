import classes from "./Authorization.module.css";
import { Form, Button, Alert } from "reactstrap";
import { Fragment, useRef, useReducer, useState } from "react";
import FormGroupCustom from "../UI/FormGroupCustom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SESSION_URL } from "../../asserts/urlLinks";
import { fetchUser } from "./fetchUser";
import { tokenLoaderActions } from "../../storage/tokenSlice";

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
  const dispatch = useDispatch();
  const [loginState, dispatchLogin] = useReducer(loginReducer, {
    isEmailInvalid: null,
    isPasswordInvalid: null,
  });

  const emailRef = useRef();
  const passwordRef = useRef();
  const [isSuccess, setSuccess] = useState(null);

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

  async function getResponse() {
    const response = await fetchUser(SESSION_URL, {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    if (response === "ServerError") {
      props.onResponseFail(false);
    } else {
      if (response.status === 0) {
        setSuccess(false);
      } else {
        setSuccess(true);
        props.onResponseFail(true);
        setTimeout(() => {
          dispatch(tokenLoaderActions.setToken(response.token));
          props.onLogIn();
          navigate("/1");
        }, 1000);
      }
    }
  }

  function onLoginHandler() {
    setSuccess(null);
    props.onResponseFail(true);
    if (checkValidation()) {
      getResponse();
    }
  }

  return (
    <Fragment>
      <div className={classes.captionForm}>
        <h4>Вхід</h4>
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
        <div className={classes.navForm}>
          <Button
            className=""
            onClick={onLoginHandler}
            color="primary"
            outline
            size="lg"
          >
            Увійти
          </Button>
          <span onClick={props.onChangeForm}>Реєстрація</span>
        </div>
      </Form>
      {isSuccess && (
        <Alert color="success" className="col-md-12 col-sm my-3">
          Вхід успішно виконано
        </Alert>
      )}
      {isSuccess === false ? (
        <Alert color="danger" className="col-md-12 col-sm my-3">
          Неправильний email або пароль...
        </Alert>
      ) : null}
    </Fragment>
  );
}
export default LoginForm;
