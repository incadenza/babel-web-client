import React from "react";
import { useField } from "formik";

type Props = {
  id: string;
  label: string;
  name: string;
  type: "email" | "text" | "password";
  placeholder: string;
};

const Input: React.FC<Props> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error && <div>{meta.error}</div>}
    </>
  );
};

export default Input;
