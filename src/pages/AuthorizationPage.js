import ContainerWrapper from "../components/UI/ContainerWrapper";
// import { Outlet } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { useState } from "react";
import LoginForm from "../components/Authorization/LoginForm";
import RegisterForm from "../components/Authorization/RegisterForm";

function AuthorizationPage(props) {
  const [isLoginOpen, setLoginOpen] = useState(true);
  //   const location = useLocation();

  function onChangeFormHandler() {
    setLoginOpen(!isLoginOpen);
  }

  return (
    <ContainerWrapper>
      <h2 className="text-center">Вікно авторизації у системі</h2>
      {isLoginOpen === true ? (
        <LoginForm onChangeForm={onChangeFormHandler} />
      ) : (
        <RegisterForm />
      )}
    </ContainerWrapper>
  );
}
export default AuthorizationPage;
