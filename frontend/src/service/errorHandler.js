import { toast } from "react-toastify";

class ErrorHandler {
  static handleError(error) {
    let errorMsg = "An unknown error occurred.";

    if (error.response) {
      const statusCode = error.response.status;
      const serverMessage = error.response.data.message;

      switch (statusCode) {
        case 409:
          errorMsg = serverMessage || "This email is already registered.";
          toast.error(errorMsg);
          break;
        case 400:
          errorMsg =
            serverMessage || "Invalid request. Please check your input.";

          if (errorMsg.startsWith("Validation failed for object='user'.")) {
            errorMsg = "The password you have entered is incorrect.";
          }
          toast.error(errorMsg);
          break;
        case 500:
          errorMsg = "Server error. Please try again later.";
          toast.error(errorMsg);
          break;
        default:
          errorMsg = `Error: ${serverMessage || "An error occurred."}`;
      }
    } else if (error.request) {
      errorMsg = "Error: No response from the server. Please try again.";
    } else {
      errorMsg = `Error: ${error.message}`;
    }

    console.error(errorMsg);

    return errorMsg;
  }
}

export default ErrorHandler;
