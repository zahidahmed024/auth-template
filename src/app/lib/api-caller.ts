"use client";
import cook from "cookies-next";
interface FetchClientParams {
  url: string;
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

const fetchClient = async ({
  url,
  method = "GET",
  body = null,
  headers = {},
}: FetchClientParams): Promise<unknown> => {
  try {
    const accessToken = cook.getCookie("accessToken");
    console.log("cookieStore", accessToken);
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
        authorization: `Bearer ${accessToken}`,
      },
      // credentials: "include", // Include cookies in request
      cache: "no-store",
      body: body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(url, options);

    // If not OK and not unauthorized, throw error
    if (!response.ok && response.status !== 401) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }

    // If unauthorized, we need to refresh token
    if (response.status === 401) {
      // Try to refresh the token
      const refreshResponse = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      });

      // If refresh failed
      if (!refreshResponse.ok) {
        window.location.href = "/signin";
        throw new Error("Session expired. Please sign in again.");
      }

      // Retry the original request
      return fetchClient({ url, method, body, headers });
    }

    // For 204 No Content responses
    if (response.status === 204) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.log("error", error);
    throw new Error("Something went wrong");
  }
};

// Create convenience methods
export const apiCaller = {
  get: (url: string, headers?: Record<string, string>) =>
    fetchClient({ url, headers }),
  post: (url: string, body: object, headers?: Record<string, string>) =>
    fetchClient({ url, method: "POST", body, headers }),
  put: (url: string, body: object, headers?: Record<string, string>) =>
    fetchClient({ url, method: "PUT", body, headers }),
  delete: (url: string, headers?: Record<string, string>) =>
    fetchClient({ url, method: "DELETE", headers }),
};
