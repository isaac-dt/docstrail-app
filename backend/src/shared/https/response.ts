import {
  AppError,
  ErrorCode,
  JsonResponse,
} from "../../generated/types/common.pb";

/** Create a JsonResponse object to be sent back to the requestor. */
export function buildRes(args: {
  error?: ErrorCode;
  data?: any;
  appError?: AppError;
}): unknown {
  const error =
    args.appError ||
    (args.error ? AppError.fromPartial({errorCode: args.error}) : undefined);
  const jsonResponse = JsonResponse.fromPartial({data: args.data, error});
  return jsonResponse;
}
