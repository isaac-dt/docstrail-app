import {Injectable} from "@dimetrail/firebase/core/utils";
import {getDataParsers} from "../../../shared/database/firestore-utils";
import {getFirestore, FieldValue, DocumentData} from "firebase-admin/firestore";
import {
  COMPANY_COLLECTION_NAME,
  COMPANY_COLLECTION_SCHEMA,
} from "./company.schema";
import {AppError, ErrorCode} from "../../../generated/types/common.pb";
import {Company} from "../../../generated/types/catalog/distribution/company.pb";
import {WriteCompanyRequest} from "../../../generated/types/catalog/distribution/company.api.pb";
import {DistributionOutlet} from "../../../generated/types/catalog/distribution/distribution.pb";
import {DIST_OUTLET_COLLECTION_NAME} from "../distribution-outlet/dist-outlet.schema";

/** Company data service. */
@Injectable()
export class CompanyDataService {
  readonly db = getFirestore();

  async getCompany(args: {companyId: string}): Promise<Company | AppError> {
    const companySnap = await this.db
      .collection(COMPANY_COLLECTION_NAME)
      .doc(args.companyId)
      .get();
    const company: Partial<Company> | undefined = companySnap.data();
    if (!company) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {collection: COMPANY_COLLECTION_NAME, id: args.companyId},
      });
    }
    return Company.fromPartial({...company, id: companySnap.id});
  }

  async getDistOutlets(args: {
    companyId: string;
  }): Promise<readonly DistributionOutlet[]> {
    const data = await this.db
      .collection(DIST_OUTLET_COLLECTION_NAME)
      .where("companyId", "==", args.companyId)
      .get();
    const distOutlets = data.docs.map((doc) =>
      DistributionOutlet.fromPartial({
        ...(doc.data() as Partial<DistributionOutlet>),
        id: doc.id,
      })
    );
    return distOutlets;
  }

  async createCompany(args: {
    companyData: Partial<Company>;
  }): Promise<Company | AppError> {
    const parser = getDataParsers({schema: COMPANY_COLLECTION_SCHEMA});
    const validationErrors = parser.validate(args.companyData);
    if (validationErrors.length) {
      throw AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedCompanyData = WriteCompanyRequest.fromPartial(
      parser.sanitize({
        ...args.companyData,
        createdAt: timestamp,
        updatedAt: timestamp,
      })
    );
    const companyRef = await this.db
      .collection(COMPANY_COLLECTION_NAME)
      .add(WriteCompanyRequest.toJSON(sanitizedCompanyData) as DocumentData);
    const company = await this.getCompany({companyId: companyRef.id});
    if (!company) return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return company;
  }

  async updateCompanyFields(args: {
    companyId: string;
    companyData: Partial<Company>;
  }): Promise<Company | AppError> {
    const company = await this.getCompany({companyId: args.companyId});
    if (!company) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {collection: COMPANY_COLLECTION_NAME, id: args.companyId},
      });
    }
    const parser = getDataParsers({
      schema: COMPANY_COLLECTION_SCHEMA,
      onlyFields: Object.keys(args.companyData),
    });
    const validationErrors = parser.validate(args.companyData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedCompanyData = WriteCompanyRequest.fromPartial(
      parser.sanitize({
        ...args.companyData,
        updatedAt: timestamp,
      })
    );
    await this.db
      .collection(COMPANY_COLLECTION_NAME)
      .doc(args.companyId)
      .update(WriteCompanyRequest.toJSON(sanitizedCompanyData) as DocumentData);
    const updatedCompany = await this.getCompany({companyId: args.companyId});
    if (!updatedCompany)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return updatedCompany;
  }
}
