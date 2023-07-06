import { StatusCodes } from "http-status-codes"
import {
  Request,
  Response,
  ErrorRequestHandler,
  NextFunction,
  Errback,
} from "express"

const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = {
    statusCode: err.stausCodes ?? StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  }

  if (err.name === "CastError") {
    customError.statusCode = 404
    customError.msg = `No streamer found with id:${err.value}`
  }

  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware
