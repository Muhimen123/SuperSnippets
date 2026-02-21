import { API_ROUTES } from "@/utility/constants";

export const fetchAllNotifications = async (userId) => {
  const endpoint = API_ROUTES.NOTIFICATION.FETCH_ALL;

  if (!userId) {
    console.error("fetchNotifications: userId is required");
    return [];
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST", // Consider GET if backend supports it
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    // 1. Check for non-OK status
    if (!response.ok) {
      // Try to get server error message, fallback to generic string
      const errorText = await response.text();
      let errorMessage = "Failed to fetch notifications";
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorMessage;
      } catch {
        /* not JSON */
      }

      throw new Error(errorMessage);
    }

    // 2. Return the parsed JSON
    return await response.json();
  } catch (error) {
    // Log locally for debugging, then re-throw for the UI to handle
    console.error("API Call Failed:", error);
    throw error;
  }
};
