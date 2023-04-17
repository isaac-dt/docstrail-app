import * as functions from "firebase-functions";
import {Request, Response} from "../../../framework/core/https";

/** Logger middleware. */
export function readPath(req: Request, _: Response, next: Function) {
  functions.logger.debug(`method:${req.method} path:${req.path}`);
  next();
}
