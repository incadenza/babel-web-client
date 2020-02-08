import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import api from "../api";
import * as Yup from "yup";
import { NextPage } from "next";
import router from "next/router";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string().required("Required")
});

const Login: NextPage = () => {
  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={async values => {
          await api.post("users/login", { json: { ...values } });
          await router.push("/bookmarks");
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

Login.getInitialProps = async () => {
  try {
    await api.get("users/me");
    return {};
  } catch {
    return {};
  }
};

export default Login;
