import { apiService, request } from "./apiService";

const STARTUP_ENDPOINT = "/startups";

const startupApiEndpoint = apiService(STARTUP_ENDPOINT);
export const startupService = {
  ...startupApiEndpoint,
  getStartupbyOwnerId: async (ownerId) => {
    const response = await request(`${STARTUP_ENDPOINT}/owner/${ownerId}`, {
      method: "GET",
    });
    return response;
  },
  updateStartup: async (id, data) => {
    const response = await request(`${STARTUP_ENDPOINT}/${id}`, {
      method: "PUT",
      data: data,
    });
    return response;
  },
  deleteStartup: async (id) => {  
    const response = await request(`${STARTUP_ENDPOINT}/${id}`, {
      method: "DELETE",
    });
    return response;
  }
};
