import React from "react";
import { NextPage } from "next";
import api from "../api";

const Index: NextPage = () => {
  return <h2>Hello world</h2>;
};

Index.getInitialProps = async () => {
  await api.get("users/me").catch(e => e);
};

export default Index;
