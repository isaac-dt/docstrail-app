import {Injectable} from "@dimetrail/firebase/core/utils";
import {FieldPath, getFirestore} from "firebase-admin/firestore";
import {DistributionOutlet} from "../../../generated/types/catalog/distribution/distribution.pb";
import {DIST_OUTLET_COLLECTION_NAME} from "./dist-outlet.schema";

/**
 * Contains openrations that could be used by several data services.
 */
@Injectable()
export class DistributionOutletSharedService {
  readonly db = getFirestore();

  async getDistOutletsFromIds(args: {
    distOutletIds: string[];
  }): Promise<readonly DistributionOutlet[]> {
    const data = await this.db
      .collection(DIST_OUTLET_COLLECTION_NAME)
      .where(FieldPath.documentId(), "in", args.distOutletIds)
      .get();
    const distOutlets = data.docs.map((doc) =>
      DistributionOutlet.fromPartial({
        ...(doc.data() as Partial<DistributionOutlet>),
        id: doc.id,
      })
    );
    return distOutlets;
  }
}
