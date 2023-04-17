import { Request, Response } from "@dimetrail/firebase/core/https";
/** Express Middleware for authentication checks. Authentication data is saved in `Request.body.dtData`.*/
export declare function guard(req: Request, res: Response, next: Function): Promise<void>;
/** Express Middleware to block requests where the id param doesn't correspond to the requestor id. This has an exemption for system admin. */
export declare function fromSelfOrAdmin(req: Request, res: Response, next: Function): void;
export declare function fromAdmin(req: Request, res: Response, next: Function): void;
