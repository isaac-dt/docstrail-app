import {Injectable} from "@dimetrail/firebase/core/utils";
import {getDataParsers} from "../../../shared/database/firestore-utils";
import {getFirestore, FieldValue, DocumentData} from "firebase-admin/firestore";
import {AppError, ErrorCode} from "../../../generated/types/common.pb";
import {Product} from "../../../generated/types/catalog/product/product.pb";
import {
  PRODUCT_COLLECTION_NAME,
  PRODUCT_COLLECTION_SCHEMA,
} from "./product.schema";
import {WriteProductRequest} from "../../../generated/types/catalog/product/product.api.pb";

/** Product service. */
@Injectable()
export class ProductDataService {
  readonly db = getFirestore();

  async getProduct(args: {productId: string}): Promise<Product | AppError> {
    const productSnap = await this.db
      .collection(PRODUCT_COLLECTION_NAME)
      .doc(args.productId)
      .get();
    const product: Partial<Product> | undefined = productSnap.data();
    if (!product) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {collection: PRODUCT_COLLECTION_NAME, id: args.productId},
      });
    }
    return Product.fromPartial({...product, id: productSnap.id});
  }

  async createProduct(args: {
    productData: Partial<Product>;
  }): Promise<Product | AppError> {
    const parser = getDataParsers({schema: PRODUCT_COLLECTION_SCHEMA});
    const validationErrors = parser.validate(args.productData);
    if (validationErrors.length) {
      throw AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedProductData = WriteProductRequest.fromPartial(
      parser.sanitize({
        ...args.productData,
        createdAt: timestamp,
        updatedAt: timestamp,
      })
    );
    const productRef = await this.db
      .collection(PRODUCT_COLLECTION_NAME)
      .add(WriteProductRequest.toJSON(sanitizedProductData) as DocumentData);
    const product = await this.getProduct({productId: productRef.id});
    if (!product) return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return product;
  }

  async updateProductFields(args: {
    productId: string;
    productData: Partial<Product>;
  }): Promise<Product | AppError> {
    const product = await this.getProduct({productId: args.productId});
    if (!product) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {collection: PRODUCT_COLLECTION_NAME, id: args.productId},
      });
    }
    const parser = getDataParsers({
      schema: PRODUCT_COLLECTION_SCHEMA,
      onlyFields: Object.keys(args.productData),
    });
    const validationErrors = parser.validate(args.productData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedProductData = WriteProductRequest.fromPartial(
      parser.sanitize({
        ...args.productData,
        updatedAt: timestamp,
      })
    );
    await this.db
      .collection(PRODUCT_COLLECTION_NAME)
      .doc(args.productId)
      .update(WriteProductRequest.toJSON(sanitizedProductData) as DocumentData);
    const updatedProduct = await this.getProduct({productId: args.productId});
    if (!updatedProduct)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return updatedProduct;
  }
}
