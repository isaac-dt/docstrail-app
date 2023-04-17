import {FieldPath} from "firebase-admin/firestore";

/** Work around for firebase error: "'IN' supports up to 30 comparison values."  */
export async function getContentById<T>(
  db: any,
  ids: string[],
  path: string
): Promise<T[]> {
  const BATCH_SIZE = 30;
  // don't run if there aren't any ids or a path for the collection
  if (!ids || !ids.length || !path) return [];

  const collectionPath = db.collection(path);
  const batches = [];

  while (ids.length) {
    // firestore limits batches to BATCH_SIZE
    const batch = ids.splice(0, BATCH_SIZE);

    // add the batch request to to a queue
    batches.push(
      collectionPath
        .where(FieldPath.documentId(), "in", [...batch])
        .get()
        .then((results: any) =>
          results.docs.map((result: any) => ({
            /* id: result.id, */ ...result.data(),
            id: result.id,
          }))
        )
    );
  }

  // after all of the data is fetched, return it
  return Promise.all(batches).then((content) => content.flat() as T[]);
}
