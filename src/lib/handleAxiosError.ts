import {AxiosError} from "axios";
import {ErrorResponse} from "../types/errorResponse";

export function handleAxiosError(error: AxiosError): never {
  if (error.response && error.response.data) {
    const responseData = error.response.data as ErrorResponse;

    const {type, message} = responseData;
    switch (type) {
      case "BadRequestException":
        throw new Error(message || "Bad request");
      case "NotAuthorizedException":
        throw new Error(message || "Not authorized");
      case "ResourceNotFoundException":
        throw new Error(message || "Resource not found");
      case "InternalServerException":
        throw new Error(message || "Unexpected error");
      default:
        throw new Error("Unknown error occurred");
    }
  } else {
    throw new Error("Network error occurred");
  }
}
