import React from "react";
import { NextPage } from "next";
import { unauthenticatedRequest } from "../api";
import styled from "styled-components";

const Header = styled.h1`
  color: red;
`;

const Signup: NextPage = () => {
  return (
    <div>
      <Header>Signup</Header>
    </div>
  );
};

Signup.getInitialProps = async ctx => {
  await unauthenticatedRequest(ctx, "users/me");
  return {};
};

export default Signup;
