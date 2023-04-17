import { Request, Response } from "@dimetrail/firebase/core/https";
/** Controller for Employee requests. */
export declare class EmployeeController {
    readonly db: FirebaseFirestore.Firestore;
    getEmployee(req: Request, res: Response): Promise<Response>;
    createOrUpdateEmployee(req: Request, res: Response): Promise<Response>;
    updateEmployeeFields(req: Request, res: Response): Promise<Response>;
    private readEmployee;
}
