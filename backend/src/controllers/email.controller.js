import * as emailService from "../services/email.service.js";

export const sendWelcomeMail = async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: "Email Address/Name is Required" });
  }

  try {
    await emailService.sendWelcomeEmail(email, name);
    res.status(200).json({
      message: "Welcome mail sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Email failed to send.",
      details: error.message,
    });
  }
};
