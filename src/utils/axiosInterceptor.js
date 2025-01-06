import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
});

// Remove direct store access from interceptor
let subscribers = [];
let isRefreshing = false;

const onRefreshed = (accessToken) => {
  subscribers.forEach((callback) => callback(accessToken));
  subscribers = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Wait for token refresh
        return new Promise((resolve) => {
          subscribers.push((accessToken) => {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            resolve(apiClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await apiClient.post("/users/refresh-token");
        const { accessToken } = response.data.data;

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        onRefreshed(accessToken);
        isRefreshing = false;

        return apiClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        // Let the store handle the logout
        window.dispatchEvent(new Event("forceLogout"));
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

apiClient.interceptors.request.use(
  (config) => {
    // Get token from cookie
    const cookies = document.cookie.split(";");
    const accessToken = cookies
      .find((cookie) => cookie.trim().startsWith("accessToken="))
      ?.split("=")[1];

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default apiClient;
