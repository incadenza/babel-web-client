import React from "react";
import { NextPage } from "next";
import { unauthenticatedRequest } from "../api";

const Login: NextPage = () => {
  return (
    <div>
      <h1>Login</h1>
    </div>
  );
};

Login.getInitialProps = async ctx => {
  await unauthenticatedRequest(ctx, "users/me");
  return {};
};

export default Login;
