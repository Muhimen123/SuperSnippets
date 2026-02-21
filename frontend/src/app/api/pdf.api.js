import { API_ROUTES } from "@/utility/constants";

export const createConfig = async (codebookConfig) => {
  const endpoint = API_ROUTES.PDF.CREATE;
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(codebookConfig),
    });

    if (!response.ok) {
      throw new Error("Failed to create PDF configuration");
    }

    const data = await response.json();
    console.log("PDF configuration created successfully:", data);
    return data;
  } catch (error) {
    console.error("Error creating PDF configuration:", error);
    throw error;
  }
};

export const fetchUserCodebooks = async (userId) => {
  const endpoint = API_ROUTES.PDF.GET_ALL;
  try {
    console.log(userId);
    console.log(endpoint);
    const response = await fetch(`${endpoint}/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user codebooks");
    }

    const data = await response.json();
    console.log("User codebooks fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error fetching user codebooks:", error);
    throw error;
  }
};

export const deleteCodebook = async (codebookId) => {
  const endpoint = `${API_ROUTES.PDF.DELETE}/${codebookId}`;
  try {
    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete codebook");
    }

    const data = await response.json();
    console.log("Codebook deleted successfully:", data);
    return data;
  } catch (error) {
    console.error("Error deleting codebook:", error);
    throw error;
  }
};

export const fetchCodebook = async (codebookId) => {
  const endpoint = `${API_ROUTES.PDF.FETCH}/${codebookId}`;
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch codebook");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching codebook:", error);
    throw error;
  }
};

export const modifyCodebook = async (codebookId, updatedData) => {
  const endpoint = API_ROUTES.PDF.MODIFY;
  try {
    const response = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ codebookId, updatedData }),
    });
    console.log("Response from modifyCodebook:", response);
    if (!response.ok) {
      throw new Error("Failed to modify codebook");
    }
  } catch (error) {
    throw error;
  }
};

export const fetchCollaborators = async (codebookId) => {
  const endpoint = `${API_ROUTES.PDF.FETCH_COLLABORATORS}/${codebookId}`;
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch collaborators");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching collaborators:", error);
    throw error;
  }
}; 
