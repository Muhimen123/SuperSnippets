import Notification from "../models/Notification.js";
import User from "../models/User.js";
import { addCollaboratorToCodebook } from "../services/pdf.service.js";

// Send an invitation to a user by email
export const sendInvitation = async (req, res) => {
  try {
    const { email, senderId, codebookId, codebookName } = req.body;
    // const senderId = req.user._id; // Assumes middleware sets req.user

    const recipient = await User.findOne({ email });
    if (!recipient) {
      return res.status(404).json({ error: "User not found with this email" });
    }

    if (recipient._id.toString() === senderId.toString()) {
      return res.status(400).json({ error: "Cannot invite yourself" });
    }

    const notification = await Notification.create({
      recipient: recipient._id,
      sender: senderId,
      type: "INVITATION",
      message: `Invited you to collaborate on ${codebookName}`,
      metadata: { codebookId, codebookName },
    });

    res.status(201).json(notification);
  } catch (error) {
    console.error("Send Invitation Error:", error);
    res.status(500).json({ error: "Failed to send invitation" });
  }
};

// Accept an invitation
export const acceptInvitation = async (req, res) => {
  try {
    const { notificationId, userId } = req.body;
    // const userId = req.user._id;

    const notification = await Notification.findOne({
      _id: notificationId,
      recipient: userId,
    });

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    if (notification.status !== "PENDING") {
      return res.status(400).json({ error: "Notification already processed" });
    }

    notification.status = "ACCEPTED";
    await notification.save();
    console.log(notification.metadata.codebookId, userId);
    await addCollaboratorToCodebook(notification.metadata.codebookId, userId);

    // TODO: Add logic here to actually add user to the codebook's authorized users list

    res.status(200).json({ message: "Invitation accepted", notification });
  } catch (error) {
    console.error("Accept Invitation Error:", error);
    res.status(500).json({ error: "Failed to accept invitation" });
  }
};

// Get notifications for the current user
export const getUserNotifications = async (req, res) => {
  try {
    const { userId } = req.body;
    const notifications = await Notification.find({ recipient: userId })
      .populate("sender", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Get Notifications Error:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};
