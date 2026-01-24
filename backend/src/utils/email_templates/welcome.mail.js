export const welcomeTemplate = `
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
        .button-container { padding: 30px 0; text-align: center; }
        .button { background-color: #0B0B0A; color: #ffffff !important; padding: 12px 25px; border-radius: 5px; text-decoration: none; font-weight: bold; display: inline-block; }
        .footer { padding: 25px; text-align: center; font-size: 12px; color: #b0adc5; }
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
                    <h2>Welcome, {{name}}!</h2>
                    <p>Thanks for joining Super Snippets. We're thrilled to have you in our community!</p>
                    <p>To get started and explore your dashboard, click the button below:</p>
                    <div class="button-container">
                        <a href="https://yourwebsite.com/login" class="button">Go to Dashboard</a>
                    </div>
                    <p>If you have any questions, feel free to reply to this email.</p>
                    <p>Cheers,<br>The Super Snippets Team</p>
                </td>
            </tr>
            <tr>
                <td class="footer">
                    &copy; 2026 Super Snippets. All rights reserved. <br>
                    You are receiving this email because you signed up on our platform.
                </td>
            </tr>
        </table>
    </div>
</body>
</html>
`