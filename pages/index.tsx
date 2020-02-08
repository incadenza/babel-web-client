import React from "react";
import { NextPage } from "next";
import Link from "next/link";

const Index: NextPage = ({}) => {
  return (
    <div>
      <Link href="/login">
        <a>Login</a>
      </Link>
      |
      <Link href="/signup">
        <a>Sign up</a>
      </Link>
      <h1>Index</h1>
    </div>
  );
};

export default Index;
