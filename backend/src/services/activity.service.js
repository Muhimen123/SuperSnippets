import Activity from "../models/Activity.js";

export const logActivity = async ({
  userId,
  codebookId,
  codesegmentId,
  previousCodesegment,
  newCodesegment,
  actionType,
}) => {
  try {
    const activity = new Activity({
      user_id: userId,
      codebook_id: codebookId,
      codesegment_id: codesegmentId,
      previous_codesegment: previousCodesegment,
      new_codesegment: newCodesegment,
      action_type: actionType,
    });
    await activity.save();
  } catch (error) {
    console.error("Error logging activity:", error);
    throw new Error("Failed to log activity");
  }
};

export const getActivitiesForCodebook = async (codebookId) => {
  try {
    const activities = await Activity.find({ codebook_id: codebookId })
      .populate("user_id", "name", "email")
      .populate("codesegment_id", "content")
      .sort({ createdAt: -1 });
    return activities;
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw new Error("Failed to fetch activities");
  }
};
