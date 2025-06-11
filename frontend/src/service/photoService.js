import { apiService, request } from "./apiService";

const PHOTO_ENDPOINT = "/photos";

const photoApiEndpoint = apiService(PHOTO_ENDPOINT);
export const photoService = {
  ...photoApiEndpoint,
  uploadPhoto: async (formData) => {
    const response = await request(PHOTO_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
    return response;
  },

  getPhotoByEntityAndRole: async (entityId, entityType, role) => {
    const response = await request(`${PHOTO_ENDPOINT}/entity/${entityId}`, {
      method: "GET",
      params: { entityType, role },
    });
    return response;
  },

  getPhotosByEntity: async (entityId, entityType) => {
    const response = await request(`${PHOTO_ENDPOINT}/entity/${entityId}`, {
      method: "GET",
      params: { entityType },
    });
    return response;
  },

  deletePhoto: async (photoId) => {
    const response = await request(`${PHOTO_ENDPOINT}/${photoId}`, {
      method: "DELETE",
    });
    return response;
  },
};
