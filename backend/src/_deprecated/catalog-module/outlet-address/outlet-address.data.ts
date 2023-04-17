import {Injectable} from "@dimetrail/firebase/core/utils";
import {getDataParsers} from "../../../shared/database/firestore-utils";
import {getFirestore, FieldValue, DocumentData} from "firebase-admin/firestore";
import {AppError, ErrorCode} from "../../../generated/types/common.pb";
import {OutletAddress} from "../../../generated/types/catalog/distribution/address.pb";
import {
  OUTLET_ADDRESS_COLLECTION_NAME,
  OUTLET_ADDRESS_COLLECTION_SCHEMA,
} from "./outlet-address.schema";
import {WriteOutletAddressRequest} from "../../../generated/types/catalog/distribution/address.api.pb";
import {DistributionOutletDataService} from "../distribution-outlet/dist-outlet.data";
import {WriteDistributionOutletRequest} from "../../../generated/types/catalog/distribution/distribution.api.pb";

/** Outlet Address service. */
@Injectable()
export class OutletAddressDataService {
  readonly db = getFirestore();

  constructor(
    private readonly distOutletDataService: DistributionOutletDataService
  ) {}

  async getOutletAddress(args: {
    outletAddressId: string;
  }): Promise<OutletAddress | AppError> {
    const addressSnap = await this.db
      .collection(OUTLET_ADDRESS_COLLECTION_NAME)
      .doc(args.outletAddressId)
      .get();
    const address: Partial<OutletAddress> | undefined = addressSnap.data();
    if (!address) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {
          collection: OUTLET_ADDRESS_COLLECTION_NAME,
          id: args.outletAddressId,
        },
      });
    }
    return OutletAddress.fromPartial({...address, id: addressSnap.id});
  }

  async createOutletAddress(args: {
    outletAddressData: Partial<OutletAddress>;
  }): Promise<OutletAddress | AppError> {
    const parser = getDataParsers({schema: OUTLET_ADDRESS_COLLECTION_SCHEMA});
    const validationErrors = parser.validate(args.outletAddressData);
    if (validationErrors.length) {
      throw AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedAddressData = WriteOutletAddressRequest.fromPartial(
      parser.sanitize({
        ...args.outletAddressData,
        createdAt: timestamp,
        updatedAt: timestamp,
      })
    );
    const addressRef = await this.db
      .collection(OUTLET_ADDRESS_COLLECTION_NAME)
      .add(
        WriteOutletAddressRequest.toJSON(sanitizedAddressData) as DocumentData
      );
    const addressPromise = this.getOutletAddress({
      outletAddressId: addressRef.id,
    });
    const updatedDistOutletPromise =
      this.distOutletDataService.updateDistOutletFields({
        distOutletId: args.outletAddressData.distributionOutletId!,
        distOutletData: WriteDistributionOutletRequest.fromPartial({
          physicalAddressId: addressRef.id,
        }),
      });
    const address = await addressPromise;
    const updatedDistOutlet = await updatedDistOutletPromise;
    if (!address || !updatedDistOutlet)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});

    return address;
  }

  async updateOutletAddressFields(args: {
    outletAddressId: string;
    outletAddressData: Partial<OutletAddress>;
  }): Promise<OutletAddress | AppError> {
    // TODO(edge case): Should update old and new dist outlet if foreign key is modified.
    const address = await this.getOutletAddress({
      outletAddressId: args.outletAddressId,
    });
    if (!address) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {
          collection: OUTLET_ADDRESS_COLLECTION_NAME,
          id: args.outletAddressId,
        },
      });
    }
    const parser = getDataParsers({
      schema: OUTLET_ADDRESS_COLLECTION_SCHEMA,
      onlyFields: Object.keys(args.outletAddressData),
    });
    const validationErrors = parser.validate(args.outletAddressData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedAddressData = WriteOutletAddressRequest.fromPartial(
      parser.sanitize({
        ...args.outletAddressData,
        updatedAt: timestamp,
      })
    );
    await this.db
      .collection(OUTLET_ADDRESS_COLLECTION_NAME)
      .doc(args.outletAddressId)
      .update(
        WriteOutletAddressRequest.toJSON(sanitizedAddressData) as DocumentData
      );
    const updatedAddress = await this.getOutletAddress({
      outletAddressId: args.outletAddressId,
    });
    if (!updatedAddress)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return updatedAddress;
  }
}
