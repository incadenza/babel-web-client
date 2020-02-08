import React from "react";
import { NextPage } from "next";
import api from "../api";

const Index: NextPage = () => {
  return <h2>Hello world</h2>;
};

Index.getInitialProps = async () => {
  const res = await api.get("users/me").catch(e => e);
  console.log("res! ", res);
};

export default Index;
