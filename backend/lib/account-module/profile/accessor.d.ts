import { Profile } from "../../generated/types/profile";
/** Database accessor */
export declare class ProfileFirebaseAccessor {
    readonly collectionPath = "account-profile";
    getProfile(phoneNumber: string): Promise<Partial<Profile> | undefined>;
}
