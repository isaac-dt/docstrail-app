import { AppError } from "../../../generated/types/common.pb";
import { Company } from "../../../generated/types/catalog/distribution/company.pb";
import { DistributionOutlet } from "../../../generated/types/catalog/distribution/distribution.pb";
/** Company data service. */
export declare class CompanyDataService {
    readonly db: any;
    getCompany(args: {
        companyId: string;
    }): Promise<Company | AppError>;
    getDistOutlets(args: {
        companyId: string;
    }): Promise<readonly DistributionOutlet[]>;
    createCompany(args: {
        companyData: Partial<Company>;
    }): Promise<Company | AppError>;
    updateCompanyFields(args: {
        companyId: string;
        companyData: Partial<Company>;
    }): Promise<Company | AppError>;
}
