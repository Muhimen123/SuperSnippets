import { logActivity, getActivitiesForCodebook } from "../services/activity.service.js";

export const logActivityController = async (req, res) => {
  try {
    const { userId, codebookId, codesegmentId, previousCodesegment, newCodesegment, actionType } = req.body;
    await logActivity({ userId, codebookId, codesegmentId, previousCodesegment, newCodesegment, actionType });
    res.status(201).json({ message: "Activity logged successfully" });
  } catch (error) {
    console.error("Log Activity Error:", error);
    res.status(500).json({ error: "Failed to log activity" });
  }
};

export const getActivitiesForCodebookController = async (req, res) => {
  try {
    const { codebookId } = req.params;
    const activities = await getActivitiesForCodebook(codebookId);
    res.status(200).json(activities);
  } catch (error) {
    console.error("Get Activities Error:", error);
    res.status(500).json({ error: "Failed to fetch activities" });
  }
};
