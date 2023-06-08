import { getCookie, setCookie } from "cookies-next";
import { IncomingMessage, ServerResponse } from "http";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { v4 as uuid } from "uuid";

export function getCartId({
  req,
  res,
}: {
  req: IncomingMessage & {
    cookies: NextApiRequestCookies;
  };
  res: ServerResponse;
}) {
  let cartId = getCookie("cartId", { req, res});
  if(!cartId) {
    const id = uuid();
    setCookie("cartId", id, { req, res });
    cartId = id;
  }
  return String(cartId);
}