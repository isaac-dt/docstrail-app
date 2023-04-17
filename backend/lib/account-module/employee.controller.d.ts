import { Request, Response } from "@dimetrail/firebase/core/https";
/** Controller for Employee requests. */
export declare class EmployeeController {
    readonly db: FirebaseFirestore.Firestore;
    getEmployee(req: Request, res: Response): Promise<Response>;
    createEmployee(req: Request, res: Response): Promise<Response>;
}
