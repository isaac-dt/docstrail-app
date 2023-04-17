import {Injectable} from "@dimetrail/firebase/core/utils";
import {getDataParsers} from "../../../shared/database/firestore-utils";
import {getFirestore, FieldValue, DocumentData} from "firebase-admin/firestore";
import {AppError, ErrorCode} from "../../../generated/types/common.pb";
import {
  INVENTORY_BATCH_COLLECTION_NAME,
  INVENTORY_BATCH_COLLECTION_SCHEMA,
} from "./batch.schema";
import {InventoryBatch} from "../../../generated/types/catalog/inventory/batch.pb";
import {WriteInventoryBatchRequest} from "../../../generated/types/catalog/inventory/batch.api.pb";

/** Inventory Batch Data service. */
@Injectable()
export class InventoryBatchDataService {
  readonly db = getFirestore();

  async getBatch(args: {batchId: string}): Promise<InventoryBatch | AppError> {
    const batchSnap = await this.db
      .collection(INVENTORY_BATCH_COLLECTION_NAME)
      .doc(args.batchId)
      .get();
    const batch: Partial<InventoryBatch> | undefined = batchSnap.data();
    if (!batch) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {
          collection: INVENTORY_BATCH_COLLECTION_NAME,
          id: args.batchId,
        },
      });
    }
    return InventoryBatch.fromPartial({...batch, id: batchSnap.id});
  }

  async getInventoryBatchesOfProduct(args: {
    productId: string;
  }): Promise<readonly InventoryBatch[]> {
    const data = await this.db
      .collection(INVENTORY_BATCH_COLLECTION_NAME)
      .where("productId", "==", args.productId)
      .get();
    const batches = data.docs.map((doc) =>
      InventoryBatch.fromPartial({
        ...(doc.data() as Partial<InventoryBatch>),
        id: doc.id,
      })
    );
    return batches;
  }

  async createBatch(args: {
    batchData: Partial<InventoryBatch>;
  }): Promise<InventoryBatch | AppError> {
    const parser = getDataParsers({schema: INVENTORY_BATCH_COLLECTION_SCHEMA});
    const validationErrors = parser.validate(args.batchData);
    if (validationErrors.length) {
      throw AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedBatchData = WriteInventoryBatchRequest.fromPartial(
      parser.sanitize({
        ...args.batchData,
        createdAt: timestamp,
        updatedAt: timestamp,
      })
    );
    const batchRef = await this.db
      .collection(INVENTORY_BATCH_COLLECTION_NAME)
      .add(
        WriteInventoryBatchRequest.toJSON(sanitizedBatchData) as DocumentData
      );
    const batch = await this.getBatch({batchId: batchRef.id});
    if (!batch) return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return batch;
  }

  async updateBatchFields(args: {
    batchId: string;
    batchData: Partial<InventoryBatch>;
  }): Promise<InventoryBatch | AppError> {
    const batch = await this.getBatch({batchId: args.batchId});
    if (!batch) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {
          collection: INVENTORY_BATCH_COLLECTION_NAME,
          id: args.batchId,
        },
      });
    }
    const parser = getDataParsers({
      schema: INVENTORY_BATCH_COLLECTION_SCHEMA,
      onlyFields: Object.keys(args.batchData),
    });
    const validationErrors = parser.validate(args.batchData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedBatchData = WriteInventoryBatchRequest.fromPartial(
      parser.sanitize({
        ...args.batchData,
        updatedAt: timestamp,
      })
    );
    await this.db
      .collection(INVENTORY_BATCH_COLLECTION_NAME)
      .doc(args.batchId)
      .update(
        WriteInventoryBatchRequest.toJSON(sanitizedBatchData) as DocumentData
      );
    const updatedBatch = await this.getBatch({batchId: args.batchId});
    if (!updatedBatch)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return updatedBatch;
  }
}
