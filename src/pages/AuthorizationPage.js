import ContainerWrapper from "../components/UI/ContainerWrapper";
import { useState } from "react";
import LoginForm from "../components/Authorization/LoginForm";
import RegisterForm from "../components/Authorization/RegisterForm";
import { Alert } from "reactstrap";
import { useDispatch } from "react-redux";
import { tokenLoaderActions } from "../storage/tokenSlice";

function AuthorizationPage(props) {
  const dispatch=useDispatch();
  const [isLoginOpen, setLoginOpen] = useState(true);
  const [isResponseOk, setResponseOk] = useState(null);

  function onChangeFormHandler() {
    setLoginOpen(!isLoginOpen);
  }

  function onResponseFailHandler(status) {
    setResponseOk(status);
  }

  function onLogInHandler(status) {
    dispatch(tokenLoaderActions.setLogin(true));
  }

  return (
    <ContainerWrapper>
      <h2 className="text-center my-5">Вікно авторизації у системі</h2>
      {isLoginOpen === true ? (
        <LoginForm
          onChangeForm={onChangeFormHandler}
          onResponseFail={onResponseFailHandler}
          onLogIn={onLogInHandler}
        />
      ) : (
        <RegisterForm
          onChangeForm={onChangeFormHandler}
          onResponseFail={onResponseFailHandler}
          onLogIn={onLogInHandler}
        />
      )}
      {isResponseOk === false ? (
        <Alert color="danger" className="col-md-12 col-sm my-3">
          Перевірте правильність налаштування образу, який ми використовуємо в
          якості сервера API.
        </Alert>
      ) : null}
    </ContainerWrapper>
  );
}
export default AuthorizationPage;
