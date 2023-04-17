import { Request, Response } from "@dimetrail/firebase/core/https";
/** Express Middleware for authentication checks. Authentication data is saved in `Request.body.dtData`.*/
export declare function guard(req: Request, res: Response, next: Function): Promise<void>;
