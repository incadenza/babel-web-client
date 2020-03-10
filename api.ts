import ky from "ky-universal";
import cookie from "cookie";
import { NextPageContext } from "next";
import router from "next/router";

const api = ky.create({
  prefixUrl: process.env.API_URL,
  credentials: "include"
});

const parseServerCookie = ({ req }: NextPageContext) => {
  if (!req.headers.cookie) return "";
  const cookies = cookie.parse(req.headers.cookie);
  if (cookies["connect.sid"])
    return cookie.serialize("connect.sid", cookies["connect.sid"]);
  return "";
};

export const authenticatedRequest = async <R>(
  ctx: NextPageContext,
  route: string
) => {
  if (ctx.req) {
    const cookie = parseServerCookie(ctx);

    if (!cookie) {
      ctx.res.writeHead(302, { Location: "/login" });
      ctx.res.end();
      return;
    }

    return api
      .get(route, {
        headers: { cookie },
        hooks: {
          afterResponse: [
            (request, options, response) => {
              if (response.status === 401) {
                ctx.res.writeHead(302, { Location: "/login" });
                ctx.res.end();
              }
            }
          ]
        }
      })
      .json<R>();
  }

  return api
    .get(route, {
      hooks: {
        afterResponse: [
          (request, options, response) => {
            if (response.status === 401) {
              router.push("/login");
            }
          }
        ]
      }
    })
    .json<R>();
};

export const unauthenticatedRequest = async (
  ctx: NextPageContext,
  route: string
): Promise<void> => {
  if (ctx.req) {
    const cookie = parseServerCookie(ctx);

    await api.get(route, {
      headers: { cookie },
      hooks: {
        afterResponse: [
          (request, options, response) => {
            console.log("res!", response);
            if (response.status === 401) {
              return new Response("unauthenticated", { status: 200 });
            } else if (response.status === 200) {
              ctx.res.writeHead(302, { Location: "/bookmarks" });
              ctx.res.end();
            }
          }
        ]
      }
    });
  }

  await api.get(route, {
    hooks: {
      afterResponse: [
        (request, options, response) => {
          if (response.status === 401) {
            return new Response("unauthenticated", { status: 200 });
          } else if (response.status === 200) {
            router.push("/bookmarks");
          }
        }
      ]
    }
  });
};

export default api;
