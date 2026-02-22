import { API_ROUTES } from "@/utility/constants";

export const parseCode = async (code) => {
  const endpoint = API_ROUTES.PARSER.PARSE;

  if (!code) {
    console.error("parseCode: code is required");
    return null;
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ snippetscode: code }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = "Failed to parse code";
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorMessage;
      } catch {
        /* not JSON */
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("API Call Failed:", error);
    throw error;
  }
};