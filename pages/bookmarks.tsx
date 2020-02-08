import React from "react";
import { NextPage } from "next";
import api, { auth } from "../api";
import Navigation from "../components/Navigation";
import Tree from "../components/Tree";
import { schema, normalize } from "normalizr";

type Collection = {
  bookmarks: any;
  folders: any;
};

const Index: NextPage<Collection> = ({ folders, bookmarks }) => {
  return (
    <>
      <Navigation />
      <Tree folders={folders} />
      {bookmarks.map(b => (
        <p key={b.id}> - {b.name}</p>
      ))}
    </>
  );
};

Index.getInitialProps = async ctx => {
  try {
    const cookie = auth(ctx);
    const res = await api
      .get("folders", { headers: { cookie } })
      .json<Collection>();

    const folder = new schema.Entity("folders");
    const children = new schema.Array(folder);
    folder.define({ children });

    const normalized = normalize(res.folders, children);
    return {
      folders: normalized.entities.folders || {},
      bookmarks: res.bookmarks
    };
  } catch ({ response }) {
    console.log("error!"!, response);
    return { folders: {}, bookmarks: [] };
  }
};

export default Index;
