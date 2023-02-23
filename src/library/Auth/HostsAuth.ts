import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { UserRequest } from "./JWTAuth";

export const hostsOnlyMiddleware: RequestHandler = (req: UserRequest, res, next) => {
  if (req.user!.role === "Host") {
    next();
  } else {
    next(createHttpError(403, "Host only endpoint!"));
  }
};
