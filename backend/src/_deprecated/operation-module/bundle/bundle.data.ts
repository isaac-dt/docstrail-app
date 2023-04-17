import {Injectable} from "@dimetrail/firebase/core/utils";
import {getDataParsers} from "../../../shared/database/firestore-utils";
import {getFirestore, FieldValue, DocumentData} from "firebase-admin/firestore";
import {AppError, ErrorCode} from "../../../generated/types/common.pb";
import {Bundle} from "../../../generated/types/operation/bundle/bundle.pb";
import {
  BUNDLE_COLLECTION_NAME,
  BUNDLE_COLLECTION_SCHEMA,
} from "./bundle.schema";
import {WriteBundleRequest} from "../../../generated/types/operation/bundle/bundle.api.pb";

/**
 * Manages operations on bundle data.
 */
@Injectable()
export class BundleDataService {
  readonly db = getFirestore();

  async getBundle(args: {bundleId: string}): Promise<Bundle | AppError> {
    const bundleSnap = await this.db
      .collection(BUNDLE_COLLECTION_NAME)
      .doc(args.bundleId)
      .get();
    const bundle: Partial<Bundle> | undefined = bundleSnap.data();
    if (!bundle)
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {collection: BUNDLE_COLLECTION_NAME, id: args.bundleId},
      });
    return Bundle.fromJSON({...bundle, id: bundleSnap.id});
  }

  async createBundle(args: {
    bundleData: Partial<Bundle>;
  }): Promise<Bundle | AppError> {
    const parser = getDataParsers({schema: BUNDLE_COLLECTION_SCHEMA});
    const validationErrors = parser.validate(args.bundleData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedBundleData = WriteBundleRequest.fromPartial(
      parser.sanitize({
        ...args.bundleData,
        createdAt: timestamp,
        updatedAt: timestamp,
      })
    );
    const bundleRef = await this.db
      .collection(BUNDLE_COLLECTION_NAME)
      .add(WriteBundleRequest.toJSON(sanitizedBundleData) as DocumentData);
    const bundle = await this.getBundle({bundleId: bundleRef.id});
    if (!bundle) return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return bundle;
  }

  async updateBundleFields(args: {
    id: string;
    bundleData: Partial<Bundle>;
  }): Promise<Bundle | AppError> {
    const bundle = await this.getBundle({bundleId: args.id});
    if (!bundle) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {collection: BUNDLE_COLLECTION_NAME, id: args.id},
      });
    }
    const parser = getDataParsers({
      schema: BUNDLE_COLLECTION_SCHEMA,
      onlyFields: Object.keys(args.bundleData),
    });
    const validationErrors = parser.validate(args.bundleData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedBundleData = WriteBundleRequest.fromPartial(
      parser.sanitize({
        ...args.bundleData,
        updatedAt: timestamp,
      })
    );
    await this.db
      .collection(BUNDLE_COLLECTION_NAME)
      .doc(args.id)
      .update(WriteBundleRequest.toJSON(sanitizedBundleData) as DocumentData);
    const updatedBundle = await this.getBundle({bundleId: args.id});
    if (!updatedBundle)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return updatedBundle;
  }
}
