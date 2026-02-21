import { API_ROUTES } from "@/utility/constants";

export const sendInvitation = async (email, codebookId, senderId, codebookName) => {
  const endpoint = API_ROUTES.NOTIFICATION.INVITE;
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, codebookId, senderId, codebookName}),
    });

    if (!response.ok) {
      throw new Error("Failed to send invitation");
    }

    const data = await response.json();
    console.log("Invitation sent successfully:", data);
    return data;
  } catch (error) {
    console.error("Error sending invitation:", error);
    throw error;
  }
};

export const acceptInvitation = async (notificationId, userId) => {
  const endpoint = API_ROUTES.NOTIFICATION.ACCEPT;
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notificationId, userId }),
    });

    if (!response.ok) {
      throw new Error("Failed to accept invitation");
    }

    const data = await response.json();
    console.log("Invitation accepted successfully:", data);
    return data;
  } catch (error) {
    console.error("Error accepting invitation:", error);
    throw error;
  }
};

export const removeCollaborator = async (codebookId, collaboratorId) => {
  const endpoint = API_ROUTES.PDF.REMOVE_COLLABORATOR;
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ codebookId, collaboratorId }),
    });

    if (!response.ok) {
      throw new Error("Failed to remove collaborator");
    }

    const data = await response.json();
    console.log("Collaborator removed successfully:", data);
    return data;
  } catch (error) {
    console.error("Error removing collaborator:", error);
    throw error;
  }
};