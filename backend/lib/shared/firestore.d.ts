/** Collection references for firestore. */
export declare const FIRESTORE_COLLECTION: {
    employee: string;
};
/** A schema used for validating a Firestore field. */
declare type CollectionSchema = {
    [entry: string]: {
        description: string;
        pattern: Function;
        sanitize?: (data: any) => any;
    };
};
/** Defines the validation patterns for a Firestore collection.  */
export declare type SchemaSet = Record<string, CollectionSchema>;
/** Validation error container. */
declare type ValidationError = {
    field: string;
    description: string;
    value: any;
};
/** Returns a list of fields that failed validation. */
declare type ValidatorFunction = (data: any) => ValidationError[];
/** Fetches parser functions for validation and sanitization. */
export declare function getDataParsers(schemaSet: SchemaSet, collection: string, fields?: string[]): {
    validate: ValidatorFunction;
    sanitize: (data: any) => any;
};
/** Returns a function to be used for sanitizing entries for a specific Firestore collection. */
export declare function getSanitizer(schemaSet: SchemaSet, collection: string, fields?: string[]): (data: any) => any;
/** Returns a function to be used for validating entries to a specific Firestore collection. */
export declare function getValidator(schemaSet: SchemaSet, collection: string, fields?: string[]): ValidatorFunction;
export {};
