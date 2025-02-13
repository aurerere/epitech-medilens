import type { Hono } from "hono";

import type { bootDomains } from "./domains";

import { HonoRequestContext } from "../domains/user/modules/userSession/infrastructure/hono.requestContext";
import { Email } from "../domains/user/domain/values/email.value";
import { Password } from "../domains/user/domain/values/password";
import { Response } from "../framework/applicative/response";
import { Exception } from "../framework/applicative/exception";
import { Picture } from "../domains/conversation/domain/picture";

export function bootEndpoints(
  app: Hono,
  handlers: ReturnType<typeof bootDomains>,
) {
  app.post("/register", async (context) => {
    const json = await context.req.json();
    await handlers.registerHandler.handle(
      Email.parse(json.email),
      Password.parse(json.password),
    );

    const response = Response.ok("Registered");

    context.status(response.httpStatus);
    return context.json(response.serialize());
  });

  app.post("/login", async (context) => {
    const json = await context.req.json();
    await handlers.loginHandler.handle(
      new HonoRequestContext(context),
      Email.parse(json.email),
      Password.parse(json.password),
    );

    const response = Response.ok("Logged in");

    context.status(response.httpStatus);
    return context.json(response.serialize());
  });

  app.post("/conversation/create", async (context) => {
    await handlers.authenticationHandler.handle(
      new HonoRequestContext(context),
    );

    const body = await context.req.parseBody();

    const file = body["image"];

    if (!file || typeof file === "string") {
      throw Exception.internal();
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const picture = Picture.parse(file.type, buffer);
  });
}
