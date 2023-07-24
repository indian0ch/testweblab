import React from "react";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";

const FormGroupCustom = React.forwardRef((props, ref) => {
  return (
    <FormGroup className={props.class} floating={props.floating}>
      {props.floating === false && (
        <Label for={props.name}>{props.children}</Label>
      )}
      <Input
        id={props.name}
        innerRef={ref}
        name={props.name}
        type={props.type}
        onClick={props.onClick}
        invalid={props.invalid}
        valid={props.valid}
        max={props.max}
        min={props.min}
        placeholder={props.placeholder}
      />
      {props.floating && <Label for={props.name}>{props.children}</Label>}
      <FormFeedback invalid>Це поле є обовʼязковим для заповнення</FormFeedback>
    </FormGroup>
  );
});
export default FormGroupCustom;
