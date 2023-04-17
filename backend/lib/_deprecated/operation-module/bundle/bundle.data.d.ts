import { AppError } from "../../../generated/types/common.pb";
import { Bundle } from "../../../generated/types/operation/bundle/bundle.pb";
/**
 * Manages operations on bundle data.
 */
export declare class BundleDataService {
    readonly db: FirebaseFirestore.Firestore;
    getBundle(args: {
        bundleId: string;
    }): Promise<Bundle | AppError>;
    createBundle(args: {
        bundleData: Partial<Bundle>;
    }): Promise<Bundle | AppError>;
    updateBundleFields(args: {
        id: string;
        bundleData: Partial<Bundle>;
    }): Promise<Bundle | AppError>;
}
