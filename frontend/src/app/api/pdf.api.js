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
