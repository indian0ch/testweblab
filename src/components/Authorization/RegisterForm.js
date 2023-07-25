import classes from "./Authorization.module.css";
import { Form, Button, Alert } from "reactstrap";
import { Fragment, useRef, useReducer, useState } from "react";
import FormGroupCustom from "../UI/FormGroupCustom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { USER_URL } from "../../asserts/urlLinks";
import { fetchUser } from "./fetchUser";
import { tokenLoaderActions } from "../../storage/tokenSlice";

function registerReducer(state, action) {
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
    case "change_valid_name": {
      return {
        ...state,
        isNameInvalid: action.status,
      };
    }
    case "change_valid_confirm": {
      return {
        ...state,
        isConfirmInvalid: action.status,
      };
    }
  }
}

function RegisterForm(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerState, dispatchRegister] = useReducer(registerReducer, {
    isEmailInvalid: null,
    isNameInvalid: null,
    isPasswordInvalid: null,
    isConfirmInvalid: null,
  });

  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [isSuccess, setSuccess] = useState(null);
  const [validationError, setValidationError] = useState("");

  function checkValidation() {
    let validateStatus = true;
    const fieldsToValidate = [
      { ref: emailRef, type: "change_valid_email" },
      { ref: passwordRef, type: "change_valid_password" },
      { ref: nameRef, type: "change_valid_name" },
      { ref: confirmPasswordRef, type: "change_valid_confirm" },
    ];

    fieldsToValidate.forEach((field) => {
      if (field.ref.current.value === "") {
        dispatchRegister({ type: field.type, status: true });
        validateStatus = false;
      }
    });

    return validateStatus;
  }

  async function getResponse() {
    const response = await fetchUser(USER_URL, {
      email: emailRef.current.value,
      name: nameRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    });

    if (response === "ServerError") {
      props.onResponseFail(false);
    } else {
      if (response.status === 0) {
        setSuccess(false);
        switch (response.error.code) {
          case "EMAIL_NOT_UNIQUE": {
            setValidationError(
              "Користувач з такою електронною поштою вже існує"
            );
            break;
          }
          case "FORMAT_ERROR": {
            setValidationError("Паролі не співпадають");
            break;
          }
        }
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

  function onRegisterHandler() {
    setSuccess(null);
    props.onResponseFail(true);
    setValidationError("");

    checkValidation() && getResponse();
  }

  return (
    <Fragment>
      <div className={classes.captionForm}>
        <h4>Реєстрація</h4>
      </div>
      <Form className={classes.formContainer}>
        <FormGroupCustom
          name="registerName"
          type="text"
          floating={true}
          ref={nameRef}
          invalid={registerState.isNameInvalid}
          onClick={() => {
            dispatchRegister({ type: "change_valid_name", status: false });
          }}
        >
          Імʼя та Прізвище
        </FormGroupCustom>
        <FormGroupCustom
          name="registerEmail"
          type="email"
          floating={true}
          ref={emailRef}
          invalid={registerState.isEmailInvalid}
          onClick={() => {
            dispatchRegister({ type: "change_valid_email", status: false });
          }}
        >
          E-mail
        </FormGroupCustom>
        <FormGroupCustom
          name="registerPassword"
          type="password"
          floating={true}
          ref={passwordRef}
          invalid={registerState.isPasswordInvalid}
          onClick={() => {
            dispatchRegister({ type: "change_valid_password", status: false });
          }}
        >
          Пароль
        </FormGroupCustom>
        <FormGroupCustom
          name="registerPasswordConfirm"
          type="password"
          floating={true}
          ref={confirmPasswordRef}
          invalid={registerState.isConfirmInvalid}
          onClick={() => {
            dispatchRegister({ type: "change_valid_confirm", status: false });
          }}
        >
          Підтвердження паролю
        </FormGroupCustom>
        <div className={classes.navForm}>
          <Button
            className=""
            onClick={onRegisterHandler}
            color="primary"
            outline
            size="lg"
          >
            Зареєструватися
          </Button>
          <span onClick={props.onChangeForm}>Вхід</span>
        </div>
      </Form>
      {isSuccess && (
        <Alert color="success" className="col-md-12 col-sm my-3">
          Реєстрація успішно виконано
        </Alert>
      )}
      {isSuccess === false ? (
        <Alert color="danger" className="col-md-12 col-sm my-3">
          {validationError}
        </Alert>
      ) : null}
    </Fragment>
  );
}
export default RegisterForm;
