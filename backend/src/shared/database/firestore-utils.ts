/** A schema used for validating a Firestore field. */
export type CollectionSchema = {
  [entry: string]: {
    isOptional?: boolean;
    description: string;
    pattern: Function;
    sanitize?: (data: any) => any;
  };
};

/** Validation error container. */
type ValidationError = {field: string; description: string; value: any};

/** Returns a list of fields that failed validation. */
type ValidatorFunction = (data: any) => ValidationError[];

/** Returns the object with sanitized values. */
type SanitizationFunction = (data: any) => any;

/** Fetches parser functions for validation and sanitization. */
export function getDataParsers(args: {
  schema: CollectionSchema;
  onlyFields?: string[];
}) {
  return {
    validate: getValidator(args.schema, args.onlyFields),
    sanitize: getSanitizer(args.schema, args.onlyFields),
  };
}

/** Returns a function to be used for sanitizing entries for a specific Firestore collection. */
export function getSanitizer(
  collectionSchema: CollectionSchema,
  fields?: string[]
): SanitizationFunction {
  const func = (data: any) => {
    const sanitizedData: any = data;
    let schema: any = {};
    if (fields && fields.length) {
      for (const field of Object.keys(collectionSchema)) {
        if (fields.includes(field)) schema[field] = collectionSchema[field];
      }
    } else {
      schema = Object.assign({}, collectionSchema);
    }
    for (const field of Object.keys(schema)) {
      sanitizedData[field] = schema[field].sanitize
        ? /* eslint-disable */
          schema[field].sanitize!(data[field])
        : data[field];
    }
    return sanitizedData;
  };
  return func;
}

/** Returns a function to be used for validating entries to a specific Firestore collection. */
export function getValidator(
  collectionSchema: CollectionSchema,
  fields?: string[]
): ValidatorFunction {
  const func = (data: any) => {
    const invalidFields: ValidationError[] = [];
    let schema: any = {};
    if (fields && fields.length) {
      for (const field of Object.keys(collectionSchema)) {
        if (fields.includes(field)) schema[field] = collectionSchema[field];
      }
    } else {
      schema = Object.assign({}, collectionSchema);
    }
    for (const field of Object.keys(schema)) {
      const isInvalid =
        (data[field] === undefined && !schema[field].isOptional) ||
        !schema[field].pattern(data[field]);
      if (isInvalid)
        invalidFields.push({
          field,
          description: schema[field].description,
          value: data[field] || "Not found",
        });
    }
    return invalidFields;
  };
  return func;
}
