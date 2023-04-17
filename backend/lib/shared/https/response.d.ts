import { AppError, ErrorCode } from "../../generated/types/common.pb";
/** Create a JsonResponse object to be sent back to the requestor. */
export declare function buildRes(args: {
    error?: ErrorCode;
    data?: any;
    appError?: AppError;
}): unknown;
