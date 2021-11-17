import { Response } from "express";
import { Config } from "../config/config";

export const STATUS_OK = "ok";
export const STATUS_FAILED = "failed";

const conf: Config = new Config();
const isDevEnv: boolean = conf.nodeEnv === "DEV" ? true : false;

export function ApiResponse(
  res: Response,
  status: string,
  data: any | any[] = [],
  error?,
  count?: string
) {
  return status === "ok"
    ? res.json({
        ok: true,
        data,
        status,
        count: parseInt(count) || 0,
      })
    : res.json({
        ok: false,
        error: error ? (isDevEnv ? error : []) : [],
        status,
        code: error?.code,
        userMessage: error?.message,
        internalMessage: error?.sqlMessage,
      });
}
