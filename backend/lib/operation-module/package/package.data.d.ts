import { AppError } from "../../generated/types/common.pb";
import { Package } from "../../generated/types/operation/package/package.pb";
import { JoinPackageOpenDefinitionRequest, JoinPackageOpenDefinitionResponse } from "../../generated/types/join/package-open-def.pb";
import { OpenDefinitionDataService } from "../../catalog-module/open-definition/open-definition.data";
/**
 * Manages operations on package data.
 */
export declare class PackageDataService {
    private readonly openDefDataService;
    readonly db: FirebaseFirestore.Firestore;
    constructor(openDefDataService: OpenDefinitionDataService);
    getPackage(args: {
        packageId: string;
    }): Promise<Package | AppError>;
    getPackagesFromIds(args: {
        packageIds: string[];
    }): Promise<readonly Package[]>;
    getPackagesOfTemplate(args: {
        templateId: string;
    }): Promise<readonly Package[]>;
    addOpenDefToPackage(args: JoinPackageOpenDefinitionRequest): Promise<JoinPackageOpenDefinitionResponse | AppError>;
    deleteOpenDefFromPackage(args: JoinPackageOpenDefinitionRequest): Promise<Date | AppError>;
    createPackage(args: {
        packageData: Partial<Package>;
    }): Promise<Package | AppError>;
    updatePackageFields(args: {
        id: string;
        packageData: Partial<Package>;
    }): Promise<Package | AppError>;
}
