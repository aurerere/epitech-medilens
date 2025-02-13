import { Hono } from "hono";
import { logger } from "hono/logger";
import { serve } from "@hono/node-server";

import type {
  ErrorResponseKind,
  Response,
} from "./framework/applicative/response";
import type { HttpError } from "./framework/applicative/status";
import { Exception } from "./framework/applicative/exception";
import { bootDomains } from "./boot/domains";
import { bootEndpoints } from "./boot/endpoints";

const app = new Hono();

app.use(logger());

app.onError(async (error, context) => {
  let response: Response<false, HttpError, ErrorResponseKind>;

  if (error instanceof Exception) {
    response = error.toResponse();
  } else {
    response = Exception.internal({ received: error }).toResponse();
  }

  context.status(response.httpStatus);
  return context.json(response.serialize());
});

const API_BASE_URL = "/api";

const api = new Hono();

const handlers = bootDomains();

bootEndpoints(api, handlers);

app.route(API_BASE_URL, api);

serve(
  {
    fetch: app.fetch,
    port: 1337,
  },
  console.log,
);
