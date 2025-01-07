import axios from "axios";

// Create Axios instance
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true, // Ensures cookies are sent with requests
});

// Track refresh token status and subscribers
let subscribers = [];
let isRefreshing = false;

const onRefreshed = (accessToken) => {
  subscribers.forEach((callback) => callback(accessToken));
  subscribers = [];
};

apiClient.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If a refresh request is already in progress, queue the current request
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
        // Attempt to refresh the access token
        await apiClient.post(
          "/users/refresh-token",
          {},
          { withCredentials: true }
        );
        onRefreshed(); // Notify subscribers
        isRefreshing = false;

        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;

        // Force logout if refresh fails
        window.dispatchEvent(new Event("forceLogout"));
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // Pass other errors through
  }
);
export default apiClient;
