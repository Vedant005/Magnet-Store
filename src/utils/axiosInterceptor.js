import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
});

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

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue requests while the token is being refreshed
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
        // Refresh the token
        const refreshResponse = await apiClient.post(
          "/users/refresh-token",
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshResponse.data.accessToken;

        // Notify all queued requests
        onRefreshed(newAccessToken);
        isRefreshing = false;

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;

        // Dispatch logout event for consistent handling
        window.dispatchEvent(new Event("forceLogout"));

        // Suppress "TokenExpired" errors by resolving the promise
        if (refreshError.response?.data?.message === "TokenExpired") {
          return Promise.resolve(null); // Silently resolve
        }

        // For other errors, suppress browser console logging
        return new Promise((resolve) => {
          window.dispatchEvent(new Event("forceLogout"));
          resolve(null); // Prevent unhandled promise rejection
        });
      }
    }

    // Suppress explicitly known errors
    if (error.response?.data?.message === "TokenExpired") {
      return Promise.resolve(); // Fully resolve the promise
    }

    return Promise.reject(error); // Propagate other errors
  }
);

export default apiClient;
