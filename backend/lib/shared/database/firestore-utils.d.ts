/** A schema used for validating a Firestore field. */
export declare type CollectionSchema = {
    [entry: string]: {
        isOptional?: boolean;
        description: string;
        pattern: Function;
        sanitize?: (data: any) => any;
    };
};
/** Validation error container. */
declare type ValidationError = {
    field: string;
    description: string;
    value: any;
};
/** Returns a list of fields that failed validation. */
declare type ValidatorFunction = (data: any) => ValidationError[];
/** Returns the object with sanitized values. */
declare type SanitizationFunction = (data: any) => any;
/** Fetches parser functions for validation and sanitization. */
export declare function getDataParsers(args: {
    schema: CollectionSchema;
    onlyFields?: string[];
}): {
    validate: ValidatorFunction;
    sanitize: SanitizationFunction;
};
/** Returns a function to be used for sanitizing entries for a specific Firestore collection. */
export declare function getSanitizer(collectionSchema: CollectionSchema, fields?: string[]): SanitizationFunction;
/** Returns a function to be used for validating entries to a specific Firestore collection. */
export declare function getValidator(collectionSchema: CollectionSchema, fields?: string[]): ValidatorFunction;
export {};
