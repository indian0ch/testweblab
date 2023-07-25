export function checkValidation(fieldsArr, dispatchFunction) {
  let validateStatus = true;

  fieldsArr.forEach((field) => {
    if (field.ref.current.value === "") {
      dispatchFunction({ type: field.type, status: true });
      validateStatus = false;
    }
  });

  return validateStatus;
}
