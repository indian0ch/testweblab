import React from "react";
import ContainerWrapper from "../components/UI/ContainerWrapper";

const ErrorPage = () => {
  return (
    <ContainerWrapper>
      <h1>Помилка!</h1>
      <p>
        Перевірте правильність налаштування образу, який ми використовуємо в
        якості сервера API.
      </p>
    </ContainerWrapper>
  );
};

export default ErrorPage;
