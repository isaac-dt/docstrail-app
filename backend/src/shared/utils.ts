export function getDateFromFireTimestamp(fireTimestamp: any) {
  if (fireTimestamp === undefined) return undefined;
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(fireTimestamp._seconds);
  return t;
}
