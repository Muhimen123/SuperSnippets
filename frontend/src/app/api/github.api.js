import { API_ROUTES } from "@/utility/constants";

export const fetchAllFilesFromRepo = async (url) => {
  const endpoint = API_ROUTES.GITHUB.FETCH_ALL;
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
			const errorData = await response.json();
			console.error("Error response from server:", errorData.message);
      throw new Error("Failed to fetch files from GitHub repository");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching files from GitHub repository:", error);
    throw error;
  }
};
