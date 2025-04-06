import axios from "axios";
import ErrorHandler from "./errorHandler";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const apiPath = import.meta.env.VITE_API_PATH;
export const BASE_URL = `${backendUrl}${apiPath}`;

export const request = async (url, options = {}) => {
  try {
    const response = await axios({ url: `${BASE_URL}${url}`, ...options });
    return response.data;
  } catch (error) {
    ErrorHandler.handleError(error);
  }
};

export const apiService = (endpoint) => {
  return {
    get: (id) => request(`${endpoint}/${id}`),
    getAll: (page = 0, size = 0) =>
      request(endpoint, {
        params: { page, size },
      }),
    create: (data, contentType = "application/json") =>
      request(endpoint, {
        method: "POST",
        headers: { "Content-Type": contentType },
        data: data,
      }),
    update: (data) =>
      request(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        data: data,
      }),
    delete: () => request(endpoint, { method: "DELETE" }),
  };
};