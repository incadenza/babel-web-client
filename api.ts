import ky from "ky-universal";
import cookie from "cookie";
import { NextPageContext } from "next";

const api = ky.create({
  prefixUrl: process.env.API_URL,
  credentials: "include"
});

const parseCookie = (req: NextPageContext["req"]) => {
  if (!req || !req.headers.cookie) return "";
  const cookies = cookie.parse(req.headers.cookie);
  if (cookies["connect.sid"])
    return cookie.serialize("connect.sid", cookies["connect.sid"]);
  return "";
};

export default api;

export const auth = (ctx: NextPageContext) => {
  const cookie = parseCookie(ctx.req);

  if (ctx.req && !cookie) {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
    return;
  }

  return cookie;
};
