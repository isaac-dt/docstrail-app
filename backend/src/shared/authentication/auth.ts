import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {Request, Response} from "@dimetrail/firebase/core/https";
import {AuthData, JwtUserData} from "../../generated/types/common.pb";

/** Express Middleware for authentication checks. Authentication data is saved in `Request.body.dtData`.*/
export async function guard(req: Request, res: Response, next: Function) {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    functions.logger.debug("403", "unauthorized", "jwtoken not found");
    res.status(403).send("Unauthorized");
    return;
  }
  const idToken = req.headers.authorization.split("Bearer ")[1];
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    const jwtUserData = JwtUserData.fromPartial({
      id: decoded.uid,
      fullName: decoded.name,
      email: decoded.email,
      isEmailVerified: decoded.email_verified,
    });
    const authData = AuthData.fromPartial({user: jwtUserData});
    req.body.authData = authData;
    next();
  } catch (e) {
    functions.logger.debug("403", "unauthorized", e);
    res.status(403).send("Unauthorized");
  }
}
