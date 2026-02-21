export const passwordResetTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f7; color: #51545e; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #f4f4f7; padding-bottom: 40px; }
        .main { background-color: #ffffff; margin: 0 auto; width: 100%; max-width: 600px; border-collapse: collapse; border-radius: 8px; overflow: hidden; }
        .header { background-color: #0B0B0A; padding: 25px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 24px; }
        .content { padding: 45px; }
        .content h2 { color: #333333; font-size: 20px; font-weight: bold; margin-top: 0; }
        .content p { font-size: 16px; line-height: 1.6; color: #51545e; }
        .code-box { background-color: #f4f4f7; border: 2px solid #0B0B0A; border-radius: 8px; padding: 20px; text-align: center; margin: 25px 0; }
        .code { font-size: 32px; font-weight: bold; color: #0B0B0A; letter-spacing: 8px; font-family: 'Courier New', monospace; }
        .footer { padding: 25px; text-align: center; font-size: 12px; color: #b0adc5; }
        .warning { background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; color: #856404; }
    </style>
</head>
<body>
    <div class="wrapper">
        <table class="main">
            <tr>
                <td class="header">
                    <h1>Super Snippets</h1>
                </td>
            </tr>
            <tr>
                <td class="content">
                    <h2>Password Reset Request</h2>
                    <p>Hi {{name}},</p>
                    <p>We received a request to reset your password. Use the verification code below to proceed:</p>
                    <div class="code-box">
                        <div class="code">{{code}}</div>
                    </div>
                    <p><strong>This code will expire in 10 minutes.</strong></p>
                    <div class="warning">
                        <strong>⚠️ Security Notice:</strong> If you didn't request this password reset, please ignore this email and your password will remain unchanged.
                    </div>
                    <p>Cheers,<br>The Super Snippets Team</p>
                </td>
            </tr>
            <tr>
                <td class="footer">
                    &copy; 2026 Super Snippets. All rights reserved. <br>
                    This is an automated security email.
                </td>
            </tr>
        </table>
    </div>
</body>
</html>
`;
