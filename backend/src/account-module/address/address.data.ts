import {Injectable} from "../../../framework/core/utils";
import {UserAddress} from "../../generated/types/account/user/address.pb";
import {getDataParsers} from "../../shared/database/firestore-utils";
import {getFirestore, FieldValue, DocumentData} from "firebase-admin/firestore";
import {
  ADDRESS_COLLECTION_NAME,
  ADDRESS_COLLECTION_SCHEMA,
} from "./address.schema";
import {AppError, ErrorCode} from "../../generated/types/common.pb";
import {WriteUserAddressRequest} from "../../generated/types/account/user/address.api.pb";

/** Address service. */
@Injectable()
export class AddressDataService {
  readonly db = getFirestore();

  async getAddress(args: {addressId: string}): Promise<UserAddress | AppError> {
    const addressSnap = await this.db
      .collection(ADDRESS_COLLECTION_NAME)
      .doc(args.addressId)
      .get();
    const address: Partial<UserAddress> | undefined = addressSnap.data();
    if (!address) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {collection: ADDRESS_COLLECTION_NAME, id: args.addressId},
      });
    }
    return UserAddress.fromPartial({...address, id: addressSnap.id});
  }

  async createAddress(args: {
    addressData: Partial<UserAddress>;
  }): Promise<UserAddress | AppError> {
    const parser = getDataParsers({schema: ADDRESS_COLLECTION_SCHEMA});
    const validationErrors = parser.validate(args.addressData);
    if (validationErrors.length) {
      throw AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedAddressData = WriteUserAddressRequest.fromPartial(
      parser.sanitize({
        ...args.addressData,
        createdAt: timestamp,
        updatedAt: timestamp,
      })
    );
    const addressRef = await this.db
      .collection(ADDRESS_COLLECTION_NAME)
      .add(
        WriteUserAddressRequest.toJSON(sanitizedAddressData) as DocumentData
      );
    const address = await this.getAddress({addressId: addressRef.id});
    if (!address) return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return address;
  }

  async updateAddressFields(args: {
    id: string;
    addressData: Partial<UserAddress>;
  }): Promise<UserAddress | AppError> {
    const address = await this.getAddress({addressId: args.id});
    if (!address) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {collection: ADDRESS_COLLECTION_NAME, id: args.id},
      });
    }
    const parser = getDataParsers({
      schema: ADDRESS_COLLECTION_SCHEMA,
      onlyFields: Object.keys(args.addressData),
    });
    const validationErrors = parser.validate(args.addressData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedAddressData = WriteUserAddressRequest.fromPartial(
      parser.sanitize({
        ...args.addressData,
        updatedAt: timestamp,
      })
    );
    await this.db
      .collection(ADDRESS_COLLECTION_NAME)
      .doc(args.id)
      .update(
        WriteUserAddressRequest.toJSON(sanitizedAddressData) as DocumentData
      );
    const updatedAddress = await this.getAddress({addressId: args.id});
    if (!updatedAddress)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return updatedAddress;
  }
}
