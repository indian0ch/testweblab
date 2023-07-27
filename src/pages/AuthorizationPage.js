import ContainerWrapper from "../components/UI/ContainerWrapper";
import { useState } from "react";
import LoginForm from "../components/Authorization/LoginForm";
import RegisterForm from "../components/Authorization/RegisterForm";
import { Alert } from "reactstrap";
import { useDispatch } from "react-redux";
import { tokenLoaderActions } from "../storage/tokenSlice";
import { useSearchParams } from "react-router-dom";

function AuthorizationPage(props) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const isLoginOpen = searchParams.get("mode") === "signin";

  const [isResponseOk, setResponseOk] = useState(null);

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
          onResponseFail={onResponseFailHandler}
          onLogIn={onLogInHandler}
        />
      ) : (
        <RegisterForm
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
