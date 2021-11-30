import { Response } from "express";
import { Config } from "../config/config";

export const STATUS_OK = "ok";
export const STATUS_FAILED = "failed";

const conf: Config = new Config();
const isDevEnv: boolean = conf.nodeEnv === "DEV" ? true : false;

interface CustomResponse {
  ok: boolean;
  data: any[];
  status: number;
  count?: number;
  error?: any;
  code?: string;
  userMessage?: string;
  internalMessage?: string;
}

/**
 * Custom response to normalize all Responses.
 *
 * @param res  Response object.
 * @param ok Boolean arg.
 * @param status Code of the status response.
 * @param data Array of data, or string.
 * @param error Error.
 * @param count Count of the query. Optional.
 * @returns {CustomResponse} a CustomResponse object.
 */
export function ApiResponse(
  res: Response,
  ok: boolean,
  status: number,
  data: any | any[] = [],
  error?: any,
  count?: string
): Response<CustomResponse> {
  // chequeamos que sea un array, sino, lo convertimos en uno
  if (!Array.isArray(data)) data = [data];

  return ok
    ? res.status(status).json({
        ok,
        data,
        status,
        count: parseInt(count) || 0,
      })
    : res.status(status).json({
        ok: false,
        error: error
          ? isDevEnv
            ? error
            : "Error inesperado, intente nuevamente."
          : "",
        status,
        code: parseInt(error?.code),
        userMessage: error?.sqlMessage,
        internalMessage: error?.message,
      });
}

/**
1×× Informational
100 Continue
101 Switching Protocols
102 Processing

2×× Success
200 OK
201 Created
202 Accepted
203 Non-authoritative Information
204 No Content
205 Reset Content
206 Partial Content
207 Multi-Status
208 Already Reported
226 IM Used

3×× Redirection
300 Multiple Choices
301 Moved Permanently
302 Found
303 See Other
304 Not Modified
305 Use Proxy
307 Temporary Redirect
308 Permanent Redirect

4×× Client Error
400 Bad Request
401 Unauthorized
402 Payment Required
403 Forbidden
404 Not Found
405 Method Not Allowed
406 Not Acceptable
407 Proxy Authentication Required
408 Request Timeout
413 Payload Too Large
414 Request-URI Too Long
415 Unsupported Media Type
416 Requested Range Not Satisfiable

5×× Server Error
500 Internal Server Error
501 Not Implemented
502 Bad Gateway
503 Service Unavailable
504 Gateway Timeout
505 HTTP Version Not Supported
506 Variant Also Negotiates
507 Insufficient Storage
508 Loop Detected
510 Not Extended
511 Network Authentication Required
599 Network Connect Timeout Error
 */
