/** Work around for firebase error: "'IN' supports up to 30 comparison values."  */
export declare function getContentById<T>(db: any, ids: string[], path: string): Promise<T[]>;
