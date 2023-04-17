import {CollectionSchema} from "../../shared/database/firestore-utils";
import validator from "validator";

/** Collection reference for firestore. */
export const TEAM_COLLECTION_NAME = "account-teams";

/** Validation schema for the teams collection. */
export const TEAM_COLLECTION_SCHEMA: CollectionSchema = {
  parent: {
    description: "parent of team should follow proto oneof format",
    pattern: (parent: any) => ["clientId", "teamId"].includes(parent.$case),
  },
  name: {
    description: "team name using [a-z ,.'-]",
    pattern: (name: string) => RegExp(/^[a-z ,.'-]+$/i).test(name),
    sanitize: (name: string) => validator.trim(name.toLocaleLowerCase()),
  },
};
