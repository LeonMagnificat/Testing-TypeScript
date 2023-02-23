import jwt from "jsonwebtoken";
import { AccomodationToken } from "../../api/accomodation/types";
import { Request } from "express";

export interface TokenPayload {
  _id: string;
  role: "Guest" | "Host";
}

export interface AccomodationRequest extends Request {
  accomodation?: AccomodationToken;
}

export const createAccessToken = (payload: TokenPayload): Promise<string> =>
  new Promise((resolve, reject) =>
    jwt.sign(payload, "mySecret", { expiresIn: "1 week" }, (err, token) => {
      if (err) reject(err);
      else resolve(token as string);
    })
  );

export const verifyAccessToken = (token: string): Promise<TokenPayload> =>
  new Promise((resolve, reject) =>
    jwt.verify(token, "mySecret", (err, originalPayload) => {
      if (err) reject(err);
      else resolve(originalPayload as TokenPayload);
    })
  );
