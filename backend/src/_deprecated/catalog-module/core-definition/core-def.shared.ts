import {Injectable} from "@dimetrail/firebase/core/utils";
import {FieldPath, getFirestore} from "firebase-admin/firestore";
import {CoreDefinition} from "../../../generated/types/catalog/core-definition/core-definition.pb";
import {CORE_DEFINITION_COLLECTION_NAME} from "./core-def.schema";

/**
 * Contains openrations that could be used by several data services.
 */
@Injectable()
export class CoreDefinitionSharedService {
  readonly db = getFirestore();

  async getCoreDefinitionsFromIds(args: {
    coreDefIds: string[];
  }): Promise<readonly CoreDefinition[]> {
    const data = await this.db
      .collection(CORE_DEFINITION_COLLECTION_NAME)
      .where(FieldPath.documentId(), "in", args.coreDefIds)
      .get();
    const coreDefs = data.docs.map((doc) =>
      CoreDefinition.fromPartial({
        ...(doc.data() as Partial<CoreDefinition>),
        id: doc.id,
      })
    );
    return coreDefs;
  }
}
