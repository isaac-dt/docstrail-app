import { UserAddress } from "../../generated/types/account/user/address.pb";
import { AppError } from "../../generated/types/common.pb";
/** Address service. */
export declare class AddressDataService {
    readonly db: FirebaseFirestore.Firestore;
    getAddress(args: {
        addressId: string;
    }): Promise<UserAddress | AppError>;
    createAddress(args: {
        addressData: Partial<UserAddress>;
    }): Promise<UserAddress | AppError>;
    updateAddressFields(args: {
        id: string;
        addressData: Partial<UserAddress>;
    }): Promise<UserAddress | AppError>;
}
