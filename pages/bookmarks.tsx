import React from "react";
import { NextPage } from "next";
import { authenticatedRequest } from "../api";

type Collection = {
  bookmarks: any;
  folders: any;
};

const Index: NextPage<Collection> = ({ folders, bookmarks }) => {
  return (
    <div>
      <h1>Bookmarks</h1>
    </div>
  );
};

Index.getInitialProps = async ctx => {
  return authenticatedRequest<Collection>(ctx, "folders");
};

export default Index;
